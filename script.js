// TO DO: Modal

let library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function popupNewBook() {
    const newBookPopup = document.getElementById("newBookPopup");
    newBookPopup.style.opacity = "1";
    newBookPopup.style.visibility = "visible";
}

function addNewBook() {

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;
    
    const newBook = new Book(title, author, pages, read);
    library.push(newBook);

    window.localStorage.setItem('library', JSON.stringify(library));

    makeVisualCard(library, action = "addNewBook");
}

function showLibrary() {
    
    library = JSON.parse(window.localStorage.getItem('library'));

    for (let i = 0; i < library.length; i++) {

        makeVisualCard(library, action = "showLibrary", i);
    }
}

function deleteBook(e) {
    let toDelete = e.target.parentElement;
    let div = toDelete.nextSibling;
    toDelete.remove();
    let index = toDelete.dataset.index;
    library.splice(index, 1);
    
    window.localStorage.setItem('library', JSON.stringify(library));
    
    if (div) {
        for (let i = index; i <= library.length; i++) {
            if (div) {
                div.dataset.index = i;
                div = div.nextSibling;
            }
        }
    }
}

function toggleRead(e) {
    let toToggle = e.target.parentElement.parentElement;
    let index = toToggle.dataset.index;
    if (library[index]["read"]) {
        library[index]["read"] = false;
        toToggle.childNodes[1].lastChild.textContent = "Not read it";
    } else {
        library[index]["read"] = true;
        toToggle.childNodes[1].lastChild.textContent = "Read it";
    }
    window.localStorage.setItem('library', JSON.stringify(library));
}

function makeVisualCard(library, action, i) {
    let libraryDiv = document.getElementById("libraryDiv");
    
    let div = document.createElement("div");
    div.classList.add("bookCard");

    let button = document.createElement("button");
    button.classList.add("deleteButton");
    button.textContent = "X";
    button.addEventListener('click', deleteBook);
    div.appendChild(button);

    let textCard = document.createElement("div");
    textCard.classList.add("textCard");

    let author = document.createElement("div");
    author.classList.add("authorText");
    textCard.appendChild(author);

    let title = document.createElement("div");
    title.classList.add("titleText");
    textCard.appendChild(title);

    let pages = document.createElement("div");
    pages.classList.add("pagesText");
    textCard.appendChild(pages);

    let read = document.createElement("div");
    read.classList.add("readText");
    textCard.appendChild(read);

    if (action == "showLibrary") {
        div.dataset.index = i;
        
        let authorText = Object.values(library[i]);
        author.textContent = authorText[1];
        
        let titleText = Object.values(library[i]);
        title.textContent = titleText[0];
        
        let pagesText = Object.values(library[i]);
        pages.textContent = pagesText[2] + " pages";

        let readText = Object.values(library[i]);
        if (readText[3]) {
            read.textContent = "Read it";
        } else {
            read.textContent = "Not read it";
        }
    } else {
        div.dataset.index = library.length - 1;
        author.textContent = library[library.length - 1]["author"];
        title.textContent = library[library.length - 1]["title"];
        pages.textContent = library[library.length - 1]["pages"] + " pages";
        if (library[library.length - 1]["read"]) {
            read.textContent = "Read it";
        } else {
            read.textContent = "Not read it";
        }
    }
    div.appendChild(textCard);

    // Read switch
    let readSwitchLabel = document.createElement("label");
    readSwitchLabel.classList.add("switch");
    let readCheckbox = document.createElement("input");
    readCheckbox.type = "checkbox"
    readCheckbox.addEventListener('click', toggleRead);
    readSwitchLabel.appendChild(readCheckbox);
    let readSlider = document.createElement("span");
    readSlider.classList.add("slider");
    readSwitchLabel.appendChild(readSlider);
    div.appendChild(readSwitchLabel);

    if (action == "addNewBook") {
        if (library[library.length - 1]["read"]) {
            readCheckbox.checked = true;
        }
    } else {
        if (library[i]["read"] == true) {
            readCheckbox.checked = true;
        }
    }

    libraryDiv.appendChild(div);
    closePopUp();
    document.getElementById("newBookForm").reset();
}

let popUp = document.getElementById("newBookPopup");
function closePopUp() {
    popUp.style.opacity = "0";
    popUp.style.visibility = "hidden";
}

const popUpCloseButton = document.getElementById("close");
popUpCloseButton.addEventListener('click', closePopUp);

const newBookButton = document.getElementById("newBookButton");
newBookButton.addEventListener('click', popupNewBook);

window.onclick = function(event) {
    if (event.target == popUp) {
        popUp.style.opacity = "0";
        popUp.style.visibility = "hidden";
    }
}

showLibrary();