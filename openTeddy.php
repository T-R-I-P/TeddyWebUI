<?php
    session_start();

    /* Config Setting */
    $javaPath = '"C:\Program Files\Java\jre1.8.0_101\bin\java.exe"';
    $nodejsPath = '"C:\Program Files\nodejs\node.exe"';
    $unityPath = '"C:\Program Files\Unity\Editor\Unity.exe"';
    //$autogenPath = '"G:\Unity Projects\autogen"';
    $autogenPath = '"C:\Users\Ragi\Desktop\autogen"';
    $autogenBuildPath = '"C:\xampp\htdocs\TeddyWebUI-master\builds\build.exe"';
    $autogenAuthor = "yanagiragi";
    $site  = 'http://192.168.58.128:8001';

    /* Command Generation */
    $teddy = $javaPath . ' -jar teddy\teddy.jar';
    $node  = $nodejsPath . ' node\cilent.js';
    $rename = 'move test.obj models\mymodel.obj';
    $enemyFbxMoveToGameDir = 'move ' . $autogenPath . '\Assets\Resources\Models\Pinocchio.fbx';
    $enemyLightTPostMoveToGameDir = 'move ' . $autogenPath . '\Assets\Resources\ModelReferences\light_tpose.txt';
    
    $fbxMoveToGameDir = 'move models\Pinocchio.fbx ' . $autogenPath. '\Assets\Resources\Models\Pinocchio.fbx'; 
    $lightTPostMoveToGameDir = 'move models\light_tpose.txt ' . $autogenPath. '\Assets\Resources\ModelReferences\light_tpose.txt'; 
    
    $com   = $unityPath .' -batchmode -quit -projectPath ' . $autogenPath . ' -user ' . $autogenAuthor . ' -buildWindows64Player ' . $autogenBuildPath; 
    $dest  = $autogenBuildPath; 
	    

    if($_GET['option'] == 'drawTeddy'){
		exec($teddy, $value);
        var_dump($value);
    }
    
    else if($_GET['option'] == 'renameObj') {
        exec($rename, $value);
        var_dump($value);
    }

    else if($_GET['option'] == 'bridge') {
        exec($node, $value);
        var_dump($value);
                
        file_put_contents('models\Pinocchio.fbx',file_get_contents($site."/fbx"));
		file_put_contents('models\light_tpose.txt',file_get_contents($site."/tpose"));
		echo 'All Green';


        if(!isset($_SESSION['pinocchioId'])) {
            $_SESSION['pinocchioId'] = 0;
        }
        else {
            $_SESSION['pinocchioId'] += 1;
        }

        $enemyFbxMoveToGameDir .= $autogenPath . '\Assets\Resources\Models\Enemy\Models\Pinocchio' . $_SESSION['pinocchioId'] . ".fbx\"";
        $enemyLightTPostMoveToGameDir .= $autogenPath . '\Assets\Resources\Models\Enemy\References\light_tpose' . "" . $_SESSION['pinocchioId'] . ".txt\"";

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

    }
    else if($_GET['option'] == 'run'){
        exec($dest);
    }