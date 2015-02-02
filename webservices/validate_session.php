<?php
session_start();

if (isset($_SESSION['login']) && isset($_SESSION['pwd'])) { //verify the session
	echo $_SESSION['login'];

}else{ //if no session available, redirect to the login page
	echo 0;

}

?>