'use strict';

const productsList = [];
let roundsOfVoting = 25;

function CreateProduct(name, source){
  this.name = name;
  this.source = source;
  this.timesShown = 0;
  this.timesClicked = 0;
}

productsList.push(new CreateProduct('bag', 'img/bag.jpg'));
productsList.push(new CreateProduct('banana', 'img/banana.jpg'));
productsList.push(new CreateProduct('bathroom', 'img/bathroom.jpg'));
productsList.push(new CreateProduct('boots', 'img/boots.jpg'));
productsList.push(new CreateProduct('breakfast', 'img/breakfast.jpg'));
productsList.push(new CreateProduct('bubblegum', 'img/bubblegum.jpg'));
productsList.push(new CreateProduct('chair', 'img/chair.jpg'));
productsList.push(new CreateProduct('cthulhu', 'img/cthulhu.jpg'));
productsList.push(new CreateProduct('dog-duck', 'img/dog-duck.jpg'));
productsList.push(new CreateProduct('dragon', 'img/dragon.jpg'));
productsList.push(new CreateProduct('pen', 'img/pen.jpg'));
productsList.push(new CreateProduct('pet-sweep', 'img/pet-sweep.jpg'));
productsList.push(new CreateProduct('scissors', 'img/scissors.jpg'));
productsList.push(new CreateProduct('shark', 'img/shark.jpg'));
productsList.push(new CreateProduct('sweep', 'img/sweep.png'));
productsList.push(new CreateProduct('tauntaun', 'img/tauntaun.jpg'));
productsList.push(new CreateProduct('unicorn', 'img/unicorn.jpg'));
productsList.push(new CreateProduct('water-can', 'img/water-can.jpg'));
productsList.push(new CreateProduct('wine-glass', 'img/wine-glass.jpg'));

let imgEls = document.querySelectorAll('img');
let voteTrackerEl = document.getElementById('vote-tracker');

console.log('Current Products: ', productsList);

function generateRandomProduct(){
  return Math.floor(Math.random() * productsList.length);
}

function renderProducts() {
  let product1 = productsList[generateRandomProduct()];
  let product2 = productsList[generateRandomProduct()];
  let product3 = productsList[generateRandomProduct()];
  console.log('Products to Render ', imgEls);
  while (product1.name === product2.name || product1.name === product3.name || product2.name === product3.name){
    product2 = productsList[generateRandomProduct()];
    product3 = productsList[generateRandomProduct()];
  }
  imgEls[0].src = product1.source;
  imgEls[0].id = product1.name;
  product1.timesShown += 1;
  imgEls[1].src = product2.source;
  imgEls[1].id = product2.name;
  product2.timesShown += 1;
  imgEls[2].src = product3.source;
  imgEls[2].id = product3.name;
  product3.timesShown += 1;
}

function resultsButton(){
  const ul = document.getElementById('results');
  ul.innerHTML = '';
  const li = document.createElement('li');
  if(roundsOfVoting > 0){
    let text = ('Sorry, you need to vote ' + roundsOfVoting + ' more times to see results!');
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
  } else {
    for(let h = 0; h < productsList.length; h++){
      let text = (productsList[h].name + ' had ' + productsList[h].timesClicked + ' votes and was seen ' + productsList[h].timesShown + ' times.');
      let lis = document.createElement('li');
      lis.appendChild(document.createTextNode(text));
      ul.appendChild(lis);
      console.log('loop ran');
    }
  }
}

function handleClick(event){
  let imgClicked = event.target.id;
  productsList.forEach(image => {
    if(image.name === imgClicked){
      image.timesClicked += 1;
    }
  });
  console.log('Updated Products: ', productsList);
  if(roundsOfVoting){
    renderProducts();
    roundsOfVoting--;
  } else {
    voteTrackerEl.removeEventListener('click', handleClick);
  }
}

renderProducts();
voteTrackerEl.addEventListener('click', handleClick);
