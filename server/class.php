<?php

class Request {
	public $response;

	function insert( $sql ) {
		$db = getConnection();
		try {
			$stmt = $db->prepare( $sql )->execute();
			$newid = $db->lastInsertId();
			$this->response = $newid;
		} catch(PDOExption $e) {
			throw new Exception("Request Class Error Insert 25", $e , 401);
		}
		return $this->response;
	}

	function query( $sql ) {
		$db = getConnection();
		try {
			$stmt = $db->query( $sql )->fetchAll(PDO::FETCH_ASSOC);
			$this->response = $stmt;
		} catch(PDOExption $e) {
			throw new Exception("Request Class Error Query 36", $e , 402);
		}
		return $this->response;
	}

	function update( $sql ) {
		$db = getConnection();
		try {
			$stmt = $db->prepare( $sql )->execute();
			$this->response = $stmt->rowCount();
		} catch(PDOExption $e) {
			throw new Exception("Request Class Error Insert 25", $e , 401);
		}
		return $this->response;
	}

	function delete( $sql ) {
		$db = getConnection();
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
	public $sql;

	function register($data) {
		require_once('control.php');
		$this->firstname = encode5t($data['fname']);
		$this->lastname = encode5t($data['lname']);
		$this->email = $data['email'];
		$this->salt = createSalt();
		$this->secret = createHash($this->salt, $data['password']);
		$this->verified = false;
		$this->authorize = getToken(32);
		$this->req = getToken(32);
		$this->perma = getToken(32);
		$this->avatar = '';
		$this->sup = false;
		$this->part = false;
		$this->corp = false;
		$this->sql = "INSERT INTO ident (fname,lname,email,salt,secret,verified,authorize,req,perma,sup,part,corp,avatar) VALUES ('$this->firstname','$this->lastname','$this->email','$this->salt','$this->secret','$this->verified','$this->authorize','$this->req','$this->perma','$this->sup','$this->part','$this->corp','$this->avatar');";
		return $this->sql;
	}

	function loginStart($data) {
		require_once('control.php');
		$this->email = $data['email'];
		$this->sql = "SELECT salt,secret FROM ident WHERE email = '$this->email';";
		return $this->sql;
	}

	function loginCheck($data,$check) {
		$this->salt = $data['salt'];
		$this->secret = $data['secret'];
		if($this->secret === createHash($this->salt,$check['secret'])){
			return true;
		} else {
			return false;
		};
	}

	function login($data) {
		$this->email = $data['email'];
		$this->sql = "SELECT id,fname,lname,email,start,verified,perma,avatar,sup,part,corp FROM ident WHERE email = '$this->email';";
		return $this->sql;
	}

	function get($data) {
		$this->id = $data->response;
		$this->sql = "SELECT id,fname,lname,email,start,verified,perma,avatar,sup,part,corp FROM ident WHERE id = '$this->id';";
		return $this->sql;
	}

}

class Household {
	public $response;
	protected $id;
	protected $hid;
	public $sql;

	function create( $data ) {
		$this->id = 	$data['id'];
		$this->hid = 	$data['hid'];
		$this->sql = 	"INSERT INTO household (id,hid) VALUES ('$this->id','$this->hid');";
		return $this->sql;
	}

	function getAll( $data ) {
		$this->sql = '';
		return $this->sql;
	}

	function get( $data ) {
		$this->sql = '';
		return $this->sql;
	}
}

class Location {
	public $response;
	protected $hid;
	protected $name;
	protected $street;
	protected $city;
	protected $state;
	protected $zip;
	public $sql;

	function add($data) {
		$this->hid = 	$data['hid'];
		$this->name = 	$data['name'];
		$this->street = $data['street'];
		$this->city = 	$data['city'];
		$this->state = 	$data['state'];
		$this->zip = 	$data['zip'];
		$this->sql = 	"INSERT INTO location (hid,name,street,city,state,zip) VALUES ('$this->hid','$this->name','$this->street','$this->city','$this->state','$this->zip');";
		return $this->sql;
	}

	function get($data) {
		$this->hid = $data['hid'];
		$this->sql = "SELECT * FROM location WHERE hid = '$this->hid';";
		return $this->sql;
	}

	function update($data) {
		$this->hid = 	$data['hid'];
		$this->name = 	$data['name'];
		$this->street = $data['street'];
		$this->city = 	$data['city'];
		$this->state = 	$data['state'];
		$this->zip = 	$data['zip'];
		$this->sql = "UPDATE location SET name = '$this->name', street = '$this->street', city = '$this->city', state = '$this->state', zip = '$this->zip';";
		return $this->sql;
	}

}


?>