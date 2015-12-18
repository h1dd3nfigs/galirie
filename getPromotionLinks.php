<?php

include('AliExpressAPI.class.php');

//categoryId= 3 for Apparel & Accessories
//categoryId= 200003655 for Hair & Accessories
//categoryId= 322 for Shoes

$fields_to_return = array(
						'totalResults',
						'trackingId',
						'publisherId',
						'url',
						'promotionUrl',
						);

$input_urls = array(
			'http://www.aliexpress.com/item//1750047098.html',
			'http://www.aliexpress.com/item//1911882047.html',
				);

$options = array(
				//'productId'		=> '1750047098',
				'trackingId'	=> TRACKING_ID,
				'fields'			=> implode(',', $fields_to_return),
				'urls'			=> implode(',', $input_urls),
				
			);

$apiName = 'api.getPromotionLink'; // or is it api.getPromotionLink ??

$feedFile = 'ali-feeds/'.$apiName.'/alifeed.'.$apiName.'_'.date('Y-m-d');

// http://gw.api.alibaba.com/openapi/param2/2/portals.open/api.getPromotionLinks/[Appkey]? fields=[fields]&trackingId=[default_trackingID]&urls=[request_url, request_url]


$aliExpressApi = new AliExpressAPI($feedFile);
$requestUrl = $aliExpressApi->buildRequestUrl($apiName, $options);

$jsonFeed = $aliExpressApi->sendRequest($requestUrl); 
 // echo $jsonFeed."\n\n";

// write final string to the file named $feedFile
$fp = fopen($feedFile, 'w+');
$fwrite = fwrite($fp, $jsonFeed);
echo "\n\nDone writing promotion urls to $feedFile";
