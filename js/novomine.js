var login;
var currentProject; //Contains the active current project
var password;
var currentSolution;
webservice("webservices/validate_session.php",2);
function webservice(url, request_nb){ //Function for the ajax calls
	//alert(url);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			if (request_nb==1){
				validate_pwd(xmlhttp.responseText);
			}else if (request_nb==2){
				validate_session(xmlhttp.responseText);
			}else if (request_nb==3){
				deconnection(xmlhttp.responseText);
			}else if (request_nb==4){
				listProjects(xmlhttp.responseText);
			}else if (request_nb==5){
				listOfSolutions(xmlhttp.responseText);
			}else if (request_nb==6){
				getListOfSolutions(xmlhttp.responseText);
			}else if (request_nb==7){
				getListOfSolutions(xmlhttp.responseText);
			}else if (request_nb==8){
				getListOfRequirements(xmlhttp.responseText);
			}else if (request_nb==9){
				$("#menu").tabs("option","active",0);
				getListOfSolutions(xmlhttp.responseText);
			}else if (request_nb==10){
				$("#menu").tabs("option","active",0);
				getListOfSolutions(xmlhttp.responseText);
			}
			
		}
	}
	xmlhttp.open("POST", url, true);
	xmlhttp.send();
}

function validate_pwd(response) {
	if (response == 0){
		remarque(3);
	}else{ //If the user connects
		$("#loginform").css("display","none");
		$("#content").css("height","100%");
		$("#content").css("margin-top","0");
		$("#content").css("margin-bottom","0");
		$("#menu").css("display","block");
		$("#logout").css("display","block");
		$("#login_display").text(login);
		$("h1").text("HELIOS");
		webservice("webservices/listProjects.php",4);
	}
}
function validate_session(response) {
	if (response == 0){
	
	}else{ 
		login = response;
		validate_pwd(response);
	}
}

function getListOfRequirements(response){
	$('#tabs-2').html("");
	$('#tabs-2').append(response);
}

function listProjects(response) {
	if (response == 0){
		remarque(4);
	}else{ 
		$('#proj_list').append(response);
		currentProject = $("#proj_list [selected='selected']").val();
		getListOfSolutions();
	}
}

function listOfSolutions(response) {
	if (response == 0){
		remarque(5);
		$('#tabs-1').html("<button onclick='new_solution();'>Add New</button>");
	}else{ 
		$('#tabs-1').html("<h2>Solutions</h2><button onclick='new_solution();'>Add New</button><br /><br />");
		$('#tabs-1').append(response);
		//currentProject = $("#proj_list [selected='selected']").val();
	}
}

function getListOfSolutions(){
	webservice("webservices/getListOfSolutions.php?currentProject="+currentProject,5);
}

function deconnection(response) {
	if (response == 0){
	
	}else{ 
		window.location.reload();
	}
}

function edit_solution(solution_nbr){
	var solution_ID = $("table#solutions tr[solution_nbr="+solution_nbr+"]").attr("solution_id");
	var solution_text = $("table#solutions tr[solution_nbr="+solution_nbr+"]").attr("solution_name");
	var solution_comment = $("table#solutions tr[solution_nbr="+solution_nbr+"]").attr("solution_comment");
	$('#tabs-1').html("<h3>Solution : "+solution_text+"</h3>");
	$('#tabs-1').append("Solution name : <input type='text' id='solutionName' value='"+solution_text+"'><br />Objective : <input type='text' value='"+solution_comment+"' size='80' id='solutionObjective'><br /><input type='hidden' id='solution_ID' value='"+solution_ID+"'><button onclick='save_solution();'>Save</button>");
	
}

function save_solution(){
	var solutionName = $("#solutionName").val();
	var solutionObjective = $("#solutionObjective").val();
	var solutionID = $("#solution_ID").val();
	if (solutionName =="")
	{
		remarque(6);
	}else{
		if (solutionObjective =="")
		{
			remarque(7);
		}else{
			webservice("webservices/save_solution.php?solutionID="+solutionID+"&name="+solutionName+"&objective="+solutionObjective,7)
		}
	}

}

function loginForm(){
	login = $("#login").val(); 
	password = $("#password").val();
	$("#remarque").css("display","none");
	if (login==""){
		remarque(1);
	}else{
		if (password =="")
		{
			remarque(2);
		}else{ //if there is a login and a password
				var url = "/webservices/validate_pwd.php?term="+login+"&password="+password;
				webservice(url,1);
		
		}
	}
}

