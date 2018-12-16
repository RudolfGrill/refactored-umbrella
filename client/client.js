"use strict"

console.log("Hello World!");

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/barks';

loadingElement.style.display = 'none';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');

  const bark = {
    name,
    content,
  };

  form.style.display = 'none';
  loadingElement.style.display = '';

  fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(bark),
      headers: {
        'content-type': 'application/json'
      }

    }).then(response => response.json())
    .then(createdBark => {
      console.log(createdBark);
      form.reset();
      form.style.display = '';
      loadingElement.style.display = 'none';
    });
});