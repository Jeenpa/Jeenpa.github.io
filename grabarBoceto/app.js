let d = document;
let nmrGrid = undefined;
let color = "random";

function getColor(){
    let r = parseInt(Math.floor(Math.random() * 256));
    let g = parseInt(Math.floor(Math.random() * 256));
    let b = parseInt(Math.floor(Math.random() * 256));
    return `rgb(${r}, ${g}, ${b})`;
}

function loadColor(){
    if (color === "random") {
        return getColor();
    } else{
        return color;
    }
}

function createGrid(numberOfGrids = 16) {
    for (let i = 0; i < numberOfGrids; i++) {
        const gridRow = d.createElement("div");
        gridRow.classList.add("grid-row");
        d.querySelector(".container").appendChild(gridRow);

        for (let j = 0; j < numberOfGrids; j++) {
            const gridBox = d.createElement("div");
            gridBox.classList.add("grid-box");
            
            gridBox.addEventListener("mouseover", e =>{
                e.target.style = `background-color: ${loadColor()}`;
            });
            gridRow.appendChild(gridBox);
        }
    }  
}

createGrid(nmrGrid);


d.addEventListener("click", e => {
    console.log(e.target);
    if(e.target.matches("#change") || e.target.matches("#change *")){
        nmrGrid = prompt("Ingrese la cantidad para la cuadricula del 1 al 100");

        if(nmrGrid > 0 && nmrGrid < 100){
            d.querySelector(".container").innerHTML = "";
            createGrid(nmrGrid);
        } else{
            alert("Ingrese una cantidad de cuadriculas validas entre 1 y 100");
        }
    }

    if(e.target.matches("#restart") || e.target.matches("#restart *")){
        d.querySelector(".container").innerHTML = "";
        createGrid(nmrGrid);
    }

    if(e.target.matches("#random") || e.target.matches("#random *")){
        color = "random";
    }

});

d.querySelector("#color").addEventListener("change", e => {
    color = e.target.value;
    console.log(color);
});