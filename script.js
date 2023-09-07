const addBook = document.getElementById("add-book-button");
const form = document.querySelector('form');
const formClose = document.getElementById("close-icon-button");
const formContainer = document.querySelector(".form-container");
const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    const deleteButton = card.querySelector('.delete-item-button');
    deleteButton.addEventListener('click', () => {
        card.remove();
    });
});

addBook.addEventListener('click', () =>{
    form.reset();
    formContainer.style.display = 'block';
    formContainer.classList.remove('zoom-out');
    formContainer.classList.add('zoom-in');
});

formClose.addEventListener('click', () =>{
    formContainer.classList.remove('zoom-in');
    formContainer.classList.add('zoom-out');
    setTimeout(() => {
        formContainer.style.display = 'none';
    }, 300); 
});
