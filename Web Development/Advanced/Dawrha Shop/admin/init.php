<?php 
include 'connect.php';

//Routes 
$tpl = "includes/temps/";
$func = "includes/functions/";
$css = "layout/css/";
$js = "layout/js/";


include $func . 'functions.php';
include $func . 'controller.php';
include $tpl . "header.php";

if(!isset($noNavbar)) { include $tpl . "navbar.php"; }

?>