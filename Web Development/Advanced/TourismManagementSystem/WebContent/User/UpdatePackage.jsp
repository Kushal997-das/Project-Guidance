<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<link rel="stylesheet" type="text/css" href="../home/Aside.css">
<link rel="stylesheet" type="text/css" href="../home/Home.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1">

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Modify Package</title>
</head>
<body>.<script type="text/javascript">
$(document).ready(function(){
	var packageCost = $('#packageCost').val();
	var persons = $('#persons').val();
	var totalCost = packageCost*persons;
	$('#totalCost').val(totalCost);
	$('#persons').change(function(){
		var persons=$('#persons').val();
		totalCost=packageCost*persons;
		$('#totalCost').val(totalCost);
	});
	$('#button').click(function(){
		var packagename = $('#package').val();
		var place = $('#place').val();
		var days = $('#days').val();
		var packageCost = $('#packageCost').val();
		var persons = $('#persons').val();
		var totalCost = $('#totalCost').val();
		$.ajax({
			type:'POST',
			data:{ packagename:packagename, place:place, days:days, packageCost:packageCost, persons:persons,totalCost:totalCost},
			url:'../ModifyPackage1',
			success: function(result){
				$('#validation').html(result);
			}
		});	
	});
});
</script>
<%@ include file ="Header.jsp" %>
<%@ include file ="Aside.jsp" %>
	<section class="section">
		<div class="sectiondev">
			<div class="container">
			  <h2>Modify Package</h2>
			  <div class="panel col-sm-8">
			    <div class="panel-body">
			    	<div class="row">
			    		<div class="col-sm-12">
			    			<form>
			    			<div class="col-sm-12">
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    				Package Name:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="<%=session.getAttribute("packageName") %>" id="package" name="package" readonly>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    				Package Place:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="<%=session.getAttribute("placeName") %>" id="place" name="place" readonly>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    				Number Of Days:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="<%=session.getAttribute("days") %>" id="days" name="days" readonly>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    				Cost:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="<%=session.getAttribute("cost") %>" id="packageCost" name="packageCost" readonly>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    				No of Persons:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="<%=session.getAttribute("persons1") %>" id="persons" name="persons" required="true">
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    				Total Cost:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="<%=session.getAttribute("totalCost1") %>" id="totalCost" name="totalCost" required="true" readonly>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<div class="text-right"> 
			    						<input type="button" id="button" value="Modify Package" class="btn btn-primary">
			    					</div>
			    				</div>
			    				</div>
			    				</div>
			    				<div id="validation"></div>
			    			</form>
			    		</div>
			    	</div>
			  </div>
			</div>
		</div>
	</div>
	</section>
<%@ include file="../home/Footer.jsp" %>
</body>
</html>