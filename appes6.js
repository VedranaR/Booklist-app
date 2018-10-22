class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    //Create tr element
    const row = document.createElement("tr");
    //Insert columns
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x</a></td>`;

    list.appendChild(row);
  }

  showAlert(message, className) {
    //Create div
    const div = document.createElement("div");
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    //Insert alert
    container.insertBefore(div, form);

    //Disappear after 3 seconds
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//Add event listeners
document.getElementById("book-form").addEventListener("submit", function(e) {
  //Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //Instantiate book
  const book = new Book(title, author, isbn);

  //Instantiate the UI object
  const ui = new UI();

  //Validate
  if (title === "" || author === "" || isbn === "") {
    //Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //Add book to the list
    ui.addBookToList(book);

    //Book added
    ui.showAlert("Book is added!", "success");

    //Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

//Event listener for delete
document.getElementById("book-list").addEventListener("click", function(e) {
  //Instantiate the ui
  const ui = new UI();

  ui.deleteBook(e.target);

  //Show message after deleting
  ui.showAlert("Book removed!", "success");

  e.preventDefault();
});
