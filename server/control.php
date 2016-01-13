<?php

function getConnection() {
  require "config.php";
  $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
  $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $dbh;
}

function createSalt() {
	$string = md5(uniqid(rand(), true));
	return substr($string, 0, 10);
}

function createHash($salt,$pass) {
	return hash('sha256',$salt.passHash($pass));
}

function passHash($pass) {
	return hash('sha256',$pass);
}

function crypto_rand_secure($min, $max) {
    $range = $max - $min;
    if ($range < 0) return $min; // not so random...
    $log = log($range, 2);
    $bytes = (int) ($log / 8) + 1; // length in bytes
    $bits = (int) $log + 1; // length in bits
    $filter = (int) (1 << $bits) - 1; // set all lower bits to 1
    do {
        $rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
        $rnd = $rnd & $filter; // discard irrelevant bits
    } while ($rnd >= $range);
    return $min + $rnd;
}

function getToken($length) {

	$token;
    $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $codeAlphabet.= "abcdefghijklmnopqrstuvwxyz";
    $codeAlphabet.= "0123456789";
    for($i=0;$i<$length;$i++){
        $token .= $codeAlphabet[crypto_rand_secure(0,strlen($codeAlphabet))];
    }
    return $token;
}

function getDeviceInfo() {
	$ip = getenv("REMOTE_ADDR") ;
	$dname = php_uname('n');
	return array('ip'=>$ip,'dname'=>$dname);
}

function encode5t($str)
{
  for($i=0; $i<5;$i++)
  {
    $str=strrev(base64_encode($str)); //apply base64 first and then reverse the string
  }
  return $str;
}

//function to decrypt the string
function decode5t($str)
{
  for($i=0; $i<5;$i++)
  {
    $str=base64_decode(strrev($str)); //apply base64 first and then reverse the string}
  }
  return $str;
}

function ContactEmail($email,$subject,$message,$target) {
  // Host Names (CNAME)

  // POP  pop.secureserver.net
  // IMAP imap.secureserver.net
  // SMTP smtpout.secureserver.net

  // email: tiprteam@mytipr.com
  // pass:Powerful1!

  //SMTP needs accurate times, and the PHP time zone MUST be set
  //This should be done in your php.ini, but this is how to do it if you don't have access to that
  date_default_timezone_set('America/New_York');
  //Create a new PHPMailer instance
  $mail = new PHPMailer;
  //Tell PHPMailer to use SMTP
  $mail->isSMTP();
  //Enable SMTP debugging
  // 0 = off (for production use)
  // 1 = client messages
  // 2 = client and server messages
  $mail->SMTPDebug = 2;
  //Ask for HTML-friendly debug output
  $mail->Debugoutput = 'html';
  //Set the hostname of the mail server
  $mail->Host = 'a2plcpnl0368.prod.iad2.secureserver.net';
  //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
  $mail->Port = 465;
  //Set the encryption system to use - ssl (deprecated) or tls
  $mail->SMTPOptions = array(
      'ssl' => array(
          'verify_peer' => false,
          'verify_peer_name' => false,
          'allow_self_signed' => true
      )
  );
  //Whether to use SMTP authentication
  $mail->SMTPAuth = true;
  //Username to use for SMTP authentication - use full email address for gmail
  $mail->Username = "support@oneyum.org";
  //Password to use for SMTP authentication
  $mail->Password = ".sUF!CnIFx;S";
  //Set who the message is to be sent from
  $mail->setFrom($email);

  if ($target === 'Bobby Fisher') {
    //Set who the message is to be sent to
    $mail->addAddress('bobbyfisher@oneyum.org', 'Bobby Fisher');
  }
  if ($target === "Joseph Royal") {
    //Set who the message is to be sent to
    $mail->addAddress('joeroyal@oneyum.org', 'Joseph Royal');
  }
  //Set the subject line
  if ($subject) {
    $mail->Subject = $subject;
  } else {
    $mail->Subject = 'Message From Contact Page';
  }
  //Read an HTML message body from an external file, convert referenced images to embedded,
  //convert HTML into a basic plain-text alternative body
  $mail->msgHTML($message);
  //Replace the plain text body with one created manually
  $mail->AltBody = 'This is a plain-text message body';
  //send the message, check for errors
  if (!$mail->send()) {
      return $mail->ErrorInfo;
  } else {
      return false;
  }
}


?>