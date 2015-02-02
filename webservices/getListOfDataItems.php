<?php include('connection.php');
include('inc_valid_session.php');

if ($session_valide == true)
{
	/*if ($_REQUEST['currentSolution'] <> "")
	{
		$currentSolution = $_REQUEST['currentSolution'];
		$query="SELECT * FROM Requirements WHERE SolutionID='".$currentSolution."' AND ProjectID='".$_SESSION['currentProject']."' ORDER BY Name";
	}else{
		$query="SELECT * FROM Requirements WHERE ProjectID='".$_SESSION['currentProject']."' ORDER BY Name";
	}*/
	$query="SELECT * FROM DataItems WHERE ProjectID='".$_SESSION['currentProject']."' ORDER BY Name";
	/*$query2="SELECT * FROM Solutions WHERE ProjectID='".$_SESSION['currentProject']."' ORDER BY Name";
	$result2=mysql_query($query2);*/
	$result=mysql_query($query);
	$row = mysql_fetch_row($result);
	/*$row2 = mysql_fetch_row($result2);
	$num2=mysql_numrows($result2);*/
	$num=mysql_numrows($result);
	$resp = "<div id='tabs-3'><h2>Data Items</h2><button onclick='new_dataItem();'>Add New</button><br /><br /><select id='select_requirements' onchange='change_solution()'><option value='0'>All</option>";
	//$resp = $resp . $num2;
	/*$i=0;while ($i < $num2) {
		$field2_name=mysql_result($result2,$i,"Name");
		$field2_id=mysql_result($result2,$i,"SolutionID");
		if ($field2_id == $_REQUEST['currentSolution'])
		{
			$resp = $resp . "<option value='".$field2_id."' selected>".$field2_name."</option>";
		}else{
			$resp = $resp . "<option value='".$field2_id."'>".$field2_name."</option>";
		}
		$i++;
	}*/
	
	$resp = $resp . "</select><br /><table id='dataItem'><tr style='border-bottom:solid;'><td>Name</td><td style='width: 50px;'></td><td>Data Items</td></tr>";
	$i=0;while ($i < $num) {
		$field1_name=mysql_result($result,$i,"Name");
		$field1_id=mysql_result($result,$i,"DataItemID");
		$field1_comments=mysql_result($result,$i,"Comments");
		$resp=$resp."<tr dataItem_id=".$field1_id." dataItem_nbr=".$i." dataItem_name='".$field1_name."' dataItem_comment='".$field1_comments."'><td>".$field1_name."</td><td><span class='clickable' onclick='edit_dataItem(".$i.");'>Edit</span></td><td class='clickable'>List</td></tr>";
		//echo $field1_name;
		$i++;
	}
	
	$resp=$resp."</table></div>";
	if ($num==0){
		$resp = 0;
	}
}

if ($resp == ""){
	$resp = 0;}
echo $resp;
?>