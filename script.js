let series = [
    {
        title: "The Sopranos",
        category: "Drama",
        year: 1999,
        info: "Tony Soprano a North Jersey-based Italian-American mobster that causes him serious psychological distress"
    },
    {
        title: "Deadwood",
        category: "Western",
        year: 2006,
        info: "The serie is set in 1870s in Deadwood, South Dakota, before and after the area's annexation by the Dakota Territory"
    },
    {
        title: "Dark",
        category: "Thriller",
        year: 2017,
        info: "A family saga with a supernatural twist set in a German town"
    },
    {
        title: "TwinPeaks",
        category: "Mysterie",
        year: 1990,
        info: "The small northwest town of Twin Peaks, Washington is shaken up when the body of the Homecoming Queen, Laura Palmer"
    },
    {
        title: "Mr.Robot",
        category: "Thriller",
        year: 2015,
        info: "Elliot, a brilliant but unstable cyber-security engineer and vigilante hacker, becomes a key figure in a complex game of global chaos"
    },
    {
        title: "Severance",
        category: "Thriller",
        year: 2022,
        info: "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives"
    }
]

// second array with series categories
let categories = ['All', 'Thriller', 'Drama', 'Mysterie', 'Western'];

// querySelector for fetching DOM elements HTML ELEMENT (VARIABLES)
const catalogue = document.querySelector('.series-container');
const menuList = document.querySelector(".menu-list");
const mobileIcon = document.querySelector('.menu-toggle');
const form = document.querySelector('#userForm');

// This function use the createElement() method to create the catalog and use loop for.of to filter them by clickling a button(categories)
function filterCatalog() {
    let filterCat = document.getElementById('catalogue');
    let buttons =  categories
    filterCat.innerHTML = '<h2>Catalogue</h2>';

        for (let category of categories) {
        filterCat.innerHTML += `
        <button class="btncat" data-category="${category}">${category}</button>`;
};

// outside eventListener  awaits for the clickedbutton to display series by category (access the series by object (.))
    filterCat.addEventListener('click', (event) => {
    let button = event.target
    if (button) {
        displaySeries(button.dataset.category);
      }    
    });
} 

// function that creates each series card
function createCard(serie, index) {
    let card = document.createElement('div');
    card.classList.add('serie');
    card.innerHTML += `
        <h1 class="title">${serie.title}</h1>
        <p class="category">${serie.category}</p>
        <p class="year">${serie.year}</p>
        <button class="btn" index="${index}">More info</button>
        <button class="rembtn" index=${index}">Remove</button>
        <p class="info hidden">${serie.info}</p>`;
    // The return function returns the card value 
    return card;
}

// function that display each card depending on category matching ('All or 'serie.category') using forEach loop
function displaySeries(category) {
    catalogue.innerHTML = '';

    series.forEach((serie, index) => {
        if (category === 'All' || serie.category === category) {
            catalogue.append(createCard(serie, index));
        }
    });
}   

// Eventlistener for the click of the buttons inside the card (div)
catalogue.addEventListener('click', (event) => {
    const clickedbutton = event.target;   
   // Display the hidden p with serie info
   if (clickedbutton.className === "btn") {
        const serieinfo = clickedbutton.parentNode.querySelector(".info");
        serieinfo.classList.toggle("hidden");
    // if conditional that change the text inside the buttons once is clicked
        if (clickedbutton.textContent === "More info") {    
            clickedbutton.textContent = "Less info";           
        } else if (clickedbutton.textContent === "Less info") {
            clickedbutton.textContent = "More info";
        }
    }
// else if allows removing the card using methods map, indexOf and splice (index array of objects)
    else if (clickedbutton.className === "rembtn") {
        let seriesname = clickedbutton.parentNode.querySelector(".title").textContent
        index = series.map(e => e.title).indexOf(seriesname)
        series.splice(index, 1)
        clickedbutton.parentNode.remove()
    }           
});

filterCatalog();
displaySeries('All');

// ADD SERIES FORM (ADD OBJECTS) 
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
  
    series.push(data);
    displaySeries('All');
    form.reset();
});

// Toggle for small screen display (menu)
mobileIcon.addEventListener("click", () => {
    menuList.classList.toggle('active');
});




      


