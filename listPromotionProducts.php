<?php

/*
1) API FEED
Make Alibaba API call that returns a JSON feed of products in the women's apparel category that perhaps have an evaluationScore of 4+ and a commissionRate of 4%+. 

3-step process:
1) get the list of promotion products
http://gw.api.alibaba.com/openapi/param2/2/portals.open/api.listPromotionProduct/[Appkey]?fields=[fields]&keywords=[keywords]

2) get the promotion product details
http://gw.api.alibaba.com/openapi/param2/2/portals.open/api.getPromotionProductDetail/[Appkey]? fields=[fields]&productId=[request_productId]


3) get promotion links so i'll get credit for driving sales on a product
http://gw.api.alibaba.com/openapi/param2/2/portals.open/api.getPromotionLinks/[Appkey]? fields=[fields]&trackingId=[default_trackingID]&urls=[request_url, request_url]
*/

include('AliExpressAPI.class.php');

//categoryId= 3 for Apparel & Accessories
//categoryId= 200003655 for Hair & Accessories
//categoryId= 322 for Shoes

$fields_to_return = array(
							'totalResults',
							'productId',
							'productUrl',
							'productTitle',
							'salePrice',
							'volume',
							'30daysCommission',				
						);

$categoryIds = array(
					'apparel'	=> 3,
					'hair'		=> 200003655, 
					'shoes'		=>322 ,
					);

$options = array(
				'categoryId'		=> 3,
				'packageType'		=>'piece',
				'pageSize'			=> 40,
				'volumeFrom'		=> 100,
				'originalPriceFrom'	=> 10.00,
				'pageNo'			=> 1,
				'sort'				=> 'commissionRateDown',//'volumeDown',
				'fields'			=> implode(',', $fields_to_return),
			);

$apiName = 'api.listPromotionProduct';

$feedFile = 'ali-feeds/'.$apiName.'/alifeed.'.$apiName.'.categoryId_'.$options['categoryId'].'.'.date('Y-m-d');

$aliExpressApi = new AliExpressAPI($feedFile);
$requestUrl = $aliExpressApi->buildRequestUrl($apiName, $options);

$jsonFeed = $aliExpressApi->sendRequest($requestUrl); 
$assoc_arr_feed = json_decode($jsonFeed, true);

$totalResults = $assoc_arr_feed['result']['totalResults'];

$totalPages = round($totalResults/$options['pageSize'] ,0);
// echo 'Total results '.$totalResults;
// exit;
if($totalPages > 1) {
	//call api for every subsequent page and append the returned results to the same feedFile as the 1st page of results that got returned
	echo "we're gonna cycle through $totalPages pages of api results.";	
	// get results for each page and append onto string $jsonFeed
	// for ($i=2; $i <= $totalPages ; $i++) { 
	for ($i=2; $i <= 5 ; $i++) { // cap it at 5 for now assuming we don't want more than 200 products per category intially

		$options['pageNo'] = $i;
		$requestUrl = $aliExpressApi->buildRequestUrl($apiName, $options);
		$jsonFeed .= $aliExpressApi->sendRequest($requestUrl); //what's a practical max limit to json string length? should I prepare for that by setting a cap to my $i???
		// continue;
	}
}
// echo $jsonFeed."\n\n";

// write final string to the file named $feedFile
$fp = fopen($feedFile, 'w+');
$fwrite = fwrite($fp, $jsonFeed);
echo "\n\nDone writing $totalResults products to $feedFile";
/*
$call_listPromotionProduct = 'http://gw.api.alibaba.com/openapi/param2/2/portals.open/api.listPromotionProduct/'.API_KEY.'?fields=totalResults,productId,salePrice,volume,30daysCommission&categoryId=3&packageType=piece&originalPriceFrom=10.00&volumeFrom=100&pageSize=40';

// perhaps with Oct 2015 plan to make commission 8% for all products, the commission field no longer returns data
$fields = 'productId,productTitle,productUrl,imageUrl,salePrice,evaluateScore,volume,30daysCommission'; 

$ali_productId = '1322839499';

$call_getPromotionProduct = "http://gw.api.alibaba.com/openapi/param2/2/portals.open/api.getPromotionProductDetail/".API_KEY."?fields=$fields&productId=$ali_productId";

//productId=1322839499 for 6A Sunny Queen Hair Products Mongolian Kinky Curly Hair Extensions 4pcs Afro Kinky Curly Virgin Human Hair Weave Natural Black

//productURL = 'http://www.aliexpress.com/item/Free-Shipping-Wholesale-Mix-Length-4pcs-lot-virgin-mongolian-afro-kinky-curly-hair-extensions-5A-unprocessed/1322839499.html?spm=2114.01020208.3.1.RTlwxS&ws_ab_test=201556_10,201527_2_15_16_13_14_7_6_5_71_72_8_73_74_75,201560_4'

// create a new cURL resource
$ch = curl_init();

// set URL and other appropriate options
curl_setopt($ch, CURLOPT_URL, $call_listPromotionProduct);

// grab URL and pass it to the browser
curl_exec($ch);

// close cURL resource, and free up system resources
curl_close($ch);
*/