<?php include 'conexion.php'; //Importamos el archivo de conexión para realizar la conexión

	$pdo = new Conexion(); //Creamos una instancia de la clase para poder utlizarla

	$url = !empty($_GET['ruta']) ? $_GET['ruta'] : "all";
	$arrayUrl = explode("/", $url);
	$nro_items = 12; //Número de items máximo por páginas

	//Listar registros y consultar registro según tipo de parámtro recibido

	if($_SERVER['REQUEST_METHOD'] == 'GET'){	
		
		if($url === 'all'){
		
			$sql = $pdo->prepare("SELECT * FROM product ORDER BY price ASC LIMIT 0,12");
			$sql->execute();		
			$sql->setFetchMode(PDO::FETCH_ASSOC);
											
		}else if($url === 'allcategories'){
			$sql = $pdo->prepare("SELECT * FROM category ORDER BY name");					
			$sql->execute();
			$sql->setFetchMode(PDO::FETCH_ASSOC);	
		}else if($url === 'nropages'){			
			$sql = $pdo->prepare("SELECT * FROM product ORDER BY price ASC");
			$sql->execute();		
			$count_rows = $sql->fetchColumn();
			$nro_pages = ceil($count_rows / $nro_items);
			echo $nro_pages; 
			die();
		}else{

			$param1 = $arrayUrl[0];
			$param2 = $arrayUrl[1];		
			
			if($param1 === 'search'){				
				$sql = $pdo->prepare("SELECT * FROM product WHERE product.name LIKE :product ORDER BY price ASC");
				$search = '%'.$param2.'%';
				$sql->bindParam(':product',$search, PDO::PARAM_STR);
				$sql->execute();									
			}else if($param1 === 'page'){
																
				$start = ($param2 - 1) * $nro_items;

				$sql = $pdo->prepare("SELECT * FROM product ORDER BY price ASC LIMIT ".$start.",".$nro_items);
				$sql->execute();		
				$sql->setFetchMode(PDO::FETCH_ASSOC);

			}else{
				$sql = $pdo->prepare("SELECT * FROM product WHERE ".$param1."=:".$param1." ORDER BY price ASC");
				$sql->bindValue(':'.$param1, $param2);
				$sql->execute();
				$sql->setFetchMode(PDO::FETCH_ASSOC);	
			}
			
		}	

		header("HTTP/1.1 200 hay datos");
		echo json_encode($sql->fetchAll());
		exit;	

	}
	
	//Si no corresponde a ninguna opción anterior
	header("HTTP/1.1 400 Bad Request");	

?>
