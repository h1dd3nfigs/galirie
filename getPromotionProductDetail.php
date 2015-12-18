<?php

include('AliExpressAPI.class.php');

//categoryId= 3 for Apparel & Accessories
//categoryId= 200003655 for Hair & Accessories
//categoryId= 322 for Shoes

$fields_to_return = array(
						'productId',
						'productTitle',
						'productUrl',
						'salePrice',
						'evaluateScore',
						'commission',
						'30daysCommission',
						'volume',
						);


$options = array(
				'productId'		=> '1750047098',
				'fields'			=> implode(',', $fields_to_return),
			);

$apiName = 'api.getPromotionProductDetail';

$feedFile = 'ali-feeds/'.$apiName.'/alifeed.'.$apiName.'.productId_'.$options['productId'].'.'.date('Y-m-d');

// "http://gw.api.alibaba.com/openapi/param2/2/portals.open/api.getPromotionProductDetail/".API_KEY."?fields=$fields&productId=$ali_productId";

$aliExpressApi = new AliExpressAPI($feedFile);
$requestUrl = $aliExpressApi->buildRequestUrl($apiName, $options);

$jsonFeed = $aliExpressApi->sendRequest($requestUrl); 
 // echo $jsonFeed."\n\n";

// write final string to the file named $feedFile
$fp = fopen($feedFile, 'w+');
$fwrite = fwrite($fp, $jsonFeed);
echo "\n\nDone writing productId $options[productId] to $feedFile";
