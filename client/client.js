'use strict'

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
<<<<<<< HEAD
const API_URL = 'http://localhost:3000/barks';
=======
const barksElement = document.querySelector('.barks');
//const API_URL = window.location.hostname === '127.0.0.1' ? 'http://localhost:5000/barks' : 'https://';
const API_URL = 'http://127.0.0.1:3000/barks';

>>>>>>> 2c6367018f34bef73190900b85020df744a3569d

loadingElement.style.display = 'none';

listAllBarks();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');

  const bark = {
    name,
    content
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
      form.reset();
      setTimeout(() => {
        form.style.display = '';
      }, 30000);
      listAllBarks();
      loadingElement.style.display = 'none';
    });
});


function listAllBarks() {
  barksElement.innerHTML = '';
  fetch(API_URL)
    .then(response => response.json())
    .then(barks => {
      barks.reverse();
      barks.forEach(bark => {
        const div = document.createElement('div');
        div.classList.add('barkDiv')

        const header = document.createElement('h3');
        header.textContent = bark.name;

        const contents = document.createElement('p');
        contents.textContent = bark.content;

        const date = document.createElement('small');
        date.textContent = bark.created;

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        barksElement.appendChild(div);
      });
      loadingElement.style.display = 'none';
    });
};
