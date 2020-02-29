let todoList = document.querySelector('#list');
let todoItem = null;
let btnAdd = null;
let inputText = null;
let currentDay = null;
let currentData = null;
let toDo = null;
const head = document.querySelector('#head');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


function addCurrnetDay() {
  const dayName = document.createElement('h2');
  dayName.classList.add('todo--head-day');
  const today = new Date();
  dayName.innerHTML = days[today.getDay()];

  const day = document.createElement('span');
  day.classList.add('todo--head-date');
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  day.innerHTML = `${dd}.${mm}.${yyyy}`;

  head.appendChild(dayName);
  head.appendChild(day)
}

function addTask(input) {
  const item = document.createElement('li');
  item.classList.add('todo--tasks--task');
  item.setAttribute('id', 'item');

  const check = document.createElement('i');
  check.classList.add('far', 'fa-circle');

  const text = document.createElement('p');
  text.classList.add('text');
  text.textContent = input;

  const del = document.createElement('i');
  del.classList.add('far', 'fa-trash-alt');
  del.setAttribute('id', 'btnDel');

  item.appendChild(check);
  item.appendChild(text);
  item.appendChild(del);
  todoList.appendChild(item);

}

document.addEventListener('DOMContentLoaded', function () {
  const todoList = document.querySelector('#list');
  const todoItem = document.querySelector('#item');
  const btnAdd = document.querySelector('#btn-add');
  const inputText = document.querySelector('#input-text');
  const toDo = document.querySelector('#todo');


  btnAdd.addEventListener('click', function () {
    if (inputText.value !== '') {
      addTask(inputText.value);
      inputText.value = '';
    }
  })

  toDo.addEventListener('click', function (e) {
    if (e.target.closest('#btnDel') !== null) {
      e.target.closest('#item').remove();
    }
  })

  addCurrnetDay();
})