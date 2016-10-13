<?php
    session_start();

    /* Config Setting */
    $javaPath = '"C:\Program Files\Java\jre1.8.0_101\bin\java.exe"';
    $nodejsPath = '"C:\Program Files\nodejs\node.exe"';
    $unityPath = '"C:\Program Files\Unity\Editor\Unity.exe"';
    $AssetsBundlePath = '"C:\temp\Create Asset bundles"';
    $AssetsBundleBuildPath = '"C:\temp\build.exe"';
    $AssetsBundleBuildDataPath = '"C:\temp\build_Data\StreamingAssets"';
    $AssetsBundleDestinition = '"C:\temp\StreamingAssets"';
    // $autogenPath = '"G:\Unity Projects\autogen"';
    // $autogenPath = '"C:\temp\Autogen"';
    $autogenBuildPath = '"C:\temp\Autogen\builds\TeddyGo.exe"';
    $autogenAuthor = "yanagiragi";
    $site  = 'http://192.168.58.128:8001';

    /* Command Generation */
    $teddy = $javaPath . ' -jar teddy\teddy.jar';
    $node  = $nodejsPath . ' node\cilent.js';
    $rename = 'move test.obj models\mymodel.obj';
    
    //asset bundle
    $enemyFbxMoveToAssetsBundle = 'move ' . $AssetsBundleDestinition . '\testbundle0';    
    $playerFbxMoveToAssetsBundle = 'move models\Pinocchio.fbx ' . $AssetsBundlePath. '\Assets\Pinocchio.fbx'; 
    $playerLightTPostMoveToAssetsBundle = 'move models\light_tpose.txt ' . $AssetsBundlePath. '\Assets\light_tpose.txt'; 

    $AssetsBundleMoveToAutogen = 'move ' . $AssetsBundleBuildDataPath . '\testbundle';
    $AssetsBundleCom = $unityPath . ' -batchmode -quit -projectPath ' . $AssetsBundlePath . ' -executeMethod CreateAssetBundles.CreateAssetBundlesMain -user ' . $autogenAuthor . ' -buildWindows64Player ' . $AssetsBundleBuildPath;

    $unityRun  = $autogenBuildPath;
	    

    if($_GET['option'] == 'drawTeddy') {
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
            $_SESSION['pinocchioId'] = 1;
        } else {
            $_SESSION['pinocchioId'] += 1;
        }

        //move enemy from player to enemy folder
        exec($enemyFbxMoveToAssetsBundle . ' ' . $AssetsBundleDestinition . '\Enemy\testbundle' . $_SESSION['pinocchioId'], $returnVal);
        exec($enemyFbxMoveToAssetsBundle . '.manifest ' . $AssetsBundleDestinition . '\Enemy\testbundle' . $_SESSION['pinocchioId']. '.manifest', $returnVal);
    }

    else if($_GET['option'] == 'unity') {

        // move player fbx to assets bundle
        exec($playerFbxMoveToAssetsBundle, $returnVal);
		var_dump($returnVal);
		exec($playerLightTPostMoveToAssetsBundle , $returnVal);
		var_dump($returnVal);

        //exec asset bundle
        exec($AssetsBundleCom, $returnVal);
        //move player asset bundle to autogen project
        exec($AssetsBundleMoveToAutogen . ' ' . $AssetsBundleDestinition . '\testbundle0', $returnVal);
        exec($AssetsBundleMoveToAutogen . '.manifest ' . $AssetsBundleDestinition . '\testbundle0.manifest', $returnVal);

        var_dump($returnVal);

    }
    else if($_GET['option'] == 'run') {
        exec($unityRun);
    }

    //QR code
    else if($_GET['option'] == 'getFbxUrl') {
        $FbxUrl = file_get_contents($site."/token");
        echo $FbxUrl;
    }