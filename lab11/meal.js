//1- Link to get a random meal
//https://www.themealdb.com/api/json/v1/1/random.php

//2- Link to lookup a specific meal with an id
//https://www.themealdb.com/api/json/v1/1/lookup.php?i=

//3- Link to search for meals using a keyword
//https://www.themealdb.com/api/json/v1/1/search.php?s=


const mealsElement = document.querySelector("#meals");
const favorites = document.querySelector(".favorites");
const searchBtn = document.querySelector("#search");
const searchTerm = document.querySelector("#search-term");

const localStorageKey = 'mealIds'



function initMain()
{
    mealsElement.innerHTML = "";
    getRandomMeal();
    updateFavoriteMeals();

    searchBtn.addEventListener("click", async ()=> {
        const searchWord = searchTerm.value;
        const meals = await getMealsBySearch(searchWord);
        console.log(meals);
        mealsElement.innerHTML = "";
        meals.forEach(meal =>{
            addMeal(meal);
        })
    });
}

async function getMealsBySearch(word)
{
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+word);
    const searchData = await resp.json(); 
    const meals = searchData.meals; //no [0] bc we dont want only the first item 

    return meals;
}

async function getRandomMeal()
{
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    //console.log(resp);
    const randomData = await resp.json(); //converting json into normal data
    //console.log(randomData);
    const RandomMeal = randomData.meals[0]; //extracting the information, maybe need to use different technique for final project
    console.log(RandomMeal);

    addMeal(RandomMeal,true);
}
//need a function to change the meal of the day

function addMeal(mealData,random=false)
{
    console.log(random);
    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML =`<div class="meal-header">
                            ${random?`<span class="random">Meal of the Day</span>`:""}
                            <img src=${mealData.strMealThumb} alt="">
                         </div>
                        <div class="meal-body">
                             <h3>${mealData.strMeal}</h3>
                             <button class="fav-btn">
                                 <i class="fas fa-heart"></i>
                            </button>
                        </div>`;
        const favoriteButton = meal.querySelector(".fav-btn");
        if(favoriteButton)
        {
            favoriteButton.addEventListener('click',()=>{
                if(favoriteButton.classList.contains("active"))
                {
                    favoriteButton.classList.remove("active");
                    removeMealFromLocalStorage(mealData.idMeal);
                }
                else
                {
                    favoriteButton.classList.add("active");
                    addMealToLocalStorage(mealData.idMeal);
                }
                updateFavoriteMeals(); //function call inside the event listener, bc goes together with clikcing like
            })
        }
        mealsElement.appendChild(meal);   
        
        const mealHeader = meal.querySelector(".meal-header");
        mealHeader.addEventListener("click", () => {
                openMealDetailsPage(mealData);
        });
    }

    function addMealToLocalStorage(mealId){
        const mealsArray = getMealsFromLocalStorage();
        localStorage.setItem(localStorageKey, JSON.stringify([...mealsArray,mealId]));
    }

    function removeMealFromLocalStorage(mealId){
        const mealsArray = getMealsFromLocalStorage();
        localStorage.setItem(localStorageKey, JSON.stringify(
            mealsArray.filter(id => id !== mealId)
        ));
    }

    function getMealsFromLocalStorage()
    {
        const mealIds = JSON.parse(localStorage.getItem(localStorageKey));
        if (mealIds === null)
            return [];
        else
            return mealIds;
    }

    function updateFavoriteMeals()
    {
        favorites.innerHTML = "";
        const favoriteMeals = getMealsFromLocalStorage();
        favoriteMeals.forEach(async element => {
            const meal = await getMealById(element);
            addMealToFavorites(meal);
        });
    }

    // below we will access the API 

    async function getMealById(elementId)
    {
        const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+elementId);
        const mealData = await resp.json();
        const meal = mealData.meals[0]; 
        console.log(meal);
        return meal;
    }

    function addMealToFavorites(mealData)
    {
        const favoriteMeal = document.createElement('li');
        favoriteMeal.innerHTML =    `<img id="fav-img" src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                                    <span>${mealData.strMeal}</span>
                                    <button class="clear"><i class="fas fa-window-close"></i></button>`

        const clearBtn = favoriteMeal.querySelector(".clear");
        clearBtn.addEventListener("click", ()=>{
            removeMealFromLocalStorage(mealData.idMeal);
            updateFavoriteMeals();
        });

        favorites.appendChild(favoriteMeal);

        const favId = favoriteMeal.querySelector("#fav-img")
        favId.addEventListener("click", () => {
            openMealDetailsPage(mealData);
        })
    }

    function openMealDetailsPage(mealData)
    {
        window.open("details.html?mealId="+mealData.idMeal,"_self");
    }

    function initDetailsPage()
    {
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams);
        const mealId = urlParams.get('mealId');
        console.log(mealId);

        showMealDetails(mealId);
    }

    async function showMealDetails(mealId){
        let tmpMeal = await getMealById(mealId);
        console.log(tmpMeal);

        const ingredients = [];
        for(let i = 0; i<= 20; i++)
        {
            if(tmpMeal['strIngredient'+i])
            ingredients.push(`${tmpMeal['strIngredient'+i]}/${tmpMeal['strMeasure'+i]}`)
        }

        for(let i = 0; i<ingredients.length; i++)
        {
            console.log(ingredients[i]);
        }

        const mealDetailsContainer = document.querySelector('.meal-container');
        mealDetailsContainer.innerHTML = 
        `<a href="meal.html">Home</a>
        <div class="meal-info">
            <div>
                <h1>${tmpMeal.strMeal}</h1>
                <img src="${tmpMeal.strMealThumb}" alt="${tmpMeal.strMeal}">
            </div>
            <div>
                <p>${tmpMeal.strInstructions}</p>
                    <ul>
                        ${ingredients.map(
                            item => `<li>${item}</li>`).join("")
                        }
                    </ul>
            </div>
        </div>`;
    }