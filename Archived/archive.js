const hamburgerMenu = document.querySelector('#hamburger-menu');
const mobileDisplay = document.querySelector('.mobile-menu');
hamburgerMenu.addEventListener('click',()=>{
    if(mobileDisplay.style.display === 'none'){
        mobileDisplay.style.display = 'flex';
    }else{
        mobileDisplay.style.display = 'none'
    }
});
const searchInput = document.querySelector('#search-input');
let restoreButton = document.querySelector('.restore');
let deleteButton = document.querySelector('.delete');
window.addEventListener('load', ()=>{
    displayNotes(searchInput.value);
});
const notesShowcaseArea = document.querySelector('.showcase-notes');
searchInput.addEventListener('keyup', (e) => {
    displayNotes(e.target.value.toLowerCase());
});
// Display Notes Functionality
function displayNotes(string) {

    console.log('called');

    const availabelNotes = JSON.parse(localStorage.getItem('archiveNotes'));
    if (availabelNotes === null) {
        return;
    }
    notes = availabelNotes;
    let noteHtml = '';
    notesShowcaseArea.innerHTML = '';
    if (string === '') {

        for (let i = 0; i < availabelNotes.length; i++) {

            noteHtml = noteHtml + `
            <div class="notes" id = ${i}>
                               
                            <h2 class="notes-heading">${availabelNotes[i].title}</h2>
    
                            <p class="notes-description">
                                ${availabelNotes[i].description}
                            </p>
                            <div class="button-area">
                               
                                <button class ="edit-delete-archive-button" onclick = restoreNote(${i}) class="archive">Restore</button>
                                <button class ="edit-delete-archive-button" onclick = deleteNote(${i})  class="delete">Delete</button>
                            </div>
                               
    
                        </div>
            `;



        }

    } else {
        
        for (let i = 0; i < availabelNotes.length; i++) {
            let lowerCasedString = availabelNotes[i].title.toLowerCase();
            
            if(lowerCasedString.includes(string)){
                
                noteHtml = noteHtml + `
                <div class="notes" id = ${i}>
                                   
                                <h2 class="notes-heading">${availabelNotes[i].title}</h2>
        
                                <p class="notes-description">
                                    ${availabelNotes[i].description}
                                </p>
                                <div class="button-area">
                                  
                                    <button class ="edit-delete-archive-button" onclick = restoreNote(${i}) class="archive">Restore</button>
                                    <button class ="edit-delete-archive-button" onclick = deleteNote(${i})  class="delete">Delete</button>
                                </div>
                                   
        
                            </div>
                `;

            }
        }

    }

    notesShowcaseArea.innerHTML = noteHtml;
}

function restoreNote(index) {
    const availabelNotes = JSON.parse(localStorage.getItem('archiveNotes'));
    const totalNotes = JSON.parse(localStorage.getItem('totalNotes'));


    const note = availabelNotes.splice(index, 1);
    totalNotes.push(note[0]);

    localStorage.setItem('archiveNotes', JSON.stringify(availabelNotes))
    localStorage.setItem('totalNotes', JSON.stringify(totalNotes))
    displayNotes(searchInput.value.toLowerCase());

}

// delete note functionality
function deleteNote(index) {
    const availabelNotes = JSON.parse(localStorage.getItem('archiveNotes'));
    const deletedNotes = JSON.parse(localStorage.getItem('deleteNotes'))
    const temp = availabelNotes[index];
    let note = availabelNotes.splice(index, 1);
    console.log(availabelNotes);
    deletedNotes.push(temp);
    localStorage.setItem("deleteNotes", JSON.stringify(deletedNotes));
    localStorage.setItem("archiveNotes", JSON.stringify(availabelNotes));
    note = null;
    displayNotes('');
}
