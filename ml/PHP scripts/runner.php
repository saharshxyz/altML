<?php
	//This script handles an HTTP request for captioning only one image
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Expose-Headers: *");
	$img = urlencode($_REQUEST['img']);
	chdir('/usr/lib/cgi-bin/altML2'); //This is the path to the php_response.py file
	$output = exec("./php_response.py $img");
	echo $output;
?>
