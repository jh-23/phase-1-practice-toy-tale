let addToy = false;

document.addEventListener("DOMContentLoaded", () => {


// fetch
fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => data.forEach(toyInfo => renderToyInfo(toyInfo)))

const form = document.querySelector('.add-toy-form')  
form.addEventListener('submit', postToys)
function postToys(event) {
  event.preventDefault()
  console.log(event.target[0].value)
  console.log(event.target[1].value)
  
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": event.target[0].value,
      "image": event.target[1].value,
      "likes": 0
    })})
    .then(response => response.json())
    .then(data => renderToyInfo(data))
}

function patchLiker(toy) {
  const moreLikes = toy.likes+1
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": moreLikes
    })
  })
  .then(response => response.json())
  .then(data => {
    const updater = document.getElementById(toy.id)
    updater.textContent = moreLikes
  })
}

// render functions
function renderToyInfo(toyInfo) {
  const div = document.createElement('div')
  div.className = 'card'
  const h2 = document.createElement('h2')
  h2.textContent = toyInfo.name
  const img = document.createElement('img')
  img.src = toyInfo.image
  img.className = 'toy-avatar'
  const p = document.createElement('p')
  p.textContent = toyInfo.likes
  p.id = toyInfo.id
  const btn = document.createElement('button')
  btn.className = 'like-btn'
  btn.textContent = 'like'
  btn.addEventListener('click', () => {
    patchLiker(toyInfo)
  })
  div.append(h2, img, p, btn)
  let target = document.querySelector('#toy-collection')
  target.append(div)
}

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});





// DOM Selectors


// Event Listeners





// callback functions 





