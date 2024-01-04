const API_URL = "https://digi-api.com/api/v1/digimon/";
let nameDigimonDefault = "agumon";

renderizarUnDigimon(nameDigimonDefault);

async function renderizarUnDigimon(nameDigimonDefault) {
  const digimon = await fetch(API_URL + nameDigimonDefault).then((res) =>
    res.json()
  );
  let { id, name, attributes, descriptions, images, levels, fields, types } =
    digimon;
  document.getElementById("imagen_digimon").src = images[0].href;

  document.getElementById("id_digimon").innerHTML = id;
  document.getElementById("nombre_digimon").innerHTML = name;
  document.getElementById("descripcion_digimon").innerHTML =
    descriptions[0].description;
  document.getElementById("nivel_digimon").innerHTML = levels[0].level;
  document.getElementById("tipo_digimon").innerHTML = types[0].type;
}

//imagen[0].src = digimon.images.href;

/* console.log(digimon);

console.log(id, name, attributes, descriptions, images, levels, types); */

function buscarDigimon(event) {
  event.preventDefault();
  console.log(event);
  const input = event.target[0];
  let searchValue = input.value;
  if (searchValue.length == 0) {
    return;
  }
  nameDigimonDefault = searchValue.toLowerCase();
  renderizarUnDigimon(nameDigimonDefault);
}
listarDigimons();
async function listarDigimons() {
  const digimons = await fetch(API_URL).then((res) => res.json());
  for (let dig of digimons["content"]) {
    let template = `
      <article class="encabezado_digimon">
        <img class="imagen_digimon" src="${dig.image}" alt="" />
        <p id="${dig.id}">${dig.id}</p>
        <h3 class="nombre_digimon">${dig.name}</h3>
      </article> 
    `;

    document.getElementById("card_digimon").innerHTML += template;
  }
}
