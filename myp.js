const add= document.getElementById("add");
const main= document.getElementById("main");
const content= document.getElementById("text");
const display= document.getElementById("display");
let option;
let bi;
let n1;

const form= document.getElementById("info");

window.onload = function(){
    const savedText = localStorage.getItem("myText"); 
    if (savedText) {
        main.innerHTML= savedText; 
    }
};

form.addEventListener("submit", addUser);

function addUser(e){
    e.preventDefault();
    const newText = content.value.trim(); 
    if (newText) {
        main.innerHTML += `<p>${newText}</p>`;

        localStorage.setItem("myText", main.innerHTML);

        content.value = "";
    }
};

const b1= document.getElementById("changeBC");
const b2= document.getElementById("Magic");
const b3= document.getElementById("ChangeFont");
const b4= document.getElementById("changeBI");
const b5= document.getElementById("textcolor");
const b6 =document.getElementById("reset");
const b7= document.getElementById("increase");
const b8= document.getElementById("decrease");


b1.addEventListener("click", (e) => {
    document.body.style.backgroundImage= "none";
    document.body.style.backgroundColor= "#"+ Math.floor(Math.random()* 16777215).toString(16);
});


b2.addEventListener("click", Magic);


function Magic(e){
    option= prompt("Do you want to apply the background color to your writing space? y/n");
    if(option === "y"){
        main.addEventListener("mousemove", MagicF);
    }else{
        main.style.backgroundColor= "transparent";
    }
};

function MagicF(e){
    main.style.backgroundColor= "rgb("+ e.offsetX+", "+e.offsetY+", "+ 100+ " )";
    main.style.color= "rgb(64, 236, 248)";
};

b3.addEventListener("click", changeText);

let arr=['Arial', 'Times', 'Calibri', 'monospace', 'fantasy', 'Cambria', 'Verdana'];
function changeText(){
    let inx= Math.round(Math.random()*(arr.length-1));
    main.style.fontFamily= `${arr[inx]}`;
}


b4.addEventListener("click", changeImage);


(async function handleapi(){
    await fetch("https://api.unsplash.com/search/photos?query=3D Renders&client_id=FQvyvTS6zHrTZzIwO7R1cKdde-VW1QHxU2_xM-fLKug")
    .then(res => res.json().then(r => bi=r.results));
}) ();

function changeImage(){
    let index= Math.round(Math.random()*9);
    document.body.style.backgroundImage= `url('${bi[index].links.download}')`;
    document.body.style.backgroundSize= "cover";
};


b5.addEventListener("click", changeColor);

function changeColor(){
    main.style.color= "#"+ Math.floor(Math.random()* 16777215).toString(16);
}

b6.addEventListener("click", reset);

function reset(){
    const exit= prompt("Do you want to remove your entered text permanently? y/n");
    const exitstyle= prompt("Do you want to remove your styling? y/n");

    if(exit==="y"){
        localStorage.removeItem("myText");
        main.innerText= "";
    };

    if(exitstyle==="y"){
        document.body.style.backgroundColor= "#32174d";
        document.body.style.backgroundImage= "none";
        main.style.fontFamily= "Arial";
        main.style.fontSize = "16px";
        main.style.color= "black";
        main.removeEventListener("mousemove",MagicF);
        main.style.backgroundColor= "transparent";
    }
}

b7.addEventListener("click", increaseSize);
let size= 16;
function increaseSize(){
    size++;
    main.style.fontSize= `${size}px`;
}

b8.addEventListener("click", decreaseSize);

function decreaseSize(){
    size--;
    main.style.fontSize= `${size}px`;
}









