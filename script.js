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

console.log(form.classList);

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

//Get remove button to remove book (classname not working)

function displayBooks() {
  myLibrary.forEach((book, index) => {
    const newId = `index-${index}`;
    const existingBooks = document.getElementById(newId);
    const libraryBook = document.createElement("div");
    const removeButton = document.createElement("button");
    const readButton = document.createElement("button");
    book.uniqueId = newId;
    libraryBook.id = book.uniqueId;
    removeButton.innerHTML = "Remove";
    if (book.read === true) {
      readButton.innerHTML = "Completed";
    } else {
      readButton.innerHTML = "Incomplete";
    }
    if (existingBooks == null && libraryBook.className != "hide") {
      cardCreate(book, "author", libraryBook);
      cardCreate(book, "title", libraryBook);
      cardCreate(book, "pages", libraryBook);
      libraryBook.appendChild(readButton);
      libraryBook.appendChild(removeButton);
      console.log(libraryBook.classList);
    } else {
      return;
    }
    readBook(readButton);
    removeBook(removeButton, libraryBook);
  });
}

function cardCreate(book, field, libraryBook) {
  const fieldElement = document.createElement("p");
  fieldElement.innerHTML = book[field];
  library.appendChild(libraryBook);
  libraryBook.appendChild(fieldElement);
}

function removeBook(removeButton, libraryBook) {
  removeButton.addEventListener("click", (e) => {
    e.preventDefault();
    //could also add alert
    libraryBook.classList.add("hide");
    libraryBook.parentNode.removeChild(libraryBook);
    console.log(libraryBook.classList);
  });
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
