<?php
require "dbConnect.php";
//echo var_dump($_POST);
$emailLogin = mysqli_real_escape_string($mysqli, $_POST["loginMail"]);
$pswd = mysqli_real_escape_string($mysqli, $_POST["loginPassword"]);
$query = "SELECT email, pswd FROM users WHERE email = '$emailLogin' AND pswd = '$pswd';";

$loginQuery = mysqli_query($mysqli, $query);

if (mysqli_num_rows($loginQuery) > 0){
    // echo mysqli_num_rows($loginQuery);
    // header('Location:welcomePage.html');  
    // exit;
    // json encode konwertuje to co jest w tablicy na format json (klucz :wartość)
    echo json_encode(["message"=>"Zalogowano"]);
}
else {
    echo json_encode(["message"=>"Niezalogowano"]);
}


//Jak zrobić przekierowanie na stronę?

?>