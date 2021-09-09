import debounce from 'lodash.debounce';
import { alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});
import { defaults } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import { Stack } from '@pnotify/core';
import fetchBooks from './fetchBooks.js';

defaults.styling = 'brighttheme';
defaults.icons = 'brighttheme';
defaults.closerHover = true;

const refsInput = document.querySelector('.book-search-input');
const refsSearchResults = document.querySelector('.book-search-result');

function displayBooks(event) {
    refsSearchResults.innerHTML = '';
    const bookSearchName = event.target.value;
    bookSearchName.length > 3
    ? (fetchBooks(bookSearchName)
    .then(results => {
        refsSearchResults.insertAdjacentHTML(
            'beforeend',
            createBooksListTemplate(results),
        );
    })
    .catch(console.log))
    : (alert({
        text: 'Please, enter more symbols',
        type: 'error',
        delay: 1000,
        stack: new Stack({
            dir1: 'up',
        }),
    }));
};

function createBooksListTemplate(results) {
    const template =
        '<ul class="book-list">' +
        results.items.reduce((acc, item) => {
            acc += `<li>${item.volumeInfo.title.toUpperCase()}</li>`;
            return acc;
        }, '') +
        '</ul>';
    return template;
};

refsInput.addEventListener('input', debounce(displayBooks, 3000));