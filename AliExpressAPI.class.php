<?php 

include('settings.php');

/*
*	Class to call AliExpress API using generic methods: buildRequestUrl(), sendRequest(), storeResponse()
*/

class AliExpressAPI
{

	public $feedFile = '';

	public function __construct($feedFile)
	{
		$this->feedFile = $feedFile;
	}

	public function buildRequestUrl($apiName, $options = array(), $productId = '', $urls = array())
	{
		$data = array(
					'domain'	=>'http://gw.api.alibaba.com/openapi',
					'format'	=>'param2',
					'version'	=> 2,
					'namespace'	=>'portals.open',
			);

		$hostname = implode('/', $data);
		$endpoint = $apiName.'/'.API_KEY.'?'.urldecode(http_build_query($options));

		return $requestUrl = $hostname.'/'.$endpoint;
	}

	public function sendRequest($requestUrl)
	{
		$ch = curl_init();
		
		//File to save the contents to
		// $fp = fopen ($this->feedFile, 'a+');
		
		//give curl the file pointer so that it can write to it
		// curl_setopt($ch, CURLOPT_FILE, $fp);
		// curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

		//get curl response instead of passing it to browser or file pointer
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		curl_setopt($ch, CURLOPT_URL, $requestUrl);

		$data = curl_exec($ch); 
// var_dump($data);
		curl_close($ch);
		return $data;
	}

}