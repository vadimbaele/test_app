<?php include('connection.php');
include('inc_valid_session.php');

if ($session_valide == true)
{
	$query="SELECT * FROM Solutions WHERE ProjectID='".$_REQUEST['currentProject']."' ORDER BY Name";
	$_SESSION['currentProject'] = $_REQUEST['currentProject'];
	$result=mysql_query($query);
	$row = mysql_fetch_row($result);
	$num=mysql_numrows($result);
	$resp = "<table id='solutions'><tr style='border-bottom:solid;'><td>Name</td><td style='width: 50px;'></td><td>Requirements</td></tr>";
	$i=0;while ($i < $num) {
		$field1_name=mysql_result($result,$i,"Name");
		$field1_id=mysql_result($result,$i,"SolutionID");
		$field1_objective=mysql_result($result,$i,"Objective");
		$resp=$resp."<tr solution_id=".$field1_id." solution_nbr=".$i." solution_name='".$field1_name."' solution_comment='".$field1_objective."'><td>".$field1_name."</td><td><span class='clickable' onclick='edit_solution(".$i.");'>Edit</span></td><td class='clickable' onclick='list_requirements(".$i.")'>List</td></tr>";
		//echo $field1_name;
		$i++;
	}
	
	$resp=$resp."</table>";
	if ($num==0){
		$resp = 0;
	}
}
if ($resp == ""){
	$resp = 0;}
echo $resp;
?>