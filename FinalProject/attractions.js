

let stars = 
    document.getElementsByClassName("star");
let output = 
    document.getElementById("output");

    function gfg(n) {
      remove();
      for (let i = 0; i < n; i++) {
          if (n == 1) cls = "one";
          else if (n == 2) cls = "two";
          else if (n == 3) cls = "three";
          else if (n == 4) cls = "four";
          else if (n == 5) cls = "five";
          stars[i].className = "star " + cls;
      }
      output.innerText = "Rating is: " + n + "/5";
  }
 
  function remove() {
    let i = 0;
    while (i < 5) {
        stars[i].className = "star";
        i++;
    }
}

// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

// window.onclick = function (event) {
//   if (!event.target.matches('.dropbtn')) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }

// function myFunction1() {
//   document.getElementById("myDropdown1").classList.toggle("show");
// }

// window.onclick = function (event) {
//   if (!event.target.matches('.dropbtn')) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }



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

async function getAttractions(park)
{
    const response = await fetch(`https://api.themeparks.wiki/v1/entity/${park?.id}/children`);
    const attractions = (await response.json()).children.filter(child => child.entityType === "ATTRACTION"); 

    attractions.forEach(attraction => attractionList.push({name: attraction.name, park: park.name}));
    filteredAttractions.splice(0,filteredAttractions.length);
    attractionList.forEach(attraction => filteredAttractions.push(attraction));
    return;
}

async function getAndShowAttractions(){
    for(const park of parks){
        await getAttractions(park);
    }
}

getAndShowAttractions();

// filter and show  park
document.addEventListener("DOMContentLoaded", (_e) => {
    const parksFilter = document.querySelector(".parksFilter");
    parksFilter.add

    parks.forEach(park => {
        const parkOption = document.createElement("option");
        parkOption.value = park.name;
        parkOption.text = park.name;
        parksFilter.appendChild(parkOption);
    });

    parksFilter.addEventListener("change", (e) => {

        const tempfilteredAttractions = attractionList.filter(attraction => parksFilter.value === "all" || attraction.park === parksFilter.value);
        console.log(tempfilteredAttractions)
        filteredAttractions.splice(0,filteredAttractions.length);
        tempfilteredAttractions.forEach(attraction => filteredAttractions.push(attraction));

        const attractionsFilter = document.querySelector(".attractionsFilter");

        //clear child
        filteredAttractions.forEach( attraction => {
            attractionsFilter.remove(0);
        });

        // add child
        filteredAttractions.forEach( attraction => {
            const parkOption = document.createElement("option");
            parkOption.value = attraction.name;
            parkOption.text = attraction.name;
            attractionsFilter.appendChild(parkOption);
        });
    });
});

