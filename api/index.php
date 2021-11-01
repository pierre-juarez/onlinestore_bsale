<?php include 'conexion.php'; //Importamos el archivo de conexión para realizar la conexión

	$pdo = new Conexion(); //Creamos una instancia de la clase para poder utlizarla

	//Listar registros y consultar registro según tipo de parámtro recibido
	if($_SERVER['REQUEST_METHOD'] == 'GET'){		
		if(isset($_GET['category'])){
					$sql = $pdo->prepare("SELECT * FROM product WHERE category=:category ORDER BY price ASC");
					$sql->bindValue(':category', $_GET['category']);
					$sql->execute();
					$sql->setFetchMode(PDO::FETCH_ASSOC);
					header("HTTP/1.1 200 hay datos");
					echo json_encode($sql->fetchAll());
					exit;						
		}else if(isset($_GET['search'])){
					$sql = $pdo->prepare("SELECT * FROM product WHERE product.name LIKE :product ORDER BY price ASC");
					$search = '%'.$_GET['search'].'%';
					$sql->bindParam(':product',$search, PDO::PARAM_STR);
					$sql->execute();					
					header("HTTP/1.1 200 hay datos");
					echo json_encode($sql->fetchAll());
					exit;				
		}else if(isset($_GET['order'])){
					$order = ($_GET['order'] == 'higher_price') ? 'DESC' : 'ASC';					
					$sql = $pdo->prepare("SELECT * FROM product ORDER BY price ".$order);					
					$sql->execute();
					$sql->setFetchMode(PDO::FETCH_ASSOC);
					header("HTTP/1.1 200 hay datos");
					echo json_encode($sql->fetchAll());
					exit;			
		}else{					
					$sql = $pdo->prepare("SELECT * FROM product ORDER BY price ASC ");
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
