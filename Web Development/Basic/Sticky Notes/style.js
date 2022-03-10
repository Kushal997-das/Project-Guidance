var container2 = document.getElementsByClassName("container2")[0];
var container3= document.getElementsByClassName("container3")[0];
var checkIcon=document.getElementById("check-icon");
var xIcon=document.getElementById("x-icon");
var i=0;

xIcon.addEventListener("click",function(){
    typeNote();
})

checkIcon.addEventListener("click",function(){
    createNote();
})

function typeNote()
{
   if(container3.style.display=="none"){
     container3.style.display="block";
   }
   else{
       container3.style.display="none";
   }
}
function createNote()
{
    var noteText=document.getElementById("note-text").value;
    var node0 = document.createElement("div");
    var node1=document.createElement("h1");

    node1.innerHTML=noteText;
    node1.setAttribute("style","width:40vh;height:40vh;font-size:26px;padding:25px; margin-top:10px; overflow:hidden; box-shadow:0px 10px 24px 0px rgba(0,0,0,0.75)");

    node1.style.margin=margin();
    node1.style.transform=rotate();
    node1.style.background=color();
    node0.appendChild(node1);

    container2.insertAdjacentElement("beforeend",node0);
    node0.addEventListener("mouseenter",function(){
        node0.style.transform="scale(1.1)";
    })
    node0.addEventListener("mouseleave",function(){
        node0.style.transform="scale(1)";
    })
    node0.addEventListener("dblclick",function(){
        node0.remove();
    })
    document.getElementById("note-text").value='';
}
function margin(){
var random_margin=["-5px","1px","5px","10px","15px","20px"];

return random_margin[Math.floor(Math.random()*random_margin.length)];
}
function rotate(){

var random_rotate= ["rotate(3deg)","rotate(1deg)","rotate(-1deg)","rotate(-3deg)","rotate(-5deg)","rotate(-10deg)","rotate(5deg)"];
return random_rotate[Math.floor(Math.random()*random_rotate.length)];
}

function color(){
   var random_color = ["#c2ff3d","#ff3de4","#2deff65","#bc45e2","#ebb543","#8fe34e","#43bf65","#87def5"];
   if(i>random_color.length - 1)
   {
       i=0;
   }
  return  random_color[i++];
}