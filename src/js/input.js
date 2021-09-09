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
    fetchBooks(bookSearchName)
        .then(results => {
            if (results.length <= 10) {
                refsSearchResults.insertAdjacentHTML(
                    'beforeend',
                    createBooksListTemplate(results),
                ) 
            };
            if (results.length > 10) {
                alert({
                    text: 'Too many matches found. Please enter a more specific query!',
                    type: 'error',
                    delay: 1000,
                    stack: new Stack({
                        dir1: 'up',
                    }),
                })
            };
        })
        .catch(console.log)
};

function createBooksListTemplate(results) {
  const template =
  '<ul class="book-list">' +
  results.reduce((acc, item) => {
      acc += `<li>${item.name}</li>`;
      return acc;
    }, '') +
    '</ul>';
    return template;
};

refsInput.addEventListener('input', debounce(displayBooks, 3000));