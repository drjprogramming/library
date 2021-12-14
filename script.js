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
  console.log(myLibrary);
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

function displayBooks() {
  myLibrary.forEach((book, index) => {
    const newId = `index-${index}`;
    book.uniqueId = newId;
    const existingBooks = document.getElementById(newId);
    const libraryBook = document.createElement("div");
    libraryBook.id = book.uniqueId;
    if (existingBooks == null) {
      const author = document.createElement("p");
      author.innerHTML = book.author;
      library.appendChild(libraryBook);
      libraryBook.appendChild(author);
    } else {
      return;
    }
  });
}
