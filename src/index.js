let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
  const toyCollection = document.querySelector('div#toy-collection')
  function makeOneToy(toyObject) {
    const div = document.createElement('div')
    div.innerHTML =
      `<div class="card" data-id= "${toyObject.id}">
      <h2>${toyObject.name}</h2>
      <img src= ${toyObject.image} class="toy-avatar" />
      <p> ${toyObject.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      </div>`
    toyCollection.appendChild(div)
  }

  function renderAllToys() {
    fetch("http://localhost:3000/toys")
      .then(res => res.json())
      .then(toyObjects => {
        toyObjects.forEach(toyObj => makeOneToy(toyObj))
      })
  }
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', function (event) {
    const name = event.target[0].value
    const image = event.target[1].value
    const newToy = { name, image, likes: 0 }

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    })
      .then(res => res.json())
      .then(toyObj => makeOneToy(toyObj))
  })
  renderAllToys()

  toyCollection.addEventListener('click', function (event) {
    if (event.target.className === "like-btn") {
      const cardDiv = event.target.closest('div')
      const id = cardDiv.dataset.id
      const pTag = cardDiv.querySelector('p')
      const currLikes = parseInt(pTag.textContent)
      const newLikes = currLikes + 1
      fetch(`http://localhost:3000/toys/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      body: JSON.stringify({likes: newLikes})
      })
      pTag.textContent = `${currLikes + 1} Likes`
  }
  })

});