function remarque(error_nb){
	var error_msg;
	$("#remarque").css("display","block");
	if (error_nb ==1){
		error_msg = "Please insert your login";
	}else if (error_nb ==2){
		error_msg = "Please insert your password";
	}else if (error_nb ==3){
		error_msg = "Wrong login or password";
	}else if (error_nb ==4){
		error_msg = "You do not have any active projects";
	}else if (error_nb ==5){
		error_msg = "There is no solution for this project!";
	}else if (error_nb ==6){
		error_msg = "Enter a name for this solution";
	}else if (error_nb ==7){
		error_msg = "Enter an objective for this solution";
	}else if (error_nb ==8){
		error_msg = "Enter a name for this requirement";
	}else if (error_nb ==9){
		error_msg = "Enter an comment for this requirement";
	}else if (error_nb ==10){
		error_msg = "Please choose a solution for this requirement";
	}
	$("#remarque").text(error_msg);
}

function logout(){
	webservice("/webservices/deconnection.php",3);
}

function new_solution(){
	$('#tabs-1').html("<h2>New Solution</h2><br />Name : <input type='text' id='solutionName'><br />Objective : <input type='text' id='solutionObjective'><br /><button onclick='submit_new_solution();'>Add New</button>");
}

function submit_new_solution(){
	var solutionName = $("#solutionName").val();
	var solutionObjective = $("#solutionObjective").val();
	if (solutionName =="")
	{
		remarque(6);
	}else{
		if (solutionObjective =="")
		{
			remarque(7);
		}else{
			webservice("webservices/new_solution.php?name="+solutionName+"&objective="+solutionObjective+"&projectID="+currentProject,6)
		}
	}
}

function list_requirements(solution_nbr){
	currentSolution = $("table#solutions tr[solution_nbr="+solution_nbr+"]").attr("solution_id");
	$("#menu").tabs("option","active",1);
	webservice("webservices/solutions_requirements.php?currentSolution="+currentSolution,8)	
}

function change_current_project(){
	currentProject = $("#proj_list").val();
	console.log("test : " + currentProject);
	$("#menu").tabs("option","active",0);
	getListOfSolutions();
	
}

function change_requirement()
{
	currentSolution = $("#select_requirements").val();
	//console.log("test: " + currentSolution);
	webservice("webservices/solutions_requirements.php?currentSolution="+currentSolution,8)	
}

function new_requirement(){
	currentSolution = $("#select_requirements").val();
	var list_solutions = $("#select_requirements").html();
	$('#tabs-2').html("<h2>New Requirement</h2><br /><select id='select_requirements' onchange='change_requirement_new()'>"+list_solutions+"</select><br />Name : <input type='text' id='requirementName'><br />Comments : <input type='text' id='requirementComment'><br /><button onclick='submit_new_requirement();'>Add New</button>");
}

function edit_requirement(requirement_nbr){
	console.log(requirement_nbr);
	var requirementID = $("table#requirements tr[requirement_nbr="+requirement_nbr+"]").attr("requirement_id");
	console.log(requirementID);
	var requirement_text = $("table#requirements tr[requirement_nbr="+requirement_nbr+"]").attr("requirement_name");
	var requirement_comment = $("table#requirements tr[requirement_nbr="+requirement_nbr+"]").attr("requirement_comment");
	$('#tabs-2').html("<h3>Requirement : "+requirement_text+"</h3>");
	$('#tabs-2').append("Requirement name : <input type='text' size='80' id='requirement_text' value='"+requirement_text+"'><br />Objective : <input type='text' value='"+requirement_comment+"' size='80' id='requirementComment'><br /><input type='hidden' id='requirementID' value='"+requirementID+"'><button onclick='save_requirement();'>Save</button>");
}

function save_requirement(){
	var requirementName = $("#requirement_text").val();
	var requirement_comment = $("#requirementComment").val();
	var requirementID = $("#requirementID").val();
	if (requirementName =="")
	{
		remarque(8);
	}else{
		if (requirement_comment =="")
		{
			remarque(9);
		}else{
			webservice("webservices/save_requirement.php?solutionID="+currentSolution+"&name="+requirementName+"&comment="+requirement_comment+"&projectID="+currentProject+"&requirementID="+requirementID,10)
		}
	}
}

function change_requirement_new(){
	currentSolution =  $("#select_requirements").val();
}

function submit_new_requirement(){
	
	var requirementName = $("#requirementName").val();
	var requirementComment = $("#requirementComment").val();
	if (requirementName =="")
	{
		remarque(8);
	}else{
		if (requirementComment =="")
		{
			remarque(9);
		}else{
			if (currentSolution ==0)
			{
				remarque(10);
			}else{
				webservice("webservices/new_requirement.php?name="+requirementName+"&comment="+requirementComment+"&projectID="+currentProject+"&currentSolution="+currentSolution,9)
			}
		}
	}
}

$(function() {
    $( "#menu" ).tabs({
      beforeLoad: function( event, ui ) {
        ui.jqXHR.error(function() {
          ui.panel.html(
            "Couldn't load this tab. We'll try to fix this as soon as possible. " +
            "If this wouldn't be a demo." );
        });
      }
    });
  });
