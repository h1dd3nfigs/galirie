<?php 

/*
* Script to download a user-uploaded pic to filesystem
*/


$img_url = 'http://g03.a.alicdn.com/kf/UT8dnt1Xp8XXXagOFbXn.jpg';
$feedback_url = 'http://feedback.aliexpress.com/display/productEvaluation.htm?productId=32298823720&ownerMemberId=220688544&companyId=230676341&memberType=seller&startValidDate=';

parse_str( parse_url( $feedback_url, PHP_URL_QUERY));

$filename = "$productId/red-dress-girl.jpg";

if(!is_dir("userImgs/$productId"))
	mkdir("userImgs/$productId");

if(copy($img_url, 'userImgs/'.$filename))
	echo "Done downloading : $filename into $productId/ directory";



