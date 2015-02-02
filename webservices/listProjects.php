<?php include('connection.php');
include('inc_valid_session.php');

if ($session_valide == true)
{
	$query="SELECT ProjectID FROM UserProject WHERE UserID='".$_SESSION['userID']."'";
	//echo $query;
	$result=mysql_query($query);
	$row = mysql_fetch_row($result);
	//$resp;
	$num=mysql_numrows($result);
	$i=0;while ($i < $num) {
		$field1=mysql_result($result,$i,"ProjectID");
		$query2="SELECT Name FROM Projects WHERE ProjectID='".$field1."'";
		$result2=mysql_query($query2);
		$row2 = mysql_fetch_row($result2);
		//echo $row2[0];
		
		if ($field1 == $_SESSION['ActiveProjectID'])
		{
			$resp = $resp."<option value='". $field1 ."' selected='selected'>". $row2[0] ."</option>";
		}else{
			$resp = $resp."<option value='". $field1 ."' >".$row2[0] ."</option>";
		}
		//$resp = "<option value=". proj_list[1] ." selected='selected'>". proj_list[0] ."</option>"
		/*if ($resp == ""){
			$resp=$row2[0] . "|".$i;
		}else{
			$resp= $resp ."-". $row2[0] . "|".$i;}*/
		$i++;
	}
}else{
$resp = 0;
}
if ($resp == ""){
	$resp = 0;}
echo $resp;
?>