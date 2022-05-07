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
    return "* Only alphabets and white space are allowed";
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
// Function to validate strings (allow alphabets and numbers only)
function validateUserName($string){
    if(!ctype_alnum($string))
        return "* must be alphanumeric (consists of numbers and letters only)";
    return "";
}
//function to validate a string (allow alphabets and white spaces only)
function validateName($string) {
    $pattern = "/^[a-zA-Z\s]*$/";
    if (!preg_match ($pattern, $string) ) {
        return "* Only alphabets and white space are allowed";
    } else {
        return "";
    }
}
//fucntion validate location
function validate_street_address($address) {
  $check_pattern = '/\d+ [0-9a-zA-Z ]+/';
  $has_error = preg_match($check_pattern, $address);
  if($has_error)
  {
  return "";
  }
  else{
    return "* location address must be contain number,st name";  
  }
  
  }
?>