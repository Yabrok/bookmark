const elForm = document.querySelector('.js-form');
const elInput = document.querySelector('.js-input');
const elList = document.querySelector('.js-list');
const elSelect = document.querySelector('.js-select');
const elSelect2 = document.querySelector('.js-select_2');

const elYear = document.querySelector('.js-year');

const savedBooks = document.querySelector('.list-group');


elList.style.display = 'flex';
elList.style.margin = '0';
elList.style.padding = '0';

let data = JSON.parse(localStorage.getItem('saves'))
let bookmarkBooks = data || [];

renderBoooks(bookmarkBooks, savedBooks)
function render(array, node) {
    node.innerHTML = '';
    for (var book of array) {
        const elItem = document.createElement('li');
        elItem.dataset.bookId = book.id

        const bookPoster = document.createElement('img');
        bookPoster.setAttribute('src', book.imageLink);
        bookPoster.classList.add('mb-3')
        bookPoster.style.width = '100%'
        elItem.appendChild(bookPoster);

        const bookTitle = document.createElement('h3');
        bookTitle.textContent = book.title;
        elItem.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${book.author}`;
        elItem.appendChild(bookAuthor);

        const bookLeng = document.createElement('p');
        bookLeng.textContent = `Language: ${book.language}`
        elItem.appendChild(bookLeng);

        const bookYear = document.createElement('p');
        bookYear.textContent = `Year: ${book.year}`
        elItem.appendChild(bookYear);

        const bookPage = document.createElement('p');
        bookPage.textContent = `Pages: ${book.pages}`
        elItem.appendChild(bookPage);

        const bookLink = document.createElement('a');
        bookLink.setAttribute('href', book.link)
        bookLink.setAttribute('target', '_blank')
        bookLink.setAttribute('class', 'd-block mb-3',)
        bookLink.textContent = `Wiki`
        elItem.appendChild(bookLink);

        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.textContent = 'Save'
        bookmarkBtn.classList.add('btn', 'bg-warning', 'js-savebtn')
        bookmarkBtn.setAttribute('type', 'button')
        elItem.appendChild(bookmarkBtn)
        bookmarkBtn.dataset.bookId = book.id


        elList.appendChild(elItem);

        elItem.classList.add('p-2', 'shadow-lg')

        elItem.style.width = '300px'
        elItem.style.borderRadius = '10px'
        elItem.style.overflow = 'hiden'
        elItem.style.background = '#202124';
        elItem.style.color = '#fff';
    }
}

render(books, elList);

// =====select====================
let newSet = new Set();
books.forEach((item) => {
    newSet.add(item.country)
});

newSet.forEach((country) => {
    let elOption = document.createElement('option');
    elOption.value = country;
    elOption.textContent = country;
    elSelect.appendChild(elOption);
})

let countries = []
elSelect.addEventListener('change', () => {
    countries = [];
    if (elSelect.value != 'All') {
        books.forEach((item) => {
            if (item.country.includes(elSelect.value)) {
                countries.push(item)
                render(countries, elList)
            }
        })
    } else {
        render(books, elList)
    }

})
// ===================================
// let a = []
// books.forEach((item)=> {
//     a.push(item.pages)
// })
// console.log(Math.min.apply(null,a));

// sortby year======================
let years = []
elYear.addEventListener('change', () => {
    years = [];
    if (elYear.value == 'big') {
        const smallTobig = books.sort((a, b) => {
            return a.year - b.year
            // if(a.year > b.year){
            //     return 1;
            // }
            // if(a.year < b.year){
            //     return -1;
            // }
        })
        render(smallTobig, elList)
    }
    if (elYear.value == 'small') {
        const bigTosmall = books.sort((a, b) => {
            if (a.year > b.year) {
                return -1
            }
            if (a.year < b.year) {
                return 1
            }
        })
        render(bigTosmall, elList)
    }
    if (elYear.value == 'all') {
        render(books, elList)
    }
})

elSelect2.addEventListener('change', () => {
    if (elSelect2.value == 'all') {
        render(books, elList)
    }
    if (elSelect2.value == 'big') {
        const smallTobig = books.sort((a, b) => a.pages - b.pages)
        render(smallTobig, elList)
    }
    if (elSelect2.value == 'small') {
        const bigTosmall = books.sort((a, b) => b.pages - a.pages)
        render(bigTosmall, elList);
    }
})


// // Input==========================================

let searchArr = []

elInput.addEventListener('input', () => {
    let elInputValue = elInput.value.toLocaleLowerCase();
    books.forEach((x) => {
        if (x.title.toLocaleLowerCase().includes(elInputValue)) {
            searchArr.push(x);
        };
    })
    render(searchArr, elList);
    searchArr = [];
})
// ==================================================


elList.addEventListener('click', (evt) => {
    if (evt.target.matches('.js-savebtn')) {
        let findedBook = books.find((item) => item.id == evt.target.dataset.bookId);
        if (!bookmarkBooks.includes(findedBook.title)) {
            bookmarkBooks.push(findedBook.title);
        }
        localStorage.setItem('saves', JSON.stringify(bookmarkBooks));
    }
    console.log(bookmarkBooks);
    renderBoooks(bookmarkBooks, savedBooks)
})


function renderBoooks(array, node) {
    node.innerHTML = ''
    array.forEach((item, index) => {
        let newLi = document.createElement('li')
        newLi.dataset.bookId = index
        newLi.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
        newLi.textContent = item

        elDelBtn = document.createElement('button');
        elDelBtn.textContent = 'Delete';
        elDelBtn.dataset.bookId = index
        elDelBtn.classList.add('btn', 'btn-danger', 'js-delbtn')

        newLi.appendChild(elDelBtn);
        node.appendChild(newLi)
    })
}

savedBooks.addEventListener('click', (evt) => {
    if (evt.target.matches('.js-delbtn')) {
        bookmarkBooks.splice(evt.target.dataset.bookId, 1)
        localStorage.setItem('saves', JSON.stringify(bookmarkBooks))
        renderBoooks(bookmarkBooks, savedBooks)
    }
})



// ====================================================


const modeBtn = document.querySelector('.js-modebtn');

let theme = false;

modeBtn.addEventListener('click', () => {
    theme = !theme;
    const bg = theme ? 'dark' : 'light';
    window.localStorage.setItem('theme', bg);
    changeMode()

})

function changeMode() {
    if (window.localStorage.getItem('theme') == 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark')
    }
}
changeMode()
