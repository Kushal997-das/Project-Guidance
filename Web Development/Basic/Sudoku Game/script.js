
import { generateSudoku } from "./sudokuGenerator.js";
let board;
let ans;
// Globals
let color_box;
let clickFlag = -1;
var boardPosition = { left: 0, top: 0 };
let mp = {};
let count = 0;
let prevBox;
let currSelect = -1;
let Interval = undefined;
//
function startTimer(start) {
	let minute = document.getElementById("minute");
	let sec = document.getElementById("second");
	Interval = setInterval(() => {
		minute.innerText = parseInt(minute.innerText) + (sec.innerText == '59') ? 1 : 0;
		sec.innerText = (parseInt(sec.innerText) + 1) % 60;
	}, 1000);

}
function createGrid() {
	let grid = document.createElement("div");
	grid.classList.add("sudoku-board");
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			let div = document.createElement("div");
			div.classList.add("box");
			if (i == 3 || i == 6)
				div.classList.add("top");
			if (j == 3 || j == 6)
				div.classList.add("left");
			div.id = `${i}-${j}`;
			grid.appendChild(div);
		}
	}
	document.getElementById("wrap").appendChild(grid);
}

const fillGrid = () => {
	let i, j;
	let boxes = document.querySelectorAll(".box");
	boxes.forEach((box) => {
		i = box.id[0];
		j = box.id[2];
		["pre", "filled", "text-yellow", "purple", "wrong"].forEach((Class) => {
			if (box.classList.contains(Class))
				box.classList.remove(Class);
		});
		if (board[i][j] != "0") {
			box.classList.add("pre");
			box.innerText = board[i][j];
			if (mp[board[i][j]] != undefined)
				mp[board[i][j]]++;
			else
				mp[board[i][j]] = 1;
		} else {
			box.innerText = "";
			count++;
		}
	});

	for (let it = 1; it < 10; it++) {
		let numberBtn = document.getElementById(it);
		numberBtn.className = "";
		if (mp[it] == 9)
			numberBtn.className = "complete";
	}
}


function newGame(level) {
	color_box = undefined;
	clickFlag = -1;
	currSelect = -1;
	boardPosition = { left: 0, top: 0 };
	let error = document.getElementById("error-count").innerText = 0;
	for (var member in mp) delete mp[member];
	count = 0;
	prevBox = undefined;
	document.getElementById("continue").classList.remove("hide");
	let temp = generateSudoku(level);
	board = temp.grid;
	ans = temp.solution;
	changeWrapper();
	fillGrid();

	startTimer();
}

function changeWrapper() {
	let blurElement = document.getElementById("toggle-blur");
	let levelWrapper = document.getElementById("wrapper");
	toggleClass(blurElement, "hide");
	toggleClass(levelWrapper, "after");
	toggleClass(levelWrapper, "before");
}

window.onload = function () {
	createGrid();
	// This is  for the switching of level wrapper  on click of ".level"
	document.querySelectorAll(".level").forEach((level) => {
		level.addEventListener("click", () => {
			if (level.id != "continue") {
				let minute = document.getElementById("minute").innerText = '00';
				let sec = document.getElementById("second").innerText = '00';
				newGame(level.id);
			}
			else {
				startTimer();
				changeWrapper();
			}
		});
	});

	//newgame event listener
	let levelWrapper = document.getElementById("wrapper");
	let blurElement = document.getElementById("toggle-blur");
	document.getElementById("new-game").addEventListener("click", () => {
		if (Interval != undefined)
			clearInterval(Interval);
		changeWrapper();
	});

	let numbers = document.querySelectorAll("button");
	numbers.forEach((number) => {
		number.addEventListener("click", () => {
			if (number.id != "moving-box" && number.classList != "level" && number.id != "new-game" && number.classList.contains("complete") == false) {
				if (currSelect == number.id)
					toggleEachNumber(currSelect, 0);
				else if (currSelect != -1)
					toggleEachNumber(currSelect, 0);
				currSelect = number.id;
				toggleEachNumber(currSelect, 1);
				// moving the temporary box to number position
				Move("moving-box", number.id, number.id);
				if (clickFlag == 1)
					toggleBG(prevBox, 0);
				clickFlag = 0;
				prevBox = undefined;
			}
		});
	});

	let boxes = document.querySelectorAll(".box");
	boxes.forEach((box) => {
		box.addEventListener("click", function (e) {
			if (currSelect != -1 && mp[currSelect] < 9) {
				if (box.classList.contains("wrong") == true) {
					setTimeout(
						(box) => {
							box.innerText = "";
							box.classList.remove("wrong");
						},
						10,
						box
					);
				}
				if (box.innerText == "") {
					let element = document.getElementById("moving-box");
					toggleClass(element, "transition");
					Move("moving-box", box.id, currSelect);
					setTimeout(toggleClass, 500, element, "transition");
				}
			}
			//
			if (box.innerText == "" && clickFlag == 1 && prevBox != undefined) {
				toggleBG(prevBox, 0);
				clickFlag = -1;
			}
			if (box.innerText == "" && clickFlag == -1) {
				toggleBG(box, 1);
				prevBox = box;
				clickFlag = 1;
			}
			//
		});
	});
};

// toggle between "transition"
function toggleClass(element, className) {
	element.classList.toggle(className);
}
// Return board-wrap coordinates
function getBoardPosition() {
	let boardPos = document.getElementById("wrap").getBoundingClientRect();
	boardPosition.left = boardPos.left;
	boardPosition.top = boardPos.top;
}

//to move the temporary button to any specific position by destination id
function Move(sourceID, destID, text) {
	getBoardPosition();
	let source = document.getElementById(sourceID);
	source.innerText = text;
	let dest = document.getElementById(destID);
	let destX = dest.getBoundingClientRect().x;
	let destY = dest.getBoundingClientRect().y;
	source.style.position = "absolute";
	source.classList.remove("hidden");
	if (dest.localName == "button") {
		source.style.color = "black";
		source.style.left = `${-boardPosition.left + destX - 3}px`;
		source.style.top = `${-boardPosition.top + destY - 3}px`;
	} else {
		// may
		source.style.left = `${-boardPosition.left + parseInt(destX)}px`;
		source.style.top = `${-boardPosition.top + parseInt(destY)}px`;
		source.style.color = "white";
		dest.innerText = text;

		if (isValid(dest) == false) {
			let error = document.getElementById("error-count");
			error.innerText = ++error.innerText;
			dest.classList.add("wrong");
			navigator.vibrate(50);
			if (error.innerText == "1") {
				setTimeout(
					(msg) => {
						alert(msg);
					},
					1000,
					"Click again on RED number to remove it from the  Sudoku grid."
				);
			}
		} else {
			count--;
			dest.classList.add("filled");
			dest.classList.add("text-yellow");
			if (mp[parseInt(dest.innerText)]) {
				mp[parseInt(dest.innerText)]++;
			} else {
				mp[parseInt(dest.innerText)] = 1;
			}
			if (mp[parseInt(dest.innerText)] == 9) {
				document.getElementById(dest.innerText).classList.add("complete");
			}
		}
		if (count == 0) {
			setTimeout(win, 2000);
		}
		setTimeout(Move, 600, "moving-box", text, text);
	}
}

function isValid(box) {
	let row = box.id[0];
	let col = box.id[2];
	return ans[row][col] == box.innerText;
}


function toggleBG(box, flag) {
	let row = box.id[0];
	let col = box.id[2];
	let r = parseInt(row / 3) * 3;
	let c = parseInt(col / 3) * 3;
	for (let i = 0; i < 9; i++) {
		let rowBox = document.getElementById(`${row}-${i}`);
		let colBox = document.getElementById(`${i}-${col}`);
		let DiagBox = document.getElementById(
			`${r + parseInt(i / 3)}-${c + parseInt(i % 3)}`
		);

		if (flag) {
			if (rowBox.classList.contains("pre") == false)
				rowBox.classList.add("purple");
			if (colBox.classList.contains("pre") == false)
				colBox.classList.add("purple");
			if (DiagBox.classList.contains("pre") == false)
				DiagBox.classList.add("purple");
		} else {
			if (rowBox.classList.contains("pre") == false)
				rowBox.classList.remove("purple");
			if (colBox.classList.contains("pre") == false)
				colBox.classList.remove("purple");
			if (DiagBox.classList.contains("pre") == false)
				DiagBox.classList.remove("purple");
		}
	}
}
// after completion of sudoku 
function win() {
	location.reload();
}

function toggleEachNumber(num, flag) {
	let numberBOx = document.getElementById(num).classList.toggle("clicked");
	let boxes = document.querySelectorAll(".box");
	boxes.forEach((box) => {
		if (box.innerText == num) {
			if (flag == true)
				box.classList.add("text-yellow");
			else
				box.classList.remove("text-yellow");
		}
	});
}