/* eslint-disable */

window.addEventListener('load', setup);
let nameForm, userForm, nameField, ageField, urlField, methodSelect;
const h1Strings = {
  success: 'Success',
  badRequest: 'Bad Request',
  updated: 'Updated (No Content)',
  notFound: 'Resource Not Found', 
  created: 'create',
  '404': 'Resource Not Found',
  '200': 'Success'
};
function setup() {
  nameForm = document.querySelector('#nameForm');
  userForm = document.querySelector('#userForm');
  nameField = document.querySelector('#nameField');
  urlField = document.querySelector('#urlField');
  ageField = document.querySelector('#ageField');
  methodSelect = document.querySelector('#methodSelect');
  nameForm.onsubmit = fetch1;
  userForm.onsubmit = fetch2;
  
}

async function fetch1(e) {
  e.preventDefault();
  const reqObj = { name: nameField.value, age: ageField.value};
  let response = await fetch('/addUser',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqObj)
  })
  if (response.status === 204){ 
    content.innerHTML = `<h1>${h1Strings.updated}</h1>`;
  } else {
    response = await response.json();
    content.innerHTML = `<h1>${h1Strings[response.id]}</h1><p>${response.message}</p>`;
  }
}

async function fetch2(e) {
  e.preventDefault();
  let response = await fetch(urlField.value,{
    method: methodSelect.value,
  });
  if (methodSelect.value.toUpperCase() ==='HEAD'){
    content.innerHTML = `<h1>${h1Strings[await response.status]}</h1>`;
  } else {
    response = await response.text();
    content.innerHTML = `<p>${response}</p>`;
  }
}

