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

require 'slim/slim/Slim/Slim.php';
require 'autoload.php';



$app = new Slim\Slim();

// return HTTP 200 for HTTP OPTIONS requests
$app->map('/:x+', function($x) {
    http_response_code(200);
})->via('OPTIONS');

// APP CODE GOES HERE

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