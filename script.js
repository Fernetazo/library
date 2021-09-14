// TO DO: Modal

let library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return(`${title} by ${author}. Pages: ${pages}`);
    }
}

function popupNewBook() {
    const newBookPopup = document.getElementById("newBookPopup");
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
    } else {
        library[index]["read"] = true;
    }
    window.localStorage.setItem('library', JSON.stringify(library));
}

function makeVisualCard(library, action, i) {
    let libraryDiv = document.getElementById("libraryDiv");
    
    let div = document.createElement("div");
    div.classList.add("bookCard");

    let button = document.createElement("button");
    button.classList.add("deleteButton");
    button.textContent = "❌";
    button.addEventListener('click', deleteBook);
    div.appendChild(button);

    let textCard = document.createElement("div");
    textCard.classList.add("textCard");
    if (action == "showLibrary") {
        textCard.textContent = Object.values(library[i]);
        div.dataset.index = i;
    } else {
        textCard.textContent = Object.values(library[library.length - 1]);
        div.dataset.index = library.length - 1;
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
        if (read.checked) {
            readCheckbox.checked = true;
        }
    } else {
        if (library[i]["read"] == true) {
            readCheckbox.checked = true;
        }
    }

    libraryDiv.appendChild(div);

}

showLibrary();
const newBookButton = document.getElementById("newBookButton");
newBookButton.addEventListener('click', popupNewBook);