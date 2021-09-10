let library = [
    {title: "Harry Potter", author:"J. K. Rowling", pages:"500", read:false},
    {title: "The Doom", author:"Jankiu", pages:"222", read:false},
    {title: "Fandango", author:"Bajogondo", pages:"333", read:true},
    {title: "Zarasa", author:"Sara", pages:"444", read:true}
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function popupNewBook() {
    const newBookPopup = document.getElementById("newBookPopup");
    newBookPopup.style.visibility = "visible";
}

function addNewBook() {

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read");
    
    const newBook = new Book(title, author, pages, read.checked);
    library.push(newBook);

    let div = document.createElement("div");

    div.classList.add("bookCard");
    div.textContent = Object.values(library[library.length - 1]);
    div.dataset.index = library.length - 1;
    libraryDiv.appendChild(div);

    let button = document.createElement("button");
    button.classList.add("deleteButton");
    button.textContent = "❌";
    button.addEventListener('click', deleteBook);
    div.appendChild(button);

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

    if (read.checked) {
        readCheckbox.checked = true;
    }
}

function showLibrary() {
    let libraryDiv = document.getElementById("libraryDiv");
    for (let i = 0; i < library.length; i++) {

        let div = document.createElement("div");

        div.classList.add("bookCard");
        div.textContent = Object.values(library[i]);
        div.dataset.index = i;
        libraryDiv.appendChild(div);

        let button = document.createElement("button");
        button.classList.add("deleteButton");
        button.textContent = "❌";
        button.addEventListener('click', deleteBook);
        div.appendChild(button);

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
    }
}

function deleteBook(e) {
    let toDelete = e.target.parentElement;
    let div = toDelete.nextSibling;
    toDelete.remove();
    let index = toDelete.dataset.index;
    library.splice(index, 1);
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

}

showLibrary();
const newBookButton = document.getElementById("newBookButton");
newBookButton.addEventListener('click', popupNewBook);