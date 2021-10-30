<?php include 'conexion.php';
	$pdo = new Conexion();
	//Listar registros y consultar registro
	if($_SERVER['REQUEST_METHOD'] == 'GET'){
		if(isset($_GET['id']))
		{
					$sql = $pdo->prepare("SELECT * FROM product WHERE id=:id");
					$sql->bindValue(':id', $_GET['id']);
					$sql->execute();
					$sql->setFetchMode(PDO::FETCH_ASSOC);
					header("HTTP/1.1 200 hay datos");
					echo json_encode($sql->fetchAll());
					exit;				
		} else {
					$sql = $pdo->prepare("SELECT * FROM product");
					$sql->execute();
					$sql->setFetchMode(PDO::FETCH_ASSOC);
					header("HTTP/1.1 200 hay datos");
					echo json_encode($sql->fetchAll());
					exit;		
		}
	}
	
	//Si no corresponde a ninguna opción anterior
	header("HTTP/1.1 400 Bad Request");
?>