const dialog = document.getElementById('addBookDialog');
const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read'}`;
    };
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function showDialog() {
    dialog.showModal();
}
function closeDialog() {
    dialog.close();
}

document.getElementById('addBookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readStatus = document.getElementById('readStatus').value;
    const read = readStatus === 'read' ? true : false;

    addBookToLibrary(title, author, pages, read);
    closeDialog();
    displayBooks(myLibrary);
});

function displayBooks(array) {
    document.getElementById('bookList').innerHTML = '';
    const list = document.createElement('ul');

    array.forEach((book, index) => {
        const listItem = document.createElement('li');

        const bookText = document.createElement('span');
        bookText.textContent = book.info();
        listItem.appendChild(bookText);

        const iconsContainer = document.createElement('div');
        iconsContainer.className = 'icons-container';

        const readIcon = document.createElement('button');
        readIcon.innerHTML = '✅';
        readIcon.className = 'read-icon';
        readIcon.title = 'Mark as Read';
        readIcon.onclick = () => {
            book.read = true;
            displayBooks(myLibrary);
        };

        const deleteIcon = document.createElement('button');
        deleteIcon.innerHTML = '🗑️';
        deleteIcon.className = 'delete-icon';
        deleteIcon.title = 'Delete Book';
        deleteIcon.onclick = () => {
            myLibrary.splice(index, 1);
            displayBooks(myLibrary);
        };

        iconsContainer.appendChild(deleteIcon);
        iconsContainer.appendChild(readIcon);
        listItem.appendChild(iconsContainer);

        list.appendChild(listItem);
    });




    document.getElementById('bookList').appendChild(list);
}
