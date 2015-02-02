<?php include('connection.php');
include('inc_valid_session.php');

if ($session_valide == true)
{
	$query = "UPDATE Solutions SET Name='".$_REQUEST['name']."', Objective='".$_REQUEST['objective']."' WHERE SolutionID='".$_REQUEST['solutionID']."'";
	//echo $query;
	$result=mysql_query($query);
	/*
	$query="SELECT * FROM Solutions WHERE ProjectID='".$_REQUEST['currentProject']."'";
	$result=mysql_query($query);
	$row = mysql_fetch_row($result);
	*/
}
if ($resp == ""){
	$resp = 0;}
echo $resp;



?>