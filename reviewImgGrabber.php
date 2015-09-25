<?php
/*
* Visit each URL for product page in Ali feed (from step 1) 

* Fake clicking the next page button to advance through all pages of 
  feedback (programmatically trigger the JS onclick() function). 

* For each page of feedback, look at HTML source code and truncate the code to toss out all the code before and after the feedback section. 

* Then when working with just the feedback section, place each "<tr>...</tr>" set of open & close table row tags as an element in an array of reviews since each corresponds to an individual user's review. 

* Now for each review, just do a string search to look for an "<img src=...>". If an image exists in the review, then go ahead and grab the image's URL and store this image URL in an array with all the others corresponding to that product.

*/

// Visit each URL for product page in Ali feed  

// Fake clicking next page button to loop over each feedback page
$start_time = time();

function trimTakeText($start_flag, $end_flag, $haystack)
{
//
}

// Toss out all code before & after feedback section
function getAllFeedback($url)
{
	$data = file_get_contents($url);	
	$start_flag = 'thesrc="';
	$end_flag = '"></iframe>';

	$first_substr = substr($data, strpos($data, $start_flag) + strlen($start_flag));

	$second_substr =strstr($first_substr, $end_flag , TRUE);

	$feedback_txt = '';
	$feedback_count = 0;
	
	for ($i=1; $i < 166; $i++) { 
		//$x = 1;

		$iframe_data = file_get_contents($second_substr."&page=$i");
		//echo $second_substr; return;
		$start_flag2 = '<tbody>';
		$first_substr2 = substr($iframe_data, strpos($iframe_data, $start_flag2) + strlen($start_flag2));


		$start_flag3 = '<tbody>';
		$end_flag3 = '</tbody>';

		$first_substr3 = substr($first_substr2, strpos($first_substr2, $start_flag3) + strlen($start_flag3));

		$feedback_txt .= strstr($first_substr3, $end_flag3 , TRUE);
		//$x = $x + 1;
		//echo 'x is now'.$x.'<br/>';
	}
	return $feedback_txt;
}

function load_reviews_into_array($feedback_txt)
{
	$delimiter = '<tr>';
	$reviews_array = explode($delimiter, $feedback_txt);
	return $reviews_array;
}

function countImg($review)
{
	// <div class="pic-mark"> is only present when there's a user-uploaded pic
	$needle = '<div class="pic-mark">';
	$count = substr_count($review, $needle);
	return $count ;
}

function getAllImg($reviews_array)
{
	$product_pics = array();
	foreach ($reviews_array as $key => $review) {
		$count = countImg($review);
		if($count > 0)
		{
			$start_flag = '<div class="pic-mark">';
			$end_flag = '<div class="biPic"';
			$first_substr = substr($review, strpos($review, $start_flag) + strlen($start_flag));
			$second_substr =strstr($first_substr, $end_flag , TRUE);

			$second_substr_arr = explode('"', $second_substr);
			foreach($second_substr_arr as $k => $sec)
			{
				$pos = strpos($sec, 'http://');
				if($pos !== false)
					$product_pics[] = $sec; 			
			}
		}
	}
	return $product_pics ;
}

$url  = 'http://www.aliexpress.com/item/2014-Women-Elegant-Belted-Tartan-Long-Sleeve-Patchwork-Tunic-Work-Business-Casual-Party-Bodycon-Pencil-Sheath/32219604594.html';
//$url = 'http://www.aliexpress.com/item/New-2015-Womens-Celebrity-Elegant-Vintage-Pinup-Bow-Ruch-Tunic-Business-Casual-Cocktail-Party-Business-Bodycon/32298823720.html';
//$url = 'http://www.aliexpress.com/item/Hot-Selling-Brand-Valentine-Women-Calfskin-Pointed-Toe-Rivets-Flat-Shoes-Genuine-Leather-Flats-Sandals-Big/32350592150.html?s=p';
//$i=31; 16sec $url = 'http://www.aliexpress.com/item/2015-Couture-Ball-Gown-Elegant-Wedding-Dress-Lace-Tulle-Plus-Size-Bridal-Gowns-Custom-Made-abiti/32288475515.html';
//$url = 'http://www.aliexpress.com/item/2014-fashion-vintage-American-Apparel-jeans-woman-pencil-casual-denim-stretch-skinny-high-waist-jeans-pants/32244547396.html';
//$url = 'http://www.aliexpress.com/item/Hot-Sale-Women-Pencil-Pants-Skinny-Zipper-Hollow-Out-Black-White-2015-New-Fashion-Casual-Slim/32322377471.html?spm=2114.30010108.4.30.9a5eXh#feedback';
//$url = 'http://www.aliexpress.com/item/2013-Hot-sale-OP-20-Elegant-Mermaid-Sweetheart-Beaded-Organza-Chapel-Wedding-Dress-Party-dress-Custom/543863621.html';
//$url = 'http://www.aliexpress.com/item/Free-Shipping-Wholesale-Mix-Length-4pcs-lot-virgin-mongolian-afro-kinky-curly-hair-extensions-5A-unprocessed/1322839499.html';
//$url = 'http://www.aliexpress.com/item/Remy-Hair-Clip-In-Human-Hair-Extensions-Full-Sead-Set-27-Colors-available/1350432632.html';

$feedback_txt = getAllFeedback($url);
$reviews_array = load_reviews_into_array($feedback_txt); 
$product_pics = getAllImg($reviews_array);
var_dump($product_pics);
foreach($product_pics as $k=>$pic)
{
	echo '<img src="'.$pic.'"><br/>';
}
$end_time = time();
$time_elapsed = $end_time - $start_time ;
echo 'Time elapsed : '.$time_elapsed;
/*
function getHttpResponse($path, $data){  
  $options = array(
      'http' => array(
          'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
          'method'  => 'POST',
          'content' => http_build_query($data),
      ),
  );
  $context  = stream_context_create($options);
  $result = file_get_contents($path, false, $context);
  return $result;
}

function
$path = 'http://feedback.aliexpress.com/display/productEvaluation.htm?';
$data = array(
            '_csrf_token_'  => '1b6npfciy3jl_', //why does it work despite me not updating csrf token for each page?
			"ownerMemberId" => "220754190",
			"memberType"    => "seller",
			"productId"     => "32322377471",
			"companyId" 	=> "", //why does it work with companyId being blank?
			"evaSortValue" 	=> "Sort by comment",
			"page" =>"1",
			"i18n" =>"false",

          );


$result =  getHttpResponse($path, $data);
echo $result;
*/
?>
