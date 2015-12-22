<?php

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}

date_default_timezone_set('America/New_York');

require '../vendor/slim/slim/Slim/Slim.php';
\Slim\Slim::registerAutoloader();
// require '../vendor/phpmailer/phpmailer/PHPMailerAutoload.php';
// require '../vendor/firebase/php-jwt/Authentication/JWT.php';
require 'control.php';
require 'class.php';

$app = new Slim\Slim();

// return HTTP 200 for HTTP OPTIONS requests
$app->map('/:x+', function($x) {
    http_response_code(200);
})->via('OPTIONS');

// throw new Exception("Invalid Credentials.", 401);

// Registration

$app->post('/register', function() use ( $app ) {
  $request = (array) json_decode($app->request->getBody());
  $action = new Identity;
  $action->register($request);
  $insert = new Request;
  $insert->insert( $action->sql );
  $insert->query($action->get( $insert ));
  $user = $insert->response;
  $user = $user[0];
  $user['fname'] = decode5t($user['fname']);
  $user['lname'] = decode5t($user['lname']);
  $response = $user;
  $app->setCookie('oy',$user['authorize'],'2 days','/','oneyum.org');
  echo json_encode( $response );
});

// Login

$app->post('/login', function() use ( $app ) {
  $request = (array) json_decode($app->request->getBody());
  $action = new Identity;
  $action->loginStart( $request );
  $query = new Request;
  $query->query( $action->sql );
  if (!$query) {
    throw new Exception("Email Does not exist.", 400);
    end( $app );
  }
  $query = $query->response;
  $query = $query[0];
  $check = $action->loginCheck( $query , $request );
  if ( !$check ) {
    echo json_encode(array('error'=>'Credentials Don\'t match. Please correct and try again.'));
    throw new Exception("Credentials don't match. Please try again.", 401);
    end( $app );
  }
  $action = new Identity;
  $user = $action->login( $request );
  $query = new Request;
  $user = $query->query( $user );
  $user = $user[0];
  $user['fname'] = decode5t($user['fname']);
  $user['lname'] = decode5t($user['lname']);
  $response = $user;
  $app->setCookie('oy',$user['authorize'],'2 days','/','oneyum.org');
  echo json_encode( $response );
});

// Refresh

$app->post('/refresh', function() use ( $app ) {
  $request = (array) json_decode($app->request->getBody());
  $action = new Identity;
  $action->refresh($request);
  $query = new Request;
  $user = $query->query( $action->sql );
  $user = $user[0];
  $response = $user;
  echo json_encode( $response );
});

$app->post('/checkemail', function() use ( $app ) {
  $request = (array) json_decode($app->request->getBody());
  $response = $request;
  echo json_encode( $response );
});

$app->post('/validatesupkey', function() use ( $app ) {
  $request = (array) json_decode($app->request->getBody());
  $response = $request;
  echo json_encode( $response );
});

$app->post('/supregister', function() use ( $app ) {
  $request = (array) json_decode($app->request->getBody());
  $response = $request;
  echo json_encode( $response );
});

$app->post('/meals', function() use ( $app ) {
  $request = (array) json_decode($app->request->getBody());
  $response = $request;
  echo json_encode( $response );
});





$app->post('/location', function() use ( $app ) {
  $request = (array) json_decode($app->request->getBody());
  switch ($request['action']) {
    case 'GET':
      break;
    
    case 'REMOVE':
      break;
    
    case 'EDIT':
      break;
    
    case 'ADD':
      $action = new Location;
      $action->add((array)$request['info']);
      $insert = new Request;
      $insert->insertNR($action->sql);
      if ($insert) {
        $response = (array)$request['info'];
      }
      break;
    
    default:
      # code...
      break;
  }

  

  // $response = array('hhold'=>$household,'locations'=>$locations);

  echo json_encode( $response );
});

$app->post('/household', function() use ( $app ) {
  $request = (array) json_decode($app->request->getBody());
  switch ($request['action']) {
    case 'GET':
      $action = new Household;
      $action->getAll((array)$request['info']);
      $query = new Request;
      $households = $query->query($action->sql);
      if (count($households)) {
        $response = $households;
      } else {
        $response = array();
      }
      break;
    
    case 'REMOVE':
      break;
    
    case 'EDIT':
      break;
    
    case 'ADD':
      $action = new Household;
      $action->create((array)$request['info']);
      $insert = new Request;
      $request['info']->hid = $insert->insert($action->sql);
      $response = $request['info'];
      break;
    
    default:
      # code...
      break;
  }
  // $response = $request;
  echo json_encode( $response );
});

$app->post('/members', function() use ( $app ) {
  $request = (array) json_decode($app->request->getBody());
  switch ($request['action']) {
    case 'GET':
      $action = new Members;
      $action->get((array)$request['info']);
      $insert = new Request;
      $response = $insert->query($action->sql);
      break;
    
    case 'REMOVE':
      break;
    
    case 'EDIT':
      break;
    
    case 'ADD':
      $action = new Members;
      $action->add((array)$request['info']);
      $insert = new Request;
      $insert->insertNR($action->sql);
      $response = $request['info'];
      break;
    
    default:
      # code...
      break;
  }
  // $response = $request;
  echo json_encode( $response );
});

$app->error( function ( Exception $exc ) use ( $app ) {
   if ( $exc->getCode() !== 0 ) {
      $app->response->setStatus( $exc->getCode() );
   }

   $app->response->headers->set( 'Content-Type', 'application/json' );
   echo json_encode( array("error" => $exc->getMessage() ));
});
// THE SYNTAX FOR SETTING UP ROUTES AND REQUEST TYPES ARE AS THE FOLLOWING LINE STATES.
// $app->post('LINK/LOCATION/URL/:values', 'FUNCTION_NAME')

$app->run();

?>