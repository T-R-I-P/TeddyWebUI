<?php

    exec('"C:\xampp\htdocs\TeddyWebUI\FbxConverter.exe" "C:\xampp\htdocs\TeddyWebUI\model\human.obj" "D:\human.fbx"', $value);
    return $value;
?>