function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return (`${title}, by ${author}, ${pages} pages, ${(read) ? 'read it' : 'not read yet'}.`);
    }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
const BigBrother1984 = new Book('1984', 'Orson Wells', '500', true);

console.log(theHobbit.info());
console.log(BigBrother1984.info());
