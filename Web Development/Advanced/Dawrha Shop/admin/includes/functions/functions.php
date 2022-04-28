<?php

//function to get the title of the page dynamically for any page in the site
function getTitle() {
  global $pageTitle;
  if(isset($pageTitle)) {
    echo $pageTitle;
  }else {
    echo "Dawarha";
  }
}

//function to filter the given data
function input_data($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

//function to validate a string
function validateString($string) {
  $pattern = "/^[a-zA-z]*$/";
  if (!preg_match ($pattern, $string) ) {
    return "* Only alphabets are allowed";
  } else {
    return "";
  }
}

//function to validate usernames
function validateUserName($string) {
  $pattern = "/^[a-zA-Z\d]+$/";
  if (!preg_match ($pattern, $string) ) {
    return "* Only alphabets and numbers are allowed";
  } else {
    return "";
  }
}

//function to validate a number 
function validateNumber($num) {
  $pattern = "/^[0-9]*$/";
  if (!preg_match ($pattern, $num) ) {
    return "* Only numeric value is allowed";
  } else {
    return "";
  }
}

//function to validate email
function validateEmail($email) {
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {  
    return "* Invalid email format";  
  } else {
    return "";
  }
}

//function to validate password
function validatePassword($pass) {
// Validate password strength
  $uppercase = preg_match('@[A-Z]@', $pass);
  $lowercase = preg_match('@[a-z]@', $pass);
  $number    = preg_match('@[0-9]@', $pass);

  if(!$uppercase || !$lowercase || !$number || strlen($pass) < 8) {
    return "* Password should be at least 8 characters in length and should include at least one upper case letter, and one number";
  } else {
    return "";
  }
}


//functions to validate the size of each input
function sizeString($string) {
  if (strlen($string) > 20) {
    return "* Input Can\'t be more than 20 Characters";
  } else {
    return "";
  }
}

function sizeNumber($number) {
  if (strlen($number) > 11) {
    return "* Number Can\'t be more than 11 Digits";
  } else {
    return "";
  }
}

function sizeEmail($email) {
  if (strlen($email) > 70) {
    return "* Email Can\'t be more than 70 Characters";
  } else {
    return "";
  }
}

function sizeCatName($name) {
  if (strlen($name) > 30) {
    return "* Category Name Can\'t be more than 30 Characters";
  } else {
    return "";
  }
}

function sizeCatDes($des) {
  if (strlen($des) > 300) {
    return "* Category Description Can\'t be more than 300 Characters";
  } else {
    return "";
  }
}



?>