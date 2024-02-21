let noteArea = document.querySelector(".note-area");
let noteText = document.querySelector(".note-text");
let title = document.querySelector(".title");
let note = document.querySelector(".note");
let notes = document.querySelector("#notes");

const showNoteArea = () =>{
    noteText.style = 'display: block';
    noteArea.classList.add('note-now');
    title.setAttribute('placeholder','Title');
    title.style='font-size: 20px';
}

const hideNoteArea = () =>{
    noteText.style='display: none';
    noteArea.classList.remove('note-now');
    // click marka siino ino furmo marka bananka siino inoo xirmo
}


const addNoteToLocalStorage = (note) => {
    if(note.length < 0){
        return;
    }

    console.log(note);
    
    let oldNote;

    if(localStorage.getItem("notes")=== null){
      oldNote = [];
    }else{
        // datada ka imanayso local storage waa string wxa lobadala obj
        oldNote = JSON.parse(localStorage.getItem('notes'));
    }
     
    oldNote.push(note);

    localStorage.setItem('notes', JSON.stringify(oldNote));

}


const getNotesFromLocalStorage = () => {
    let oldNote;

    if(localStorage.getItem("notes")=== null){
      oldNote = [];
    }else{
        // datada ka imanayso local storage waa string wxa lobadala obj
        oldNote = JSON.parse(localStorage.getItem('notes'));
    }
     oldNote.forEach(note => {
        
        notes.innerHTML += `
        <div class="note">
        <h3 class="title-text" id="title-text">${note[0]}</h3>
        <p class="note-blog">${note[1]}</p>
        <i class="fa fa-trash-can "></i>
    </div> `;
     });
}





document.addEventListener("DOMContentLoaded",getNotesFromLocalStorage);

//  txtarea mrka wxkuqorto note ki lagu sodara
const addNote = (t,n) =>{
    notes.innerHTML += `
    <div class="note">
    <h3 class="title-text" id="title-text">${t}</h3>
    <p class="note-blog">${n}</p>
    <i class="fa fa-trash-can "></i>
</div> `;

    // title io note wxmarka kuqoro iga maxasax txtarea sido wxkle lsogilinayo ugu diyar garoobo 
     title.value =''; noteText.value = '';
}




noteArea.addEventListener("click",showNoteArea);

document.addEventListener('click',(event) =>{
    let isclicked = noteArea.contains(event.target);

    if(!isclicked){
        hideNoteArea();
        // txtarea iyado eber ah ayaa banaka click lasiiyay so code walajojina wx lama so bandhigaayo
        if(title.value.length === 0 && noteText.value.length === 0){
            return;
        }else{
            addNoteToLocalStorage([title.value, noteText.value]);
            addNote(title.value, noteText.value);
           
        }
         
    }

});

document.addEventListener("mouseover", (event) =>{
    if(event.target.classList.contains("note")){
        // iconka wxa rabna mrka mouse ka la dulgeeyo bes inoo so baxo
        event.target.querySelector("i").classList.add('show');
    }
    
});

document.addEventListener("mouseout", (event) =>{
    if(event.target.classList.contains("note")){
        // iconka wxa rabna mrka mouse ka la dulgeeyo bes inoo so baxo hda ka qaado la gaqaado
        event.target.querySelector("i").classList.remove('show');
    }
    
});

document.addEventListener("click", (event) =>{
    if(event.target.classList.contains("fa-trash-can")){
        // parent elementiga oo gujiro dhan trash can marka icon ka taabto remove noteka dhan
        event.target.parentElement.remove();
    }
    
});




// localStorage.setItem('name','susu');
// console.log (localStorage.getItem('name'));
