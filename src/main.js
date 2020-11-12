'use strict'

let codersList = [
    {
        name: "Alejandra",
        active: true,
        profPic: "img/imgCoders/Alejandra.jpg"
    },
    {
        name: "Alvaro",
        active: true,
        profPic: "img/imgCoders/Alvaro.jpg"
    },
    {
        name: "Carmen",
        active: true,
        profPic: "img/imgCoders/Carmen.jpg"
    },
    {
        name: "Estefanie",
        active: true,
        profPic: "img/imgCoders/Estefanie.jpg"
    },
    {
        name: "Gabriel",
        active: true,
        profPic: "img/imgCoders/Gabriel.jpg"
    },
    {
        name: "Giacomo",
        active: true,
        profPic: "img/imgCoders/Giacomo.jpg"
    },
    {
        name: "Giselle",
        active: true,
        profPic: "img/imgCoders/Giselle.jpg"
    },
    {
        name: "Joan",
        active: true,
        profPic: "img/imgCoders/Joan.jpg"
    },
    {
        name: "Jorge",
        active: true,
        profPic: "img/imgCoders/Jorge.jpg"
    },
    {
        name: "Jose",
        active: true,
        profPic: "img/imgCoders/Jose.jpg"
    },
    {
        name: "Joseph",
        active: true,
        profPic: "img/imgCoders/Joseph.jpg"
    },
    {
        name: "Laura",
        active: true,
        profPic: "img/imgCoders/Laura.jpg"
    },
    {
        name: "Lorena",
        active: true,
        profPic: "img/imgCoders/Lorena.png"
    },
    {
        name: "Loredana",
        active: true,
        profPic: "img/imgCoders/Loredana.png"
    },
    {
        name: "Lucas",
        active: true,
        profPic: "img/imgCoders/Lucas.jpg"
    },
    {
        name: "Mercedes",
        active: true,
        profPic: "img/imgCoders/Mercedes.jpg"
    },
    {
        name: "Moises",
        active: true,
        profPic: "img/imgCoders/Moises.jpg"
    },
    {
        name: "Olga",
        active: true,
        profPic: "img/imgCoders/Olga.jpg"
    },
    {
        name: "Quim",
        active: true,
        profPic: "img/imgCoders/Quim.jpeg"
    },
    {
        name: "Rene",
        active: true,
        profPic: "img/imgCoders/Rene.jpg"
    },
    {
        name: "Sergio",
        active: true,
        profPic: "img/imgCoders/Sergio.jpg"
    },
    {
        name: "Vanessa",
        active: true,
        profPic: "img/imgCoders/Vanessa.png"
    },
    {
        name: "Jackson",
        active: true,
        profPic: "img/imgCoders/jackson.jpg"
    }
]

let arrCoderSelected = [];

const btnSacrifice = document.getElementById("btnSacrifice");
const coderNameSacrificed = document.getElementById("coderNameSacrificed");
const btnAddCoder = document.getElementById("btnAddCoder");
const codersDisplay = document.getElementById("coders");
const coderNameInput = document.getElementById("coderName");

window.onload = function todoListCoders() {
    for(let coder = 0; coder<codersList.length; coder++) {
        codersDisplay.innerHTML += createCoderCard(codersList[coder]);
    }
}

function CreateRandomNumber(){
    let numberRandom = Math.floor(Math.random() * codersList.length);
    return numberRandom;
}

function displaySacrificedImage(imgUrl){
    document.getElementById("imgDeadCoder").src = imgUrl;
}

function SelectCoder(coderList) {
    let deadCoderIndex = CreateRandomNumber();
    let selectedCoder = coderList[deadCoderIndex];

    if(selectedCoder.active == true) {
        selectedCoder.active = false;
        showDisabledCoder(selectedCoder.name);
        arrCoderSelected.push(coderList[deadCoderIndex]);
        displaySacrificedImage(selectedCoder.profPic);
        coderNameSacrificed.innerHTML = selectedCoder.name;
        return selectedCoder;
    }

    SelectCoder(codersList);
        
}

btnSacrifice.addEventListener('click', function () {
    if(arrCoderSelected.length < codersList.length) {
        SelectCoder(codersList);
    }
});

function addCoder() {
    let coderNameValue = getCoderNameInput();
    if(coderNameValue == ""){
        alert("Introduce nombre de Coder primero");
        return;
    }
    let newCoder = {
        name: coderNameValue,
        active: true,
        profPic: `img/imgCoders/${coderNameValue}.jpg`
    }
    codersDisplay.innerHTML += createCoderCard(newCoder);
    codersList.push(newCoder);
    clearCoderNameInput();
};

function clearCoderNameInput(){
    coderNameInput.value = "";
};

function createCoderCard(coder){
    return `
        <div class="coder" id="${coder.name}">
            <img 
                id="img${coder.name}"
                src="${coder.profPic}" 
                alt="Imagen de ${coder.name}" 
                onerror="this.onerror=null;this.src='./img/imgCoders/botonañadir.jpg';">
            <p class="coderName">${coder.name}</p>
            <button class="btnDeleteCoder">X</button>
        </div>`;
};

function deleteCoderCard(event){
    if (event.target && event.target.matches(".btnDeleteCoder")) {
        event.target.parentNode.remove();
        let coder = event.target.parentNode.id;
        let index = getCoderIndexByName(coder);
        codersList[index].active = false;
    }
};

function getCoderIndexByName(searchName){
    for(let i = 0; i < codersList.length; i++){
        if (codersList[i].name == searchName)
        return i;
    }
    console.log("Coder not found");
}

function getCoderNameInput(){
    return coderNameInput.value;
};

function showDisabledCoder(coderName){
    let coderNameId = "img" + coderName;
    document.getElementById(coderNameId).classList.add("disabledCoder");
};

btnAddCoder.addEventListener('click', addCoder);

codersDisplay.addEventListener('click', function(event){
    deleteCoderCard(event);
});