    <?php
    
    /*
	$com = '"E:\Programs\Editor\Unity.exe" -batchmode -quit -projectPath "G:\Respository\Unity Projects\autogen" -user yanagiragi -buildWindows64Player "C:\Users\Ragi\Desktop\1.exe"';
    */
	$dest = '"./builds/build.exe"';
    $com = '"C:\Program Files\Unity\Editor\Unity.exe" -batchmode -quit -projectPath "C:\xampp\htdocs\TeddyWebUI\autogen" -user thumbd12856 -buildWindows64Player "C:\xampp\htdocs\TeddyWebUI\builds\build.exe"';
    $mv = 'move C:\Users\USER\Downloads\mymodel.fbx "C:\xampp\htdocs\TeddyWebUI\autogen\Assets\Resources\Models\mymodel.fbx"';


    if($_GET['option'] == 'teddy'){
        exec('java -jar teddy\teddy.jar', $value);
        echo "exec java!";
    }
    
    else if($_GET['option'] == 'renameObj') {
        exec('move C:\xampp\htdocs\TeddyWebUI\test.obj "C:\xampp\htdocs\TeddyWebUI\models\mymodel.obj"', $value);
        var_dump($value);
    }

    else if($_GET['option'] == 'fbxConverter'){
        exec('"C:\xampp\htdocs\TeddyWebUI\FbxConverter.exe" "C:\xampp\htdocs\TeddyWebUI\model\human.obj" "C:\xampp\htdocs\TeddyWebUI\model\human.fbx"', $value);
        return $value;
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
