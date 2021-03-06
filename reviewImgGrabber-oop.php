<?php 

class Product {
	
	public $product_url = '';
	public $ali_product_id = '';
	public $feedback_url = '';
	public $user_imgs = array();

	public function __construct($url)
	{
		$this->product_url = $url;
	}

	/*
	* Get product URL from user input then use it to get url for feedback <iframe>
	*/
	 
	public function setFeedbackUrl()
	{
		$dom_product = new DOMDocument;
		@$dom_product->loadHTMLFile($this->product_url);

		foreach ($dom_product->getElementsByTagName('iframe') as $node) {
			$feedback_urls[] = $node->getAttribute( 'thesrc' );
		}

		$this->feedback_url = $feedback_urls[0] ;
		return $this->feedback_url ;
	}

	public function getFeedbackUrl()
	{
		if($this->feedback_url !== ''){
			return $this->feedback_url ;
	
		}		
		return $this->setFeedbackUrl();
	}
	
	/*
	* Get total num of pages of feedback 
	* Example: from <iframe> feedback_url, grab value in <div class="pos-right">, within 2nd <a> tag
	*/

	public function getNumReviewPages()
	{
		$feedback_url = $this->getFeedbackUrl();

		$tagName = 'div';
		$attrName = 'class';

		$dom_feedback = new DOMDocument;
		@$dom_feedback->loadHTMLFile($feedback_url."&page=1");
		$domxpath = new DOMXPath($dom_feedback);


		$review_page_nodelist = $domxpath->query("//$tagName" . '[@' . $attrName . "='pos-right']/a[2]");


		foreach ($review_page_nodelist as $n) {
			$total_num_review_pages = $n->nodeValue;
		}

		return $total_num_review_pages;
	}
	
	/*
	* Loop through get_img_urls for each page of feedback
	* Grab any user-uploaded pics
	*/

	public function getImgUrls()
	{

		$total_pages = $this->getNumReviewPages();
		echo "Looking for pics on $total_pages pages<br/>";

		for ($i=1; $i <= $total_pages ; $i++) { 
			// $i = 2;
			echo 'i is now '.$i;
			$domname = 'dom_feedback'.$i;

			$$domname = new DOMDocument;
			@$$domname->loadHTMLFile($this->feedback_url."&page=$i");

			$tagName = 'div';
			$attrName = 'class';
			$attrValue = 'pic-mark';
			$childTagName = 'img';

			$domxpathname = 'domxpath'.$i;
			$$domxpathname = new DOMXPath($$domname);
			$filtered = $$domxpathname->query("//$tagName" . '[@' . $attrName . "='$attrValue']/$childTagName");

			foreach ($filtered as $node) {
				$this->user_imgs[] = $node->getAttribute( 'src' );
			}
		}


		return $this->user_imgs ;
	}

	public function getUserImgHtml()
	{
		$review_img_urls = $this->getImgUrls();

		$user_img_html = '';
		foreach ($review_img_urls as $url) {
			$user_img_html .="<img src='$url'><br>";
		}
		
		return $user_img_html;
	}

	public function downloadAllUserImgs()
	{
		$this->getImgUrls();
		parse_str( parse_url( $this->getFeedbackUrl(), PHP_URL_QUERY));
		$this->ali_product_id = $productId ;
		$dir = "userImgs/aliproductId-$this->ali_product_id/";
	
		if (!is_dir($dir))
			mkdir($dir);

		echo "We found ".count($this->user_imgs)."user-uploaded pics.<br ><br >";

		for ($i=0; $i < count($this->user_imgs); $i++) { 
	
			$filename = "$this->ali_product_id-img$i.jpg";

			if(copy($this->user_imgs[$i], $dir.$filename))
				echo "Done downloading : $filename into $dir directory <br />";

		}

		return true;
	}	
}

	
if(isset($_POST['product_url'])){ 
	
	$start_time = time();

	$product = new Product($_POST['product_url']);
	$product->downloadAllUserImgs();
	
	$end_time = time();

	echo "This script took ".( $end_time - $start_time ). "seconds to run.<br/><br/>";
	$output = array();
	$output['product_url'] = $product->product_url;
	$output['ali_product_id'] = $product->ali_product_id;
	$output['total_user_imgs'] = count($product->user_imgs);
	$output['user_imgs'] = $product->user_imgs;

echo	json_encode($output);
	//append to a feed file

}
?>

<html>
<head>
	<title>Galirie User Pics</title>
</head>
<body>
	<form action="reviewImgGrabber-simp.php" method="post"> 
		Paste product URL here: <!--Require field to be not empty-->
		<input type="text" name="product_url" size="100" style="background-color:yellow;">
		<input type="submit" value="Go">
	</form>
</body>
</html>