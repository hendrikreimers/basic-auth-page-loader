<?php

$expr = '/([a-zA-Z0-9.\-_]+)/miu';
$c = '';
if ( preg_match($expr, $_GET['c']) ) {
    $c = strip_tags($_GET['c']);
}

$currentPath = $_SERVER['REQUEST_URI'];
$basePath = dirname($currentPath);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>basic-auth-page-loader</title>
    <link rel="manifest" href="<?= $$basePath ?>manifest.json?c=<?= $c; ?>">
    <link rel="icon" type="image/x-icon" href="./favicon.ico">
</head>
<body>

<div id="keypad" style="display: none;">
    <div class="grid-container keypad">
        <div class="grid-item grid-full" id="keypadInput"></div>
        <div class="grid-item key">1</div>
        <div class="grid-item key">2</div>
        <div class="grid-item key">3</div>
        <div class="grid-item key">4</div>
        <div class="grid-item key">5</div>
        <div class="grid-item key">6</div>
        <div class="grid-item key">7</div>
        <div class="grid-item key">8</div>
        <div class="grid-item key">9</div>
        <div class="grid-item"></div> <!-- Leer für eine gleichmäßige Verteilung -->
        <div class="grid-item key">0</div>
        <div class="grid-item" id="keypadBtnClear">C</div> <!-- Leer für eine gleichmäßige Verteilung -->
        <div class="grid-item grid-full" id="keypadBtnOk">OK</div>
    </div>
</div>

<div id="encryptor" style="display: none;">
    <div>
        <label for="user">User:</label>
        <input type="text" id="user" />
    </div>
    <div>
        <label for="pass">Pass:</label>
        <input type="text" id="pass" />
    </div>
    <div>
        <label for="key">Key (Num):</label>
        <input type="number" id="key" />
    </div>
    <div>
        <label for="url">URL:</label>
        <input type="text" id="url" />
    </div>
    <div>
        <button id="encrypt">Encrypt</button>
    </div>
    <div>
        <input type="text" readonly id="output" class="hidden" /><br>
        <a href="#" id="outputLink" class="hidden">Go to final site</a>
    </div>
</div>

<div id="app">Loading...</div>

<button id="reloadBtn">Restart</button>

</body>
</html>