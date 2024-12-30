const parks = [
    {
        id: "e8d0207f-da8a-4048-bec8-117aa946b2c2", 
        name: "Disneyland Paris",
        img: 'https://media.disneylandparis.com/d4th/en-gb/images/n019751_02_2027jul06_world_disneyland-hotel-pink-sky_16-9_tcm752-221019.jpg'
    },
    {
        id: "832fcd51-ea19-4e77-85c7-75d5843b127c", 
        name: "California Dreaming",
        img: 'https://localgetaways.com/wp-content/uploads/2023/11/Disney-California-Adventure-Park_feature-image_800x400_Brooke-Geiger-McDonald.png'
    },
    {
        id: "faff60df-c766-4470-8adb-dee78e813f42", 
        name: "Tokyo Disney Resort",
        img: 'https://media2.tokyodisneyresort.jp/home/tdr/guide/rain/274_free_text_main_visual_4_ja7.jpg'
    },
];

const attractionList = [];
const filteredAttractions = [];
let totalPages = 0 ; 
const cardsPerPage = 10; // Number of cards to show per page 
// const dataContainer = document.getElementById('data-container'); 
const pagination = document.getElementById('pagination'); 
const prevButton = document.getElementById('prev'); 
const nextButton = document.getElementById('next'); 
const pageNumbers = document.getElementById('page-numbers'); 
const pageLinks = document.querySelectorAll('#page-link'); 


// Calculate the total number of pages 
let currentPage = 1; 

async function getAttractions(park)
{
    const response = await fetch(`https://api.themeparks.wiki/v1/entity/${park?.id}/children`);
    const attractions = (await response.json()).children.filter(child => child.entityType === "ATTRACTION"); 

    attractions.forEach(attraction => attractionList.push({name: attraction.name, park: park.name}));
    filteredAttractions.splice(0,filteredAttractions.length);
    attractionList.forEach(attraction => filteredAttractions.push(attraction));
    return;
}

function addAttraction(attraction){
    const attractionContainer = document.querySelector(".attractionInfo");
    const attractionElement = document.createElement("div");
    attractionElement.classList.add("attractionCard");
    attractionElement.innerHTML =
        `<div>
            <h4 class="attractionTitle">${attraction.name}</h4>
            <span>${attraction.park}</span>
            <img class="ride-img" src="https://tse3.mm.bing.net/th?id=OIG2.4IeI8BzjtyHk1k._VPZ1&pid=ImgGn" alt="attraction">
        <div>
        <div class="rating">
            <p>Ride Rating:</p>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
        </div>
    `;

    attractionContainer.appendChild(attractionElement);  
}

async function getAndShowAttractions(){
    for( const park of parks){
        await getAttractions(park);
    }
    update(attractionList.splice(0,cardsPerPage))
    totalPages = Math.ceil(attractionList.length / cardsPerPage);
}
getAndShowAttractions();

document.addEventListener("DOMContentLoaded", (_e) => {
    const parkFilter = document.querySelector(".parkFilter");
    const parkNameFilter = document.querySelector(".parkNameFilter");

    parks.forEach(park => {
        const parkOption = document.createElement("option");
        parkOption.value = park.name;
        parkOption.text = park.name;
        parkFilter.appendChild(parkOption);
    });

    
    parkFilter.addEventListener("change", (e) => {
        const attractionContainer = document.querySelector(".attractionInfo");
        attractionContainer.innerHTML = "";
        parkNameFilter.value = "";
        
        const tempfilteredAttractions = attractionList.filter(attraction => parkFilter.value === "all" || attraction.park === parkFilter.value);
        console.log(tempfilteredAttractions)
        filteredAttractions.splice(0,filteredAttractions.length);
        tempfilteredAttractions.forEach(attraction => filteredAttractions.push(attraction));
        totalPages = Math.ceil(filteredAttractions.length / cardsPerPage);
        update(filteredAttractions.splice(0,cardsPerPage))
        currentPage=1;
    });

    
    parkNameFilter.addEventListener("input", (e) => {
        const attractionContainer = document.querySelector(".attractionInfo");
        attractionContainer.innerHTML = "";
        parkFilter.value = "all";

        const tempfilteredAttractions = attractionList.filter(attraction => attraction.name.toLowerCase().includes(parkNameFilter.value.toLowerCase()));
        console.log(tempfilteredAttractions)
        filteredAttractions.splice(0,filteredAttractions.length);
        tempfilteredAttractions.forEach(attraction => filteredAttractions.push(attraction));
        totalPages = Math.ceil(filteredAttractions.length / cardsPerPage);
        update(filteredAttractions.splice(0,cardsPerPage))
    });

});

function GFG(array, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}

// Event listener for "Previous" button 
prevButton.addEventListener('click', () => {
	if (currentPage > 1) { 
		currentPage--; 
        const currentPageData = GFG(filteredAttractions, currentPage, cardsPerPage);
        deleteCard()
        update(currentPageData);
	} 
}); 

// Event listener for "Next" button 
nextButton.addEventListener('click', () => { 
	if (currentPage < totalPages-1) { 
        console.log(currentPage+"/"+totalPages)
		currentPage++; 
        const currentPageData = GFG(filteredAttractions, currentPage, cardsPerPage);
    	deleteCard()
        update(currentPageData);
    } 
}); 

function deleteCard(){
    const test = document.querySelector(".attractionInfo")
    for (let index = 0; index < cardsPerPage; index++) {
        const test2 = document.querySelector(".attractionCard")
        try{
            test.removeChild(test2)}
        catch{
            console.log("cant remove")
        } 
    } 
}

function update(cardsList){
    console.log(cardsList);
    cardsList.forEach(attraction => addAttraction(attraction));
}


pageLinks.forEach((link) => { 
	link.addEventListener('click', (e) => { 
		e.preventDefault(); 
		const page = parseInt(link.getAttribute('data-page')); 
		if (page !== currentPage) { 
			currentPage = page; 
			const currentPageData = GFG(filteredAttractions, currentPage, cardsPerPage);
    	    deleteCard()
            update(currentPageData);
		} 
	}); 
}); 
