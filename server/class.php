<?php

class Connect {
	protected $db;

	function set() {
		require_once('config.php');
		$this->db = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
  		$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  		return $this->db;
	}
}

class Request {
	protected $db;
	protected $response;

	function insert( $sql ) {
		$this->db = new Connect;
		$this->db->set();
		try {
			$stmt = $db->prepare( $sql )->execute();
			$this->response = $db->lastInsertId();
		} catch(PDOExption $e) {
			throw new Exception("Request Class Error Insert 25", $e , 401);
		}
		return $this->response;
	}

	function query( $sql ) {
		$this->db = new Connect;
		$this->db->set();
		try {
			$stmt = $db->query( $sql )->fetchAll(PDO::FETCH_ASSOC);
			$this->response = $stmt;
		} catch(PDOExption $e) {
			throw new Exception("Request Class Error Query 36", $e , 402);
		}
		return $this->response;
	}

	function update( $sql ) {
		$this->db = new Connect;
		$this->db->set();
		try {
			$stmt = $db->prepare( $sql )->execute();
			$this->response = $stmt->rowCount();
		} catch(PDOExption $e) {
			throw new Exception("Request Class Error Insert 25", $e , 401);
		}
		return $this->response;
	}

	function delete( $sql ) {
		$this->db = new Connect;
		$this->db->set();
		try {
			$stmt = $db->execute( $sql );
		} catch(PDOExption $e) {
			throw new Exception("Request Class Error Insert 25", $e , 401);
		}
		return $this->response;
	}
}

class Identity {
	protected $response;
	protected $id;
	protected $email;
	protected $firstname;
	protected $lastname;
	protected $username;
	protected $salt;
	protected $secret;
	protected $start;
	protected $verified;
	protected $authorize;
	protected $req;
	protected $avatar;
	protected $perma;
	protected $sup;
	protected $part;
	protected $corp;

	function register($data) {

	}

}


?>