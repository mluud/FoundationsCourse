//1- Link to get a random meal
//https://www.themealdb.com/api/json/v1/1/random.php

//2- Link to lookup a specific meal with an id
//https://www.themealdb.com/api/json/v1/1/lookup.php?i=

//3- Link to search for meals using a keyword
//https://www.themealdb.com/api/json/v1/1/search.php?s=


const mealsElement = document.querySelector("#meals");

getRandomMeal();

async function getRandomMeal()
{
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    //console.log(resp);
    const randomData = await resp.json(); //converting json into normal data
    //console.log(randomData);
    const RandomMeal = randomData.meals[0]; //extracting the information, maybe need to use different technique for final project
    console.log(RandomMeal);

    addMeal(RandomMeal);
}
//need a function to change the meal of the day

function addMeal(mealData) //need to pass an object
{
    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML =`<div class="meal-header">
                            <span class="random">Meal of the Day</span>
                             <img src=${mealData.strMealThumb} alt="">
                         </div>
                        <div class="meal-body">
                             <h3>${mealData.strMeal}</h3>
                             <button class="fav-btn">
                                 <i class="fas fa-heart"></i>
                            </button>
                        </div>`;

        mealsElement.appendChild(meal);                
    }