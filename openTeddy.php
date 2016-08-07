    <?php

    //temp
	$dest = '"./builds/build.exe"';
    $com = '"C:\Program Files\Unity\Editor\Unity.exe" -batchmode -quit -projectPath "C:\xampp\htdocs\TeddyWebUI\autogen" -user thumbd12856 -buildWindows64Player "C:\xampp\htdocs\TeddyWebUI\builds\build.exe"';
    $mv = 'move C:\Users\USER\Downloads\mymodel.fbx "C:\xampp\htdocs\TeddyWebUI\autogen\Assets\Resources\Models\mymodel.fbx"';


    if($_GET['option'] == 'drawTeddy'){
        exec('java -jar teddy\teddy.jar', $value);
        var_dump($value);
    }
    
    else if($_GET['option'] == 'renameObj') {
        //temp
        exec('move C:\xampp\htdocs\TeddyWebUI\test.obj "C:\xampp\htdocs\TeddyWebUI\models\mymodel.obj"', $value);
        var_dump($value);
    }

    else if($_GET['option'] == 'bridge') {
        // ragi: bridge
    }

    else if($_GET['option'] == 'unity'){
        echo "Drink volka!";
        exec($mv, $returnVal);        
        exec($com, $returnVal);
        var_dump($returnVal);
    }
    else if($_GET['option'] == 'run'){
        echo "Ride on Whales!";
        exec($dest);
    }
    //return $value;
?>
