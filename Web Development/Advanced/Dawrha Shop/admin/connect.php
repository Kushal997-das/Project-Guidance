<?php

// connect to the database
$dsn = 'mysql:host=localhost;dbname=dawrhashop';
$user = 'root';
$pass = '1234';
$options = array (
  PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
);

try {
  $db = new PDO($dsn, $user, $pass, $options);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e) {
  echo $e;
}

?>