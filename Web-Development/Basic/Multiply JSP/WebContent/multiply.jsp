<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>

<head>
<title>Multiplication Table</title>

</head>

<body>
	<h1>Thanks for using Mini-Multiplication Table</h1>

	<%
		String c = request.getParameter("counter");
	int i = Integer.valueOf(c);
	int j = i;
	int k = 0, h = 0;
	%>

	<table border="1">


		<!-- the first row with multiply word -->
		<tr>
			<td bgcolor="red">Multiply</td>
			<%
				for (int x = 1; x < i + 1; x++) {
			%>
			<td bgcolor="blue"><%=x%></td>
			<%
				}
			%>
		</tr>

		<!-- the second row from 1 to x for each row and * x and y in td -->



		<%
			for (int x = 1; x < i + 1; x++) {
		%>

		<tr>

			<td bgcolor="blue"><%=x%></td>

			<%
				for (int y = 1; y < j + 1; y++) {
			%>



			<%
				if (x == y) {
			%>
			<td bgcolor="red"><%=x * y%></td>
			<%
				} else if (x != y) {
			%>

			<td><%=x * y%></td>
			<%
				}
			%>
			<%
				}
			%>

		</tr>

		<%
			}
		%>

	</table>

	<form action="index.html" method="post">
		<input type="submit" value="Return">
	</form>
</body>

</html>