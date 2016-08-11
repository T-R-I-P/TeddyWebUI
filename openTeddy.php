    <?php

    //temp
	$teddy = '"C:\Program Files\Java\jre1.8.0_101\bin\java.exe" -jar teddy\teddy.jar';
	$mv    = 'move C:\xampp\htdocs\TeddyWebUI\test.obj "C:\xampp\htdocs\TeddyWebUI\models\mymodel.obj"';
    $node  = '"C:\Program Files\nodejs\node.exe" "C:\xampp\htdocs\TeddyWebUI\node\cilent.js"';
    $mv2   = 'move "C:\xampp\htdocs\TeddyWebUI\models\Pinocchio.fbx" "C:\xampp\htdocs\TeddyWebUI\autogen\Assets\Resources\Models\Pinocchio.fbx"'; // Error autogen Not found!! 
	$mv3   = 'move "C:\xampp\htdocs\TeddyWebUI\models\light_tpose.txt" "C:\xampp\htdocs\TeddyWebUI\autogen\Assets\Resources\ModelReferences\light_tpose.txt"'; // Error autogen Not found!! 
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
        exec($mv, $value);
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
        /*if($value[0] == "done"){
			file_put_contents('models\Pinocchio.fbx',file_get_contents($site."/fbx"));
			echo 'All Green';
		} else{
			echo $value[0];
		}*/
    }

    else if($_GET['option'] == 'unity'){
        exec($mv2, $returnVal);
		var_dump($returnVal);
		exec($mv3, $returnVal);
		var_dump($returnVal);
        exec($com, $returnVal);
        var_dump($returnVal);
		echo 'unity!';
    }
    else if($_GET['option'] == 'run'){
		echo 'run!';
        exec($dest);
    }