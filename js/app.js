'use strict';

let productsList = [];
let roundsOfVoting = 25;
let chartObj = null;

// create constructor function
function CreateProduct(name, source){
  this.name = name;
  this.source = source;
  this.timesShown = 0;
  this.timesClicked = 0;
}

// push products through constructor function
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

// required selectors for DOM
let imgEls = document.querySelectorAll('img');
let voteTrackerEl = document.getElementById('vote-tracker');

// generate random number to pick an product from array
function generateRandomProduct(){
  return Math.floor(Math.random() * productsList.length);
}

// generate products that aren't the exact same product & don't match the previous products
function renderProducts() {
  let product1 = productsList[generateRandomProduct()];
  let product2 = productsList[generateRandomProduct()];
  let product3 = productsList[generateRandomProduct()];
  while (product1.name === product2.name || product1.name === product3.name || product2.name === product3.name){
    product2 = productsList[generateRandomProduct()];
    product3 = productsList[generateRandomProduct()];
  }
  while (imgEls[0].id === product1.name || imgEls[0].id === product2.name || imgEls[0].id === product3.name || imgEls[1].id === product1.name || imgEls[1].id === product2.name || imgEls[1].id === product3.name || imgEls[2].id === product1.name || imgEls[2].id === product2.name || imgEls[2].id === product3.name){
    product1 = productsList[generateRandomProduct()];
    product2 = productsList[generateRandomProduct()];
    product3 = productsList[generateRandomProduct()];
    while (product1.name === product2.name || product1.name === product3.name || product2.name === product3.name){
      product2 = productsList[generateRandomProduct()];
      product3 = productsList[generateRandomProduct()];
    }
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

// handles the event of which product was clicked on
function handleClick(event){
  let imgClicked = event.target.id;
  productsList.forEach(image => {
    if(image.name === imgClicked){
      image.timesClicked += 1;
    }
  });
  if(roundsOfVoting > 1){
    renderProducts();
    roundsOfVoting--;
  } else {
    voteTrackerEl.removeEventListener('click', handleClick);
    chartObj = drawChart();
    roundsOfVoting--;
    writeData('products', productsList);
  }
}

// adds the click listener for the above function
voteTrackerEl.addEventListener('click', handleClick);

// this makes sure the localStorage aren't empty, and if they are doesn't load them from last load, which was causing page issues if you didn't have localStorage
if (readData('products') === null){
  '';
} else {
  readData('products');
}

// calls the function to display photos that dont match and are new
renderProducts();

// a function to write votes/seen values to local storage
function writeData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// a function to read votes/seen values to local storage
function readData(key){
  return JSON.parse(localStorage.getItem(key));
}

// getting elements again, this time for the chart
const canvasEl = document.getElementById('chart');

// this function intakes all the values and outputs them into arrays that the chart can use for a dataset and then creates the chart with those datasets
function drawChart() {
  let labels = [];
  let timesShownValues = [];
  let timesClickedValues = [];
  productsList.forEach(product => {
    labels.push(product.name);
    timesShownValues.push(product.timesShown);
    timesClickedValues.push(product.timesClicked);
  });
  return new Chart(canvasEl, {
    animationEnabled: true,
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Times Shown',
        data: timesShownValues,
        borderWidth: 1,
      }, {
        label: 'Times Clicked',
        data: timesClickedValues,
        borderWidth: 1,
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

