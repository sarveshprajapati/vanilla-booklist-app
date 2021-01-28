//let num = Math.floor(Math.random(10)*10000000)
//alert(num)

//build about a book
//localStorage.clear()
class Book {
    constructor(title, author, publication,uid) {
        this.title = title;
        this.author = author;
        this.publication = publication;
        this.uid = uid;
    }
}

//visualize the book list
class takeBook {
    static showBook() {
        //const bookblock=[];
        const books = AccessStorage.getBookfromStorage(); //return all, the books from the local storage
        console.log(books);
        //console.log("After splice");
        //console.log(books.splice(0,1));

        books.forEach((book) => takeBook.addNewBook(book));


    }

    static addNewBook(book) {    //add books to display in table 
        const bookList = document.getElementById("bookList");
        const eachBook = document.createElement('tr');

        eachBook.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.publication}</td>
            <td>${book.uid}</td>
            <td class="deleteBtn">&times;</td>
        `;

        bookList.appendChild(eachBook);
    }

    static deleteBook(clicked) {
        if (clicked.classList.contains('deleteBtn')) {
            const useData = clicked.parentElement;
            //console.log(useData);
            clicked.parentElement.remove();

        }
    }

    static deleteDefaultValues() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("publication").value = "";

    }

}

//access with local storage

class AccessStorage {
    static getBookfromStorage() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem("books"));
            //console.log(books);
        }
        return books;
    }

    static addBooktoStorage(book) {
        const books = AccessStorage.getBookfromStorage();
        takeBook.addNewBook(book);
        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));
        // takeBook.showBook();
    }

    static removeBookfromStorage(clicked) {
        const passedUid=clicked.previousElementSibling.textContent;
        console.log(passedUid);
        const books = AccessStorage.getBookfromStorage();
        //console.log(books)
        books.forEach((book,index)=>{
            //console.log(book.uid)
            //console.log(index)
            if(book.uid==passedUid){
                console.log(index);
                books.splice(index,1);
            }
        });
        localStorage.setItem("books", JSON.stringify(books));
    }
}

//display book
document.addEventListener('DOMContentLoaded', takeBook.showBook);

//add books in books on form submitting

const bookform = document.getElementById("bookform");

bookform.addEventListener("submit", (event) => {
    event.preventDefault();
    let uid = Math.floor(Math.random(10)*10000000)   //unique id


    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const publication = document.getElementById("publication").value;
    //prevent if value in unavailable

    if (title === '' || author === '' || publication === '') {
        alert("Fill the fields");
    }
    else {
        //add into book list
        const newBook = new Book(title, author, publication, uid);

        // takeBook.addNewBook(newBook);

        //add book into storage
        AccessStorage.addBooktoStorage(newBook);

        //for delete the default
        takeBook.deleteDefaultValues();
    }

});
//delete books

document.getElementById("bookList").addEventListener("click", (event) => {
    //console.log(event.target);
    takeBook.deleteBook(event.target);

    //delete book form local storage
    //console.log(event.target.previousElementSibling.textContent)

    AccessStorage.removeBookfromStorage(event.target);


});
/*
localStorage.clear();

let i;
let box = ["Apple","Banana","Gauva"];
console.log("Box Array")
console.log(box)

localStorage.setItem("box",JSON.stringify(box));


console.log("LocalStorage")
console.log(localStorage);

let demoBox=JSON.parse(localStorage.getItem("box"));
console.log(demoBox)
box.splice(1,1);

localStorage.setItem("box",JSON.stringify(box));
demoBox=JSON.parse(localStorage.getItem("box"));
console.log(demoBox)
console.log("LocalStorage")
console.log(localStorage);
*/