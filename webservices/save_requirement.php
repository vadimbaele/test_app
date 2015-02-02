<?php include('connection.php');
include('inc_valid_session.php');

if ($session_valide == true)
{
	$query = "UPDATE Requirements SET Name='".$_REQUEST['name']."', Comments='".$_REQUEST['comment']."' WHERE RequirementID='".$_REQUEST['requirementID']."'";
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