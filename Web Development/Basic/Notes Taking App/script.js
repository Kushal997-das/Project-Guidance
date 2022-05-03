const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
addBtn = popupBox.querySelector("button"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea");


const months = ["January", "February", "March", "April", "May", "June", "July",
                "July", "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,updateId;

addBox.addEventListener("click", () => {
    titleTag.focus();
    addBtn.innerText = "Add a Note";
    popupTitle.innerText = "Add a New Note";
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove("show");
});

function showNotes () {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                                <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick= "showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function deleteNote(noteId) {
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}
function updateNote(noteId, title, desc) {
    addBox.click();
    isUpdate = true;
    updateId = noteId;
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update the Note";
    popupTitle.innerText = "Update a Note";
    console.log(noteId, title, desc);
}


function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc) {
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();


        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        if(!isUpdate) {
            notes.push(noteInfo);
        } else{
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
})