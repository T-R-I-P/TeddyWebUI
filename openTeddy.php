<?php
    session_start();

    $teddy = '"C:\Program Files\Java\jre1.8.0_101\bin\java.exe" -jar teddy\teddy.jar';
    $node  = '"C:\Program Files\nodejs\node.exe" "C:\xampp\htdocs\TeddyWebUI\node\cilent.js"';
    $rename    = 'move C:\xampp\htdocs\TeddyWebUI\test.obj "C:\xampp\htdocs\TeddyWebUI\models\mymodel.obj"';
    $enemyFbxMoveToGameDir = 'move "C:\xampp\htdocs\TeddyWebUI\autogen\Assets\Resources\Models\Pinocchio.fbx" ';
    $enemyLightTPostMoveToGameDir = 'move "C:\xampp\htdocs\TeddyWebUI\autogen\Assets\Resources\ModelReferences\light_tpose.txt" ';
    $fbxMoveToGameDir = 'move "C:\xampp\htdocs\TeddyWebUI\models\Pinocchio.fbx" "C:\xampp\htdocs\TeddyWebUI\autogen\Assets\Resources\Models\Pinocchio.fbx"'; // Error autogen Not found!!
    $lightTPostMoveToGameDir = 'move "C:\xampp\htdocs\TeddyWebUI\models\light_tpose.txt" "C:\xampp\htdocs\TeddyWebUI\autogen\Assets\Resources\ModelReferences\light_tpose.txt"'; // Error autogen Not found!!
    //$com   = '"C:\Program Files\Unity\Editor\Unity.exe" -batchmode -quit -projectPath "C:\xampp\htdocs\TeddyWebUI\autogen" -user Pen -buildWindows64Player "C:\xampp\htdocs\TeddyWebUI\builds\build.exe"'; // Error autogen Not found
    $com   = '"C:\Program Files\Unity\Editor\Unity.exe" -batchmode -quit -projectPath "C:\xampp\htdocs\TeddyWebUI\autogen" -user thumbd12856 -buildWindows64Player "C:\xampp\htdocs\TeddyWebUI\builds\build.exe"'; // Error autogen Not found
    $dest  = '"C:\xampp\htdocs\TeddyWebUI\builds\build.exe"'; // Error builds not found!!

    //ip
	//$site  = 'http://192.168.199.130:8001';
    $site  = 'http://172.16.213.128:8001';
	
	    

    if($_GET['option'] == 'drawTeddy'){
		//exec($teddy, $value);
        exec('java -jar teddy\teddy.jar', $value);
        var_dump($value);
    }
    
    else if($_GET['option'] == 'renameObj') {
        exec($rename, $value);
        var_dump($value);
    }

    else if($_GET['option'] == 'bridge') {
        echo "php start bridge";
        exec($node, $value);
        var_dump($value);
                
        //var_dump($value);
        file_put_contents('models\Pinocchio.fbx',file_get_contents($site."/fbx"));
		file_put_contents('models\light_tpose.txt',file_get_contents($site."/tpose"));
		echo 'All Green';


        if(!isset($_SESSION['pinocchioId'])) {
            $_SESSION['pinocchioId'] = 0;
        } else {
            $_SESSION['pinocchioId'] += 1;
        }
        $enemyFbxMoveToGameDir .= '"C:\xampp\htdocs\TeddyWebUI\autogen\Assets\Resources\Models\Enemy\Models\Pinocchio' . $_SESSION['pinocchioId'] . ".fbx\"";
        $enemyLightTPostMoveToGameDir .= '"C:\xampp\htdocs\TeddyWebUI\autogen\Assets\Resources\Models\Enemy\References\light_tpose' . "" . $_SESSION['pinocchioId'] . ".txt\"";

        exec($enemyFbxMoveToGameDir, $returnVal);
        exec($enemyLightTPostMoveToGameDir, $returnVal);
    }

    else if($_GET['option'] == 'unity') {

        exec($fbxMoveToGameDir, $returnVal);
		var_dump($returnVal);
		exec($lightTPostMoveToGameDir , $returnVal);
		var_dump($returnVal);
        exec($com, $returnVal);
        var_dump($returnVal);
		echo 'unity!';
    }
    else if($_GET['option'] == 'run'){
		echo 'run!';
        exec($dest);
    }