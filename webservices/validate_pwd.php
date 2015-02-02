<?php include('connection.php'); 

$term = $_REQUEST['term'];
$password = $_REQUEST['password'];

//include('contre_injection.php');

$query_cookie2="SELECT userID, ActiveProjectID FROM Users WHERE Email='".$term."' AND Password='".md5($password)."'";
//echo $query_cookie2;
$result_cookie2=mysql_query($query_cookie2);
$row_cookie2 = mysql_fetch_row($result_cookie2);

$resp = $row_cookie2[0];
if ($resp == ""){
	$resp = 0;
}else{
	session_start();
	$_SESSION['login'] = $term;
	$_SESSION['pwd'] = $password;
	$_SESSION['userID'] = $resp;
	$_SESSION['ActiveProjectID'] = $row_cookie2[1];
}
echo $resp;

mysqli_close($con);

?>