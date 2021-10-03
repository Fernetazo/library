class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
};

class Library {
    constructor() {
        this.books = []
    }
}

const library = new Library();

popupNewBook = () => {
    const newBookPopup = document.getElementById("newBookPopup");
    newBookPopup.style.opacity = "1";
    newBookPopup.style.visibility = "visible";
};

addNewBook = () => {

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;
    
    if (!title || !author || !pages) {
        return alert("Something is missing!");
    }
    else {
        
        library.books.push(new Book(title, author, pages, read));

        window.localStorage.setItem('library', JSON.stringify(library.books));

        makeVisualCard(library.books, action = "addNewBook");
        document.getElementById("newBookForm").reset();
    }
}

showLibrary = () => {
    
    library.books = JSON.parse(window.localStorage.getItem('library'));

    if (library.books) {

        for (let i = 0; i < library.books.length; i++) {

            makeVisualCard(library.books, action = "showLibrary", i);
        }
    } else {
        library.books = [];
    }
}

deleteBook = (e) => {
    let toDelete = e.target.parentElement;
    let div = toDelete.nextSibling;
    toDelete.remove();
    let index = toDelete.dataset.index;
    library.books.splice(index, 1);
    
    window.localStorage.setItem('library', JSON.stringify(library.books));
    
    if (div) {
        for (let i = index; i <= library.books.length; i++) {
            if (div) {
                div.dataset.index = i;
                div = div.nextSibling;
            }
        }
    }
}

toggleRead = (e) => {
    let toToggle = e.target.parentElement.parentElement;
    let index = toToggle.dataset.index;
    if (library.books[index]["read"]) {
        library.books[index]["read"] = false;
        toToggle.childNodes[1].lastChild.textContent = "Not read it";
    } else {
        library.books[index]["read"] = true;
        toToggle.childNodes[1].lastChild.textContent = "Read it";
    }
    window.localStorage.setItem('library', JSON.stringify(library.books));
}

makeVisualCard = (library, action, i) => {
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

    closePopUp();
    libraryDiv.appendChild(div);
}

let popUp = document.getElementById("newBookPopup");
closePopUp = () => {
    popUp.style.opacity = "0";
    popUp.style.visibility = "hidden";
}

const popUpCloseButton = document.getElementById("close");
popUpCloseButton.addEventListener('click', closePopUp);

const newBookButton = document.getElementById("newBookButton");
newBookButton.addEventListener('click', popupNewBook);

const submitNewBookButton = document.getElementById("submitNewBookButton");
submitNewBookButton.addEventListener('click', addNewBook);

window.onclick = function(event) {
    if (event.target == popUp) {
        popUp.style.opacity = "0";
        popUp.style.visibility = "hidden";
    }
}

showLibrary();