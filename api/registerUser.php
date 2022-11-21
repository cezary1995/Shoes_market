<?php
require "dbConnect.php";
//echo var_dump($_POST);
$email = mysqli_real_escape_string($mysqli, $_POST["mail"]);
$password = mysqli_real_escape_string($mysqli, $_POST["password"]);

//sprawdzenie czy email juz istnieje w bazie
$isMailExist="SELECT email FROM users WHERE email='$email'"; 
$mailQuery = mysqli_query($mysqli, $isMailExist);

//Jeżeli nie ma żadnego rekordu w bazie zawierającego email to dane zostaja dodane do bazy
if (mysqli_num_rows($mailQuery) == 0){
    $query = "INSERT INTO `users` (`id`, `email`, `pswd`) VALUES (NULL,  '$email', '$password');";
    $mysqli->query($query);
    echo json_encode(["message"=>"Zarejestrowano"]);
}

//Jak zwrócić jsona?
else {
    echo json_encode(["message"=>"Niezarejestrowano"]);
}
?>