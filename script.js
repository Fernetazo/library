let library = [
    {title: "Harry Potter", author:"J. K. Rowling", pages:"500", read:"yes"},
    {title: "The Doom", author:"Jankiu", pages:"222", read:"yes"}
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
    let read = document.getElementById("read").value;
    
    const newBook = new Book(title, author, pages, read);
    library.push(newBook);

    let div = document.createElement("div");
    div.classList.add("bookCard");
    div.textContent = Object.values(library[library.length - 1]);
    libraryDiv.appendChild(div);
}

function showLibrary() {
    let libraryDiv = document.getElementById("libraryDiv");
    for (let i = 0; i < library.length; i++) {
        let div = document.createElement("div");
        div.classList.add("bookCard");
        div.textContent = Object.values(library[i]);
        libraryDiv.appendChild(div);

        let button = document.createElement("button");
        button.classList.add("deleteButton");
        button.textContent = "❌";
        button.dataset.index = i;
        div.appendChild(button);
    }
}

function deleteBook() {
    
}

showLibrary();
const newBookButton = document.getElementById("newBookButton");
newBookButton.addEventListener('click', popupNewBook);