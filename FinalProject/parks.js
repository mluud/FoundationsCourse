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

const img = document.getElementById("park-img");
const parkNameFull = document.getElementById("parkNameFull");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentParkID = 0;
changeInfo(currentParkID);

nextBtn.addEventListener('click', () => {
  prevBtn.disabled = false;
  currentParkID++;
  changeInfo(currentParkID);

  if(currentParkID==parks.length-1)
    nextBtn.disabled = true;
});

prevBtn.addEventListener('click', () => {
  nextBtn.disabled = false;
  currentParkID--;
  changeInfo(currentParkID);

  if(currentParkID==0)
    prevBtn.disabled = true;
});

function changeInfo(index){
    document.getElementById("park-img").src = parks[index].img;
    parkNameFull.textContent = parks[index].name;
}