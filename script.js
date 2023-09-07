const addBook = document.getElementById("add-book-button");
const form = document.querySelector('form');
const formClose = document.getElementById("close-icon-button");
const formContainer = document.querySelector(".form-container");
const cards = document.querySelectorAll('.card');


const myLibrary = [];


function Book(title, author, publish, pages, isRead) {
    this.title = title;
    this.author = author;
    this.publish = publish;
    this.pages = pages;
    this.isRead = isRead;
}

const stats = document.getElementById('form-read-status');
let isFormRead = false;
stats.addEventListener('change', (event) => {
    if (event.target.checked) {
        isFormRead = true;
    } else {
        isFormRead = false;
    }

    console.log(isFormRead);
});

function addCardToDom(title, author, publish, pages, isRead) {
    const container = document.querySelector('.cards-container');
    const card = document.createElement('div');
    card.classList.add('card');

    const titleDom = document.createElement('div');
    titleDom.classList.add('title');
    titleDom.textContent = title;

    const authorDom = document.createElement('div');
    authorDom.classList.add('author');
    authorDom.textContent = "By " + author;

    const publishDom = document.createElement('div');
    publishDom.classList.add('published');
    publishDom.textContent = publish;

    const pagesDom = document.createElement('div');
    pagesDom.classList.add('pages');
    pagesDom.textContent = pages;

    const modificationContainer = document.createElement('div');
    modificationContainer.classList.add('modification-container');


    container.appendChild(card);
    card.appendChild(titleDom);
    card.appendChild(authorDom);
    card.appendChild(publishDom);
    card.appendChild(pagesDom);
    card.appendChild(modificationContainer);


    const readButtonContainer = document.createElement('div');
    readButtonContainer.classList.add('read-button-container');
    const removeButtonContainer = document.createElement('div');
    removeButtonContainer.classList.add('remove-button-container');
    modificationContainer.appendChild(readButtonContainer);
    modificationContainer.appendChild(removeButtonContainer);

    const readText = document.createElement('div');
    readText.textContent = "Read";
    readText.classList.add("read-text");
    readButtonContainer.appendChild(readText);

    const readButton = document.createElement('div');
    readButton.classList.add("read-button");
    readButtonContainer.appendChild(readButton);

    const switch_ = document.createElement('label');
    switch_.classList.add('switch');
    const readStatus = document.createElement('input');
    readStatus.setAttribute('type', 'checkbox');
    readStatus.checked = isRead;
    readStatus.classList.add('read-status');

    const sliderRound = document.createElement('span');
    sliderRound.classList.add("slider");
    sliderRound.classList.add("round");

    readButton.appendChild(switch_);
    switch_.appendChild(readStatus);
    switch_.appendChild(sliderRound);

    const deleteItemButton = document.createElement('button');
    deleteItemButton.classList.add('delete-item-button');
    removeButtonContainer.appendChild(deleteItemButton);

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add("material-icons");
    deleteIcon.id = 'delete-icon';
    deleteIcon.textContent = "delete";
    deleteItemButton.appendChild(deleteIcon);

    const deleteItemText = document.createElement('div');
    deleteItemText.textContent = "Delete Item";
    deleteItemButton.appendChild(deleteItemText);
    
    readStatus.addEventListener('change', (event) => {
        isRead = event.target.checked;
        for (let index = 0; index < myLibrary.length; index++) {
            if (myLibrary[index].title === title && myLibrary[index].author === author) {
                myLibrary[index].isRead = isRead;
                break;
            }
        }
    });
  
    deleteItemButton.addEventListener('click', () => {
        
        for (let index = 0; index < myLibrary.length; index++) {
            if (myLibrary[index].title === title && myLibrary[index].author === author) {
                myLibrary.splice(index, 1);
                break;
            }
        }
      card.remove(); 
    });
  


}

function addBookToLibrary(event) {
    event.preventDefault();
    let title = document.getElementById('title_').value;
    let author = document.getElementById('author_').value;
    let publish = document.getElementById('publish_').value;
    let pages = document.getElementById('pages_').value;
    let isRead = isFormRead;

    if (author == '') {
        author = "Unknown";
    }

    if(publish == ''){
        publish = "Unknown";
    }

    newBook = new Book(title, author, publish, pages, isRead);
    myLibrary.push(newBook);

    form.reset();
    formContainer.classList.remove('zoom-in');
    formContainer.classList.add('zoom-out');
    setTimeout(() => {
        formContainer.style.display = 'none';
    }, 300);
    addCardToDom(title, author, publish, pages, isRead);


}

function defaulBookToLibrary() {
    let book1 = new Book("Clean Code: A Handbook of Agile Software Craftsmanship", "Robert C. Martin", "08/11/2008", 464, false);
    let book2 = new Book("Python Crash Course", "Eric Matthes", "11/30/2015", 562, false);
    let book3 = new Book("JavaScript: The Good Parts", "Douglas Crockford", "05/01/2008", 172, false);

    myLibrary.push(book1);
    myLibrary.push(book2);
    myLibrary.push(book3);
    dynamicReadStatus();
}

defaulBookToLibrary();
let myForm = document.getElementById('myForm');
myForm.addEventListener('submit', addBookToLibrary);




cards.forEach((card) => {
    const deleteButton = card.querySelector('.delete-item-button');
    deleteButton.addEventListener('click', () => {
        const titleToRemove = card.querySelector('.title').textContent;
        let authorToRemove = card.querySelector('.author').textContent;
        authorToRemove = authorToRemove.replace('By ', '');

        for (let index = 0; index < myLibrary.length; index++) {
            if (myLibrary[index].title === titleToRemove && myLibrary[index].author === authorToRemove) {
                myLibrary.splice(index, 1);
                break;
            }
        }
        card.remove();
    });
});

function dynamicReadStatus() {
    cards.forEach((card) => {
        const readStatus = card.querySelector('.read-status');
        readStatus.addEventListener("change", (event) => {
            let isRead = false;
            if (event.target.checked) {
                isRead = true;
            } else {
                isRead = false;
            }


            const checkTitle = card.querySelector('.title').textContent;
            let checkAuthor = card.querySelector('.author').textContent;
            checkAuthor = checkAuthor.replace('By ', '');
            for (let index = 0; index < myLibrary.length; index++) {
                if (myLibrary[index].title === checkTitle && myLibrary[index].author === checkAuthor) {
                    myLibrary[index].isRead = isRead;
                    break;
                }
            }


        });
    });
}

addBook.addEventListener('click', () => {
    form.reset();
    isFormRead = false;
    formContainer.style.display = 'block';
    formContainer.classList.remove('zoom-out');
    formContainer.classList.add('zoom-in');
});

formClose.addEventListener('click', () => {
    formContainer.classList.remove('zoom-in');
    formContainer.classList.add('zoom-out');
    setTimeout(() => {
        formContainer.style.display = 'none';
    }, 300);
});

