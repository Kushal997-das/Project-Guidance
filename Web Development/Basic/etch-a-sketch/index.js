let color = 'black';
let bgc = 'white';
let click = false;
function populate(size){
    let board = document.querySelector(".board");
    let existingSq = board.querySelectorAll("div");
    existingSq.forEach((e)=>{
        e.remove();
    })
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let index = 0; index < size*size; index++) {
        let gridbox = document.createElement("div");
        gridbox.addEventListener("mouseover",colorbox);
        gridbox.style['background-color'] = bgc;
        board.insertAdjacentElement("afterbegin",gridbox);
    }

}
populate(16);

function newCanvasSize(input){
    if(input>=1 && input <100){
        populate(input);
    }
}
function colorbox(){
    if(click){
        if(color === 'random'){
            this.style['background-color'] = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`
        }
        else{
            this.style['background-color'] = color;
        }
    }
}
function changeColor(choice){
    color = choice;
}
function erasure(){
    color = bgc;
    colorbox();
}
function reset(){
    let board = document.querySelector(".board");
    let existingSq = board.querySelectorAll("div");
    existingSq.forEach(e=>{
        e.style['background-color'] = bgc;
    })
}
document.querySelector(".board").addEventListener("click", ()=>{
    click = !click;
    if(click){
        document.querySelector(".mode").textContent = 'Mode: Coloring';
    }
    else{
        document.querySelector(".mode").textContent = 'Mode: Not Coloring';
    }
})