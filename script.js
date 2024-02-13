const addNoteButton = document.querySelector("#add-note-button");
const addNotePopUp = document.querySelector(".add-note-popup");
const addNotePopUpExit = document.querySelector(".close-button");
const saveButtonNote = document.querySelector("#save-notes");
const notesShowcaseArea = document.querySelector(".showcase-notes");
const noteTitle = document.querySelector("#title");
const noteDescription = document.querySelector("#description");
const searchInput = document.querySelector("#search-input");
const hamburgerMenu = document.querySelector('#hamburger-menu');
const mobileDisplay = document.querySelector('.mobile-menu');
hamburgerMenu.addEventListener('click',()=>{
    if(mobileDisplay.style.display === 'none'){
        mobileDisplay.style.display = 'flex';
    }else{
        mobileDisplay.style.display = 'none'
    }
});
searchInput.addEventListener("keyup", (e) => {
    displayNotes(e.target.value.toLowerCase());
});

addNoteButton.addEventListener("click", addNotePopUpVisibilty);
addNotePopUpExit.addEventListener("click", addNotePopUpVisibilty);
saveButtonNote.addEventListener("click", () => {
    if (saveButtonNote.innerText === "Update Note") {
        updateNote();
    } else {
        addNotes();
    }
});

let notes = [];
let deletedNotes = [];
let archivedNotes = [];

window.addEventListener("load", () => {
    displayNotes(searchInput.value);
});

// Add note popup functionality
function addNotePopUpVisibilty() {
    if (
        addNotePopUp.style.display === "" ||
        addNotePopUp.style.display === "none"
    ) {
        addNotePopUp.style.display = "flex";
    } else {
        addNotePopUp.style.display = "none";
        document.querySelector(".add-note-heading").innerText = "Add New Note";
        noteTitle.value = ``;
        noteDescription.value = ``;
        saveButtonNote.innerText = "Save Note";
    }
}

// Add notes functionality
function addNotes() {
    if (noteTitle.value !== "" && noteDescription.value !== "") {
        const notesInformation = {
            title: noteTitle.value,
            description: noteDescription.value,
        };
        notes.push(notesInformation);
        localStorage.setItem("totalNotes", JSON.stringify(notes));
        noteTitle.value = "";
        noteDescription.value = "";
        addNotePopUp.style.display = "none";

        // diplaying notes
        displayNotes(searchInput.value.toLowerCase());
    } else {
        alert("Fill all the input fields");
    }
}

// Display Notes Functionality
function displayNotes(string) {
    const availabelNotes = JSON.parse(localStorage.getItem("totalNotes"));
    if (availabelNotes === null) {
        return;
    }
    notes = availabelNotes;
    let noteHtml = "";
    notesShowcaseArea.innerHTML = "";
    if (string === "") {
        for (let i = 0; i < availabelNotes.length; i++) {
            noteHtml =
                noteHtml +
                `
            <div class="notes" id = ${i}>
                               
                            <h2 class="notes-heading">${availabelNotes[i].title}</h2>
    
                            <p class="notes-description">
                                ${availabelNotes[i].description}
                            </p>
                            <div class="button-area">
                                <button class ="edit-delete-archive-button" onclick = editNote(${i}) class="edit">Edit</button>
                                <button class ="edit-delete-archive-button" onclick = archiveNote(${i}) class="archive">Archive</button>
                                <button class ="edit-delete-archive-button" onclick = deleteNote(${i})  class="delete">Delete</button>
                            </div>
                               
    
                        </div>
            `;
        }
    } else {
        for (let i = 0; i < availabelNotes.length; i++) {
            let lowerCasedString = availabelNotes[i].title.toLowerCase();

            if (lowerCasedString.includes(string)) {
                noteHtml =
                    noteHtml +
                    `
                <div class="notes" id = ${i}>
                                   
                                <h2 class="notes-heading">${availabelNotes[i].title}</h2>
        
                                <p class="notes-description">
                                    ${availabelNotes[i].description}
                                </p>
                                <div class="button-area">
                                    <button class ="edit-delete-archive-button" onclick = editNote(${i}) class="edit">Edit</button>
                                    <button class ="edit-delete-archive-button" onclick = archiveNote(${i}) class="archive">Archive</button>
                                    <button class ="edit-delete-archive-button" onclick = deleteNote(${i})  class="delete">Delete</button>
                                </div>
                                   
        
                            </div>
                `;
            }
        }
    }

    notesShowcaseArea.innerHTML = noteHtml;
}
let tempIndex;
// edit Note function
function editNote(index) {
    tempIndex = index;
    document.querySelector(".add-note-heading").innerText = "Update Note";
    saveButtonNote.innerText = "Update Note";
    addNotePopUp.style.display = "flex";
    notes = JSON.parse(localStorage.getItem("totalNotes"));
    noteTitle.value = notes[index].title;
    noteDescription.value = notes[index].description;
}

function updateNote() {
    const updateObject = {
        title: noteTitle.value,
        description: noteDescription.value,
    };
    const replace = notes.splice(tempIndex, 1, updateObject);
    localStorage.setItem("totalNotes", JSON.stringify(notes));
    displayNotes(searchInput.value.toLowerCase());
    addNotePopUp.style.display = "none";
    document.querySelector(".add-note-heading").innerText = "Add New Note";
    noteTitle.value = ``;
    noteDescription.value = ``;
    saveButtonNote.innerText = "Save Note";
    tempIndex = 0;
}

// archive Note functionality
function archiveNote(index) {
    //    archivedNotes.push(notes[index]);
    //    localStorage.setItem('archiveNotes',JSON.stringify(archivedNotes));
    //    console.log(notes.splice(index,1));
    //    displayNotes();

    const note = notes.splice(index, 1);
    archivedNotes.push(note[0]);
    localStorage.setItem("archiveNotes", JSON.stringify(archivedNotes));
    localStorage.setItem("totalNotes", JSON.stringify(notes));

    displayNotes(searchInput.value.toLowerCase());
}

// delete note functionality
function deleteNote(index) {
    const note = notes.splice(index, 1);
    deletedNotes.push(note[0]);
    localStorage.setItem("deleteNotes", JSON.stringify(deletedNotes));
    localStorage.setItem("totalNotes", JSON.stringify(notes));
    displayNotes(searchInput.value.toLowerCase());
}
