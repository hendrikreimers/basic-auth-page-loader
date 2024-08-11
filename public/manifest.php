<?php

header("Content-Type: application/json; charset=utf-8");
$expr = '/([a-zA-Z0-9.\-_]+)/miu';
$c = '';
if ( preg_match($expr, $_GET['c']) ) {
    $c = strip_tags($_GET['c']);
}

?>
{
    "short_name": "BasicAuthPageLoader",
    "name": "Basic Auth Page Loader",
    "icons": [
        {
            "src": "assets/images/icon-192x192.png",
            "type": "image/png",
            "sizes": "192x192"
        },
        {
            "src": "assets/images/icon-256x256.png",
            "type": "image/png",
            "sizes": "256x256"
        },
        {
            "src": "assets/images/icon-384x384.png",
            "type": "image/png",
            "sizes": "384x384"
        },
        {
            "src": "assets/images/icon-512x512.png",
            "type": "image/png",
            "sizes": "512x512"
        }
    ],
    "start_url": "/pwa/BasicAuthPageLoader/?c=<?= $c; ?>",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
}
