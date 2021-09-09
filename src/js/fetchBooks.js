export default function fetchBooks(searchQuery) {
    return fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`,
  ).then(result => result.json());
};