<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header("Allow: GET, POST, OPTIONS, PUT, DELETE");
	$method = $_SERVER['REQUEST_METHOD'];
	if($method == "OPTIONS") {
	    die();
	}
	class Conexion extends PDO{
		
		private $hostBd = 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com';
		private $nombreBd = 'bsale_test';
		private $usuarioBd = 'bsale_test';
		private $passwordBd = 'bsale_test';
		
		public function __construct(){

			try{ //Realizamos la conexión a la BD, utlizando PDO, mysqli
				parent::__construct('mysql:host=' . $this->hostBd . ';dbname=' . $this->nombreBd . ';charset=utf8', $this->usuarioBd, $this->passwordBd, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
				
			}catch(PDOException $e){
				echo 'Error: ' . $e->getMessage(); exit;
			}

		}
	}
?>