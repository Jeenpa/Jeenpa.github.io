const Datos = [];

document.getElementById('btn').addEventListener('click', onSearch);

function onSearch() {
    let character = document.getElementById('nmr').value;

    fetch(`https://rickandmortyapi.com/api/character/${character}`)
    .then((response) => response.json())
    .then((data) => {
        if (data.name) {
            Datos.push(data);
            card();
        } else {
            window.alert('No hay personajes con ese ID');
        }
    })
    console.log(Datos);
}

function card(){
  let cont = document.getElementById('contenedor');
  cont.innerHTML = '';
  Datos.forEach((e)=> {
    return(
      cont.innerHTML += `
      <div class='card'>
        <button class='boton' onClick='borrar(${e.id})'>x</button>
        <div class='img'>
          <img src="${e.image}" alt="${e.name}">
        </div>
        <h2>${e.name}</h2>
        <p>${e.species}</p>
        <p>${e.status}</p>
        <p>${e.gender}</p>
      <div>
      ` 
    )      
  });
}


function borrar(id) {
  for (let i = 0; i < Datos.length; i++) {
    if (Datos[i].id === id) {
      Datos.splice(i, 1);
    }
  }
  card();
}
