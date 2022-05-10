let searchform = document.querySelector('form');
let searchresult = document.querySelector('.search-result');
let container = document.querySelector('.container');
let searchquery='';
// let searchResultDiv='';
const app_id = '59494c0a';
const app_key = 'f9f1853bb8264d892c5cb3e600662697';
// const baseurl = `https://api.edamam.com/search?q=pizza&app_id=${app_id}&app_key=${app_key}`;

 
searchform.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchquery = e.target.querySelector('input').value;
    console.log(searchquery);
    fetchAPI(searchquery);
});
async function fetchAPI(searchquery) {
    const baseurl = `https://api.edamam.com/search?q=${searchquery}&app_id=${app_id}&app_key=${app_key}&to=20`;
    const response = await fetch(baseurl);
    const data = await response.json();
    generatedHTML(data.hits);
    console.log(data);

}

function generatedHTML(result) {
    let generatedHTML = ''
    result.map(result => {
        generatedHTML += `
                <div class="item">  
                    <img src="${result.recipe.image}" alt="image cant visit">
                    <div class="flex-container">
                        <h1 class="title">${result.recipe.label}</h1>
                        <a class='view-button' href="${result.recipe.url}" target="_blank">view recipe</a>
                    </div>
                    <p class="item-data">calories:${result.recipe.calories.toFixed(2)}</p>
                    <p class="item-data">dietLabels:${result.recipe.dietLabels.length>0 ? result.recipe.dietLabels:"data not found"}</p>
                    <p class="item-data">healthLabels:${result.recipe.healthLabels}</p>
                    
                </div> `
    })
    let searchResult = document.getElementById("searchitem")
    searchResult.innerHTML = generatedHTML;

}