const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

const btn = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");

const colorPanel = document.querySelector("#colorPanel")
const body = document.querySelector("body")
const colorCode = document.querySelector("#colorCode")

//btn.addEventListener('click', () =>{})

btn.addEventListener('click', ChangeColor)
btn2.addEventListener('click', RandomColor)
btn3.addEventListener('click', RandomHEX)

function ChangeColor(){
    let index = Math.floor((colors.length * Math.random()))
    console.log(index, colors[index])
    colorPanel.style.backgroundColor = colors[index];
    colorCode.innerHTML = colors[index];
}


function RandomColor(){
    let red = Math.floor(Math.random() * 255)
    let green = Math.floor(Math.random() * 255)
    let blue = Math.floor(Math.random() * 255)
    console.log(red,green,blue)

    let colorString="rgba("+red+","+green+","+blue+")"
    console.log(colorString)

    colorPanel.style.backgroundColor = colorString;
    colorCode.innerHTML = colorString;
}

function RandomHEX(){
    let red = Math.floor(Math.random() * 255)
    let green = Math.floor(Math.random() * 255)
    let blue = Math.floor(Math.random() * 255)
    
    console.log(red.toString(16))

    let colorString="#" + red.toString(16) + green.toString(16) + blue.toString(16)
   console.log(colorString)

   colorPanel.style.backgroundColor = colorString;
   colorCode.innerHTML = colorString;
}
