<?php
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Expose-Headers: *");
        function isValidJSON($str) {
                json_decode($str);
                return json_last_error() == JSON_ERROR_NONE;
        }
        $json_params = file_get_contents('php://input');
        if (isValidJSON($json_params)) {
                $img_list = json_decode($json_params);
        }
        foreach ($img_list as &$value) {
            $value = urlencode($value);
        }
        unset($value);
        $b64_img_list=base64_encode(json_encode($img_list));
        chdir('/usr/lib/cgi-bin/altML2');
        $output = exec("./php_response2.py $b64_img_list");
        echo $output;
?>


