<?php

// ini_set("user_agent", 'MyScraperBot (http://www.mysite.com/)');
// echo '<pre>';
// print_r(ini_get_all());
// echo '</pre>';

// $htmnl = file_get_contents('http://www.example.com');
// echo 'Just tryin out this user agent string';


// create a new cURL resource
$ch = curl_init();

// set URL and other appropriate options
curl_setopt($ch, CURLOPT_URL, "http://www.example.com/");
// curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');

// grab URL and pass it to the browser
curl_exec($ch);

// close cURL resource, and free up system resources
curl_close($ch);
