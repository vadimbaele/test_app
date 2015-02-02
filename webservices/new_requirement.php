<?php include('connection.php');
include('inc_valid_session.php');

function GUID()
{
    if (function_exists('com_create_guid') === true)
    {
        return trim(com_create_guid(), '{}');
    }

    return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
}

if ($session_valide == true)
{
	$query = "INSERT INTO Requirements VALUES ('".GUID()."','".$_REQUEST['projectID']."','".$_REQUEST['currentSolution']."','".$_REQUEST['name']."','".$_REQUEST['comment']."')";
	echo $query;
	$result=mysql_query($query);
	/*
	$query="SELECT * FROM Solutions WHERE ProjectID='".$_REQUEST['currentProject']."'";
	$result=mysql_query($query);
	$row = mysql_fetch_row($result);
	*/
}
$resp = 0;
echo $resp;



?>