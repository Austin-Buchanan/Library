// Variables
let myLibrary = [];
const newBookButton = document.querySelector('#newBookButton');
const newBookArea = document.querySelector('#newBookArea');
const table = document.querySelector('table');
const titleInput = document.querySelector('#titleInput');
const authorInput = document.querySelector('#authorInput');
const pagesInput = document.querySelector('#pagesInput');
const readInput = document.querySelector('#readInput');
const newBookSubmit = document.querySelector('#newBookSubmit');

// Code to Run
newBookArea.style.display = 'none';
newBookButton.addEventListener('click', (e) => {
    newBookArea.style.display = 'block';
});
newBookSubmit.addEventListener('click', (e) => {
  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value);
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.value = "";
  newBookArea.style.display = 'none';
  render();
});

addBookToLibrary("Harry Potter and the Goblet of Fire", "J.K. Rowling", 636, "yes");
addBookToLibrary("Gravity's Rainbow", "Thomas Pynchon", 760, "no");
render();

// Functions
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.tr = document.createElement('tr');
    this.removeButton = document.createElement('button');
    this.readButton = document.createElement('button');
}

function addHTML(book) {
    book.tr.classList.add("bookRow");
    table.appendChild(book.tr);
    let tdTitle = book.tr.insertCell();
    let tdAuthor = book.tr.insertCell();
    let tdPages = book.tr.insertCell();
    let tdRead = book.tr.insertCell();
    tdTitle.textContent = book.title;
    tdAuthor.textContent = book.author;
    tdPages.textContent = book.pages;
    tdRead.textContent = book.read;
  
    book.removeButton.textContent = "Remove";
    table.appendChild(book.removeButton);
    book.removeButton.addEventListener('click', (e) => {
      myLibrary.forEach((otherBook) => {
        if(otherBook.title === book.title){
          myLibrary.splice(myLibrary.indexOf(otherBook), 1);
        }
      });
      book.removeButton.remove();
      render();
    });
  
    book.readButton.textContent = "Read";
    table.appendChild(book.readButton);
    book.readButton.addEventListener('click', (e) => {
      if(tdRead.textContent === "yes"){
        tdRead.textContent = "no";
      } else {
        tdRead.textContent = "yes";
      }
    });
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function render(){
    let oldRows = document.querySelectorAll('.bookRow');
    oldRows.forEach((row) => {
        row.deleteCell(0);
        row.deleteCell(0);
        row.deleteCell(0);
        row.deleteCell(0);
        table.removeChild(row);
    });
    myLibrary.forEach((book) => {
        addHTML(book);
    });
}

