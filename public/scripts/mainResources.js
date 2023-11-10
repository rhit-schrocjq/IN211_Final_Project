
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
  loadBar();
}

async function loadBar(){
const taxCats = ["Education", "Basic Needs","Consumer Services","Criminal Justice and Legal Services","Environment and Public Health/Safety", "Health Care", "Income Support and Employment","Individual and Family Life",
"Mental Health and Substance Use Disorder Services","Organizational/Community/International Services"];
taxCats.forEach(function (taxonomy_category){
  if (taxonomy_category == "Education") {
    icon = 'school'
    colorName = 'rgb(217, 131,26)';
  } 
  if (taxonomy_category == "Basic Needs"){
    icon = 'home'
    colorName = 'rgb(0, 0,0)';

  }
  if (taxonomy_category == "Consumer Services"){
    icon = 'contract_edit'
    colorName = 'rgb(74, 75,77)';

  }
  if (taxonomy_category == "Criminal Justice and Legal Services"){
    icon = 'local_police'
    colorName = 'rgb(0, 30,222)';

  }
  if (taxonomy_category == "Environment and Public Health/Safety"){
    icon = 'source_environment'
    colorName = 'rgb(11, 161,88)';

  }
  if (taxonomy_category == "Health Care"){
    icon = 'health_and_safety'
    colorName = 'rgb(161, 11,11)';

  }
  if (taxonomy_category == "Income Support and Employment"){
    icon = 'payments'
    colorName = 'rgb(114, 156,100)';

  }
  if (taxonomy_category == "Individual and Family Life"){
    icon = 'diversity_1'
    colorName = 'rgb(11, 93,161)';

  }
  if (taxonomy_category == "Mental Health and Substance Use Disorder Services"){
    icon = 'stress_management'
    colorName = 'rgb(51, 176,138)';

  }
  if (taxonomy_category == "Organizational/Community/International Services"){
    icon = 'volunteer_activism'
    colorName = 'rgb(166, 41, 155)';

  }

  const colIcon =   createAElement(['col-2'], `<span id="child" style="color:${colorName};" class="material-symbols-outlined">${icon}</span>`);
  document.getElementById("menuBar").appendChild(colIcon);
  colIcon.onclick = (event) => {
    filterSelection(`${taxonomy_category}`);
  }
})
 
  
}
async function filterSelection(taxonomy_category){
    document.getElementById('all-cards').innerHTML="";
    try {
      const response = await fetch(`http://localhost:3030/resources/county/$}`);
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
}


async function loadData() {
  try {
    const host = window.location.host;
    const response = await fetch(`http://${host}/resources/county/${id}`);
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
function createAElement(classes, text) {
  const a = document.createElement('a');

  if (classes.length)
    a.classList.add(...classes);

  if (text)
    a.innerHTML = text;

  return a;
}
function iconChecker(item,row){
  let icon = "";
  let colorName = "";
  const agencyName = item.agency_name.toLowerCase();


  if (item.taxonomy_category == "Education") {
    icon = 'school'
    colorName = 'rgb(217, 131,26)';
  } 
  if (item.taxonomy_category == "Basic Needs"){
    icon = 'home'
    colorName = 'rgb(0, 0,0)';

  }
  if (item.taxonomy_category == "Consumer Services"){
    icon = 'contract_edit'
    colorName = 'rgb(74, 75,77)';

  }
  if (item.taxonomy_category == "Criminal Justice and Legal Services"){
    icon = 'local_police'
    colorName = 'rgb(0, 30,222)';

  }
  if (item.taxonomy_category == "Environment and Public Health/Safety"){
    icon = 'source_environment'
    colorName = 'rgb(11, 161,88)';

  }
  if (item.taxonomy_category == "Health Care"){
    icon = 'health_and_safety'
    colorName = 'rgb(161, 11,11)';

  }
  if (item.taxonomy_category == "Income Support and Employment"){
    icon = 'payments'
    colorName = 'rgb(114, 156,100)';

  }
  if (item.taxonomy_category == "Individual and Family Life"){
    icon = 'diversity_1'
    colorName = 'rgb(11, 93,161)';

  }
  if (item.taxonomy_category == "Mental Health and Substance Use Disorder Services"){
    icon = 'stress_management'
    colorName = 'rgb(51, 176,138)';

  }
  if (item.taxonomy_category == "Organizational/Community/International Services"){
    icon = 'volunteer_activism'
    colorName = 'rgb(166, 41, 155)';

  }
 
  

  const colIcon = createDivElement(['col-1'], `<span style="color:${colorName};" class="material-symbols-outlined">${icon}</span>`);
  return colIcon;
   

}
function createCard(item) {
  const agencyName = item.agency_name.toLowerCase();

  const row = createDivElement(['row']);
  colIcon = iconChecker(item,row);
  row.appendChild(colIcon);
  const colTitle = createDivElement(['col-4'], '<h4 class="fw-bold p-0 m-0 color-primary">'+ agencyName + '</h4>');
  const colType = createDivElement(['col-3'], 'Type: '+ item.taxonomy_name);
  const colContact = createDivElement(['col-4'], 'Contact: '+item.site_number);

  const newRow = createDivElement(['row']);
  const colLink = createDivElement(['col-7'], `<a href=${item.service_website}>${item.service_website}</a>`);
  const addressRow = createDivElement(['row']);
  const colAddress = createDivElement(['col-4'],'Address: '+item.address_1);

 
 
  row.appendChild(colTitle);
  row.appendChild(colType);
  row.appendChild(colContact);

  newRow.append(createDivElement(['col-1']));
  newRow.appendChild(colLink);
  newRow.appendChild(colAddress);
  

  const cardBody = createDivElement(['card-body']);
  cardBody.appendChild(row);
  cardBody.append(newRow);


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