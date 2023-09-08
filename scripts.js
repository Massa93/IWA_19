import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

let page = 1;
let matches = books;

const createBookElement = ({ author, id, image, title }) => {
  const element = document.createElement('button');
  element.classList = 'preview';
  element.setAttribute('data-preview', id);

  element.innerHTML = `
    <img
      class="preview__image"
      src="${image}"
    />

    <div class="preview__info">
      <h3 class="preview__title">${title}</h3>
      <div class="preview__author">${authors[author]}</div>
    </div>
  `;

  return element;
};

const populateBookList = (startIndex = 0) => {
  const fragment = document.createDocumentFragment();
  const endIndex = Math.min(startIndex + BOOKS_PER_PAGE, matches.length);

  for (let i = startIndex; i < endIndex; i++) {
    fragment.appendChild(createBookElement(matches[i]));
  }

  document.querySelector('[data-list-items]').innerHTML = '';
  document.querySelector('[data-list-items]').appendChild(fragment);
};

document.querySelector('[data-list-button]').addEventListener('click', () => {
  const startIndex = page * BOOKS_PER_PAGE;
  page++;

  populateBookList(startIndex);

  const remainingBooks = matches.length - (page * BOOKS_PER_PAGE);
  const remainingText = remainingBooks > 0 ? ` (${remainingBooks})` : '';

  document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining">${remainingText}</span>
  `;
  document.querySelector('[data-list-button]').disabled = remainingBooks <= 0;
});

populateBookList();

// Add event listeners for other UI interactions (search, settings, etc.) as before...
