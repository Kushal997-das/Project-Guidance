var sal;
var perarray=[];
var itemarray=[];
var moneyleft=100;

document.getElementById("moneyleft").innerHTML=moneyleft
  function salary(){ 
    sal = document.getElementById("salaryid").value;
 }
   
  function addItem() {
    if(!moneyleft){
      alert("You have Used all Your Salary");
      return;
    }
   var item = document.getElementById("itemid").value;
   var per = document.getElementById("percentid").value;

   if (!(item && per)) {
    alert("Enter both the fields")
   }
   else myFunction1()
  }


  function myFunction1() {

    // Create an "li" node:
    const node1 = document.createElement("li");
    var value1 = document.getElementById("itemid").value;
    value1 
    console.log(value1)
    itemarray.push(document.getElementById("itemid").value);
    console.log(itemarray)
    // Create a text node:
    const textnode1 = document.createTextNode(value1);
    document.getElementById("list1").appendChild(node1);

    // Append the text node to the "li" node:
    node1.appendChild(textnode1);

    
    // Append the "li" node to the list:
    myFunction2();
    }
  function myFunction2() {

    // Create an "li" node:
    const node2 = document.createElement("li");
    var value2 = document.getElementById("percentid").value;
    moneyleft-=value2;
    document.getElementById("moneyleft").innerHTML=moneyleft
    value2 = value2 + "%"
    perarray.push(document.getElementById("percentid").value);
    console.log(perarray)

    // Create a text node:
    const textnode2 = document.createTextNode(value2);
    
    // Append the text node to the "li" node:
    node2.appendChild(textnode2);
    
    // Append the "li" node to the list:
    document.getElementById("list2").appendChild(node2);

    }

    function Calc() {

       var money=[]
       for (var i = 0; i < perarray.length; ++i) { 
         money.push(perarray[i]/100 *sal);
            }
              var table = document.getElementById("myTable");


              for(var i=0 ; i<itemarray.length ;i++){
                var row = table.insertRow(i+1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = itemarray[i];
                cell2.innerHTML = money[i];
                }
              
            }
         
         
       
    