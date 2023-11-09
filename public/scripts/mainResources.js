
let id = ""
main = function () {
  document.getElementById("first").onclick = (event) => {
    window.open('index.html')
  }
  document.getElementById("second").onclick = (event) => {
    window.open('resources.html');
  }
  document.getElementById("third").onclick = (event) => {
    window.open('template.html');
  }
  param = window.location.search.split("=")
  if (param[0] == "?county") {
    countyName = param[1].replace(/%20/g, ' ').toLowerCase();
    spaceIndex = countyName.indexOf(' ')
    if (spaceIndex != -1) {
      countyName = countyName.slice(0, spaceIndex + 1) + countyName[spaceIndex + 1].toUpperCase() + countyName.slice(spaceIndex + 2);
    }
    countyName = countyName.slice(0, 1).toUpperCase() + countyName.slice(1);
    id = countyName;
    document.getElementById("changingTitle").innerHTML = countyName + " County"
  }
  loadData();
}


async function loadData() {
  try {
    const response = await fetch(`http://localhost:3030/resources/county/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    console.log(Object.keys(data).length);
    const fragment = new DocumentFragment();

    for (let j = 0; j < Object.keys(data).length; j++) {

      fragment.appendChild(createCard(data[j]));
    }
    document.getElementById('all-cards').appendChild(fragment);

  } catch (error) {
    console.error('Error fetching resources:', error);
  }
};


function createDivElement(classes, text) {
  const div = document.createElement('div');

  if (classes.length)
    div.classList.add(...classes);

  if (text)
    div.innerHTML = text;

  return div;
}
function createCard(item) {
  const agencyName = item.agency_name.toLowerCase();

  let icon = "";
  if (item.taxonomy_category == "Basic Needs") {
    icon = 'school'
  } 


  const colIcon = createDivElement(['col-1'], `<span class="material-symbols-outlined">${icon}</span>`);
  const colTitle = createDivElement(['col-3'], agencyName);
  const colType = createDivElement(['col-4'], item.taxonomy_name);
  const colLink = createDivElement(['col-4'], `<a href=${item.service_website}>${item.service_website}</a>`);

  const row = createDivElement(['row']);
  row.appendChild(colIcon);
  row.appendChild(colTitle);
  row.appendChild(colType);
  row.appendChild(colLink);

  const cardBody = createDivElement(['card-body']);
  cardBody.appendChild(row);


  const card = createDivElement(['card']);
  card.onclick = (event) => {
    window.open('template.html?id=' + item.taxonomy_code + "+" + item.agency_id + "+" + item.site_id);
  }
  card.appendChild(cardBody);

  const outer = createDivElement(['col-12']);
  outer.appendChild(card);

  return outer;
}



$('.carousel').carousel()

$(document).ready(function () {
  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  main();
});