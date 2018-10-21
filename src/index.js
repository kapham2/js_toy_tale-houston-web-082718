const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here

    // ## STEP 4: Add a new toy!
    /// can only add listener after the element exists

    // 4.1. grab form
    const addToyForm = document.querySelector('.add-toy-form'); // class
    
    // 4.2. add listener to form
    addToyForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // 4.3. make POST request
      const data = {
        name: event.target.name.value, // "name": "Jessie",
        image: event.target.image.value, // "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
        likes: 0
      }

      event.target.reset();

      fetch('http://localhost:3000/toys', {
        method: 'post',
        // body in README
        body: JSON.stringify(data), // needs to be JSON.stringify
        // header in README
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(function() { // run code after the response is finished
        
        // 4.4. render jessie to the page
        fetch('http://localhost:3000/toys') // must have http
        .then(response => response.json()) // response is array of toys
        .then(response => {
          const toys = response;
      
          // ## STEP 3: Add toy info to the card!
      
          // 3.1. get toy-collection div
          const toyCollectionDiv = document.getElementById('toy-collection');
          
          toyCollectionDiv.innerHTML = ""; // wipe out 
      
          // 3.2. add html for each toy
          toys.forEach(function(toy) { // before creating tags, look for html example in README
            //have attributes in quotes
            toyCollectionDiv.innerHTML += `
            <div class="card">
              <h2>${toy.name}</h2>
              <img src="${toy.image}" class="toy-avatar">
              <p>${toy.likes} Likes <p>
              <button class="like-btn" data-id=${toy.id}>Like <3</button>
            </div>`;
      
          })
        })
      })

      //can change index.html!!
      //delete jessies from db.json

    })

  } else {
    toyForm.style.display = 'none';
  }
})

// ## STEP 1: Create your server!
// npm install -g json-server //json server is server you run through the terminal
// json-server --watch db.json
// index.html should require index.js & index.css

document.addEventListener('DOMContentLoaded', function() { //if js code is at end then dont need this
  
  // ## STEP 2: Fetch Andy's Toys!
  fetch('http://localhost:3000/toys') //must have http
  .then(response => response.json()) //response is array of toys
  .then(response => {
    const toys = response;

    // ## STEP 3: Add toy info to the card!

    // 3.1. get toy-collection div
    const toyCollectionDiv = document.getElementById('toy-collection');

    // 3.2. add html for each toy
    toys.forEach(function(toy) {
      //put quotes around attributes
      toyCollectionDiv.innerHTML += `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar">
        <p>${toy.likes} Likes <p>
        <button class="like-btn" data-id="${toy.id}">Like <3</button> 
      </div>`
    //add dataset id to button

    // multiline text with "" :
    // "blah\
    // blah\"
    })
  })
  
  // ## STEP 5: Increase toy's likes!
  document.addEventListener('click', function(event) { // add global event listener to document which always exists 

    if(event.target.className === 'like-btn') { // only respond when we click on the like button
      // 5.1. grab like count element
      const likeCountElement = event.target.parentNode.parentNode.children[2]; //or event.target.parentNode.previousElementSibling

      // 5.2. get the number from the element
      const LikeCount = parseInt(likeCountElement.innerText); //parseInt grabs number from string
      const newLikeCount = LikeCount + 1;

      // 5.3. increment the like count
      likeCountElement.innerText = newLikeCount + " Likes"

      // 5.4. make patch request to persist data
      const id = event.target.dataset.id;
      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH', //has to be all caps
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": newLikeCount
        })
      })
      
    }
  })
})
