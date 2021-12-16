let myLibrary = [];
const form = document.querySelector("form");
const button = document.querySelector("button");
const bookAuthor = document.querySelector("#author");
const bookTitle = document.querySelector("#title");
const bookPages = document.querySelector("#pages");
const bookRead = document.querySelector("#read");
const library = document.querySelector(".library");

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const author = bookAuthor.value;
  const title = bookTitle.value;
  const pages = bookPages.value;
  const read = bookRead.checked;
  const book = new Book(author, title, pages, read);
  const uniqueId = undefined;
  myLibrary.push(book);
  form.classList.remove("show");
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (form.classList == "") {
    form.classList.add("show");
    button.innerText = "Cancel";
  } else {
    form.classList.remove("show");
    button.innerText = "New Book";
  }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  button.innerText = "New Book";
  displayBooks();
});

function displayBooks() {
  myLibrary.forEach((book, index) => {
    createBooks(book, index);
  });
}

function createBooks(book, index) {
  const newId = `index-${index}`;
  const existingBooks = document.getElementById(newId);
  const libraryBook = document.createElement("div");
  libraryBook.classList.add("library-book");
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove");
  const readButton = document.createElement("button");
  readButton.classList.add("read");
  book.uniqueId = newId;
  libraryBook.id = book.uniqueId;
  removeButton.innerHTML = "Remove";
  if (book.read === true) {
    readButton.innerHTML = "Completed";
  } else {
    readButton.innerHTML = "Incomplete";
  }
  if (existingBooks == null && book.removed != true) {
    cardCreate(book, "author", libraryBook);
    cardCreate(book, "title", libraryBook);
    cardCreate(book, "pages", libraryBook);
    libraryBook.appendChild(readButton);
    libraryBook.appendChild(removeButton);
  } else {
    return;
  }
  readBook(readButton);
  removeBook(removeButton, libraryBook, book);
}

function cardCreate(book, field, libraryBook) {
  const fieldElement = document.createElement("p");
  fieldElement.innerHTML = book[field];
  fieldElement.classList.add(field);
  library.appendChild(libraryBook);
  libraryBook.appendChild(fieldElement);
}

function readBook(readButton) {
  readButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (readButton.innerHTML === "Completed") {
      readButton.innerHTML = "Incomplete";
    } else {
      readButton.innerHTML = "Completed";
    }
  });
}

function removeBook(removeButton, libraryBook, book) {
  removeButton.addEventListener("click", (e) => {
    e.preventDefault();
    //could also add alert
    book.removed = true;
    libraryBook.parentNode.removeChild(libraryBook);
    displayBooks();
  });
}
