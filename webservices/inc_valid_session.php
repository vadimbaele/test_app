<?php
session_start();
$session_valide = false;
if (isset($_SESSION['login']) && isset($_SESSION['pwd'])) { //verify the session
	$session_valide = true;

}else{ //if no session available, redirect to the login page
}

?>