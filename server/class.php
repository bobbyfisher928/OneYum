<?php
class AUTHTOKEN {
	public $response;

	function get() {
		$this->response = "ONEYUM_AUTHTOKEN";
		return $response;
	}
}


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

	function insertNR( $sql ) {
		$db = getConnection();
		try {
			$stmt = $db->prepare( $sql )->execute();
			$this->response = $stmt;
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

class AUTH {
	public $token = array(
	    "iss" => '',
	    "aud" => '',
	    "exp" => '',
	    "nbf" => '',
	    "iat" => '',
	    "ide" => '',
	    "dev" => ''
	);

	function set($origin,$ide) {
		$this->token['iss'] = $origin;
		$this->token['aud'] = $origin;
		$this->token['ema'] = encode5t($ide);
		$this->token['dev'] = getDeviceInfo();
		$this->token['exp'] = new DateTime()+strtotime("2 days");
		$this->token['iat'] = strtotime("now");
		$this->token['nbf'] = new DateTime();
		return $this->token;
	}

	// function check(data) {

	// }
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
		if ($data['password']) {
			$this->secret = createHash($this->salt, $data['password']);
		} else {
			$this->secret = createHash($this->salt, $data['fname'].'_'.$data['lname'].'_'.substr($data['email'],0,4));
		}
		
		$this->verified = false;
		$this->authorize = getToken(32);
		$this->req = getToken(32);
		$this->perma = getToken(32);
		if (!$data['avatar']) {
			$this->avatar = '';
		} else {
			$this->avatar = $data['avatar'];
		}
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
		if (!$check['secret']) {
			$check['secret'] = $check['fname'].'_'.$check['lname'].'_'.substr($check['email'],0,4);
		}
		if($this->secret === createHash($this->salt,$check['secret'])){
			return true;
		} else {
			return false;
		};
	}

	function login($data) {
		$this->email = $data['email'];
		$this->sql = "SELECT id,fname,lname,email,start,authorize,verified,perma,avatar,sup,part,corp FROM ident WHERE email = '$this->email';";
		return $this->sql;
	}

	function get($data) {
		$this->id = $data->response;
		$this->sql = "SELECT id,fname,lname,email,start,authorize,verified,perma,avatar,sup,part,corp FROM ident WHERE id = '$this->id';";
		return $this->sql;
	}

	function refresh($data) {
		$this->authorize = $data['authorize'];
		$this->sql = "SELECT id,fname,lname,email,start,authorize,verified,perma,avatar,sup,part,corp FROM ident WHERE authorize = '$this->authorize';";
		return $this->sql;
	}
	function getName($data) {
		$this->id = $data;
		$this->sql = "SELECT fname,lname FROM ident WHERE id = '$this->id';";
		return $this->sql;
	}
}

class Household {
	public $response;
	protected $id;
	protected $hid;
	protected $name;
	public $sql;

	function create( $data ) {
		$this->id = 	$data['id'];
		$this->name = 	str_replace("'", "\'", $data['name']);
		$this->sql = 	"INSERT INTO household (id,name) VALUES ('$this->id','$this->name');";
		return $this->sql;
	}

	function getAll( $data ) {
		$this->id = $data['id'];
		$this->sql = "SELECT hid,name FROM household WHERE id = '$this->id';";
		return $this->sql;
	}

	function update( $data ) {
		$this->sql = '';
		return $this->sql;
	}

	function remove($data) {
		$this->sql = '';
		return $this->sql;
	}
}

class Members {
	public $sql;
	protected $id;
	protected $name;

	function add($data) {
		$this->hid = $data['hid'];
		$this->id = $data['id'];
		$this->name = $data['name'];
		if ($data['id']) {
			$this->sql = "INSERT INTO members (hid,id,name) VALUES ('$this->hid','$this->id','$this->name');";
		} else {
			$this->sql = "INSERT INTO members (hid,name) VALUES ('$this->hid','$this->name');";
		}
		
		return $this->sql;
	}

	function remove($data) {
		$this->sql = "";
		return $this->sql;
	}

	function get($data) {
		$this->hid = $data['hid'];
		$this->sql = "SELECT * FROM members WHERE hid = '$this->hid';";
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
		$this->hid =	$data['hid'];
		$this->name = 	str_replace("'", "\'", $data['name']);
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

	function getAll( $data ) {
		$this->sql = "SELECT * FROM location WHERE hid = '";
		if (count($data) === 1) {
			$this->sql .= $data[0]['hid'] . "';";
			return $this->sql;
		} else if (count($data) > 1) {
			for ($i=0; $i < count($data); $i++) { 
				$this->sql .= $data[$i]['hid'];
				if ($i < (count($data)-1)) {
					$this->sql .= "' OR hid = '";
				} else {
					$this->sql .= "';";
				}
			}
			return $this->sql;
		}
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