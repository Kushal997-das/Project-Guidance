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
<title>Modify Food</title>
</head>
<body>
<script type="text/javascript">
$(document).ready(function(){
	
	var foodCost = $('#foodCost').val();
	var quantity= $('#quantity').val();
	var totalCost = foodCost*quantity;
	$('#totalCost').val(totalCost);
	
	$('#quantity').change(function(){
		var quantity = $('#quantity').val();
		var totalCost = foodCost*quantity;
		$('#totalCost').val(totalCost);
	});
	$('#button').click(function(){
		var type = $('#foodType').val();
		var foodName = $('#foodName').val();
		var foodCost = $('#foodCost').val();
		var quantity =$('#quantity').val();
		var totalCost = $('#totalCost').val();
		var packagename = $('#packagename').val();
		var place = $('#place').val();
		$.ajax({
			type:'POST',
			data:{ type:type, foodName:foodName, foodCost:foodCost,quantity:quantity,totalCost:totalCost,packagename:packagename,place:place},
			url:'../ModifyFood1',
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
			  <h2>Modify Food</h2>
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
			    					<input class="form-control" value="<%=session.getAttribute("packagename") %>" type="text" id="packagename" name="packagename" readonly>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
								<div class="col-sm-4">
								<div class="form-group">
			    				Place:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" value="<%=session.getAttribute("place") %>" type="text" id="place" name="place" readonly>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    				Food Type:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="<%=session.getAttribute("foodType1") %>" id="foodType" name="foodType" readonly>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    				Food Name:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="<%=session.getAttribute("foodName1") %>" id="foodName" name="foodName" readonly>
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
			    					<input class="form-control" type="text" value="<%=session.getAttribute("foodCost1") %>" id="foodCost" name="foodCost" readonly>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
								<div class="col-sm-4">
								<div class="form-group">
			    				Quantity:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" value="<%=session.getAttribute("quantity") %>" type="text" id="quantity" name="quantity" required="true">
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
			    					<input class="form-control" value="<%=session.getAttribute("totalCost") %>" type="text" id="totalCost" name="totalCost" required="true" readonly>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<div class="text-right"> 
			    						<input type="button" id="button" value="Modify Food" class="btn btn-primary">
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