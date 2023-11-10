let taxonomy_category = "";
let query = "none";
let queryType = "none"
let order = "none"
let selection = "0-50"

main = function () {
  param = window.location.search.split("=")
  if (param[0] == "?taxonomy_category") {
    taxonomy_category = param[1].replace(/%20/g, ' ').toLowerCase();
    spaceIndex = taxonomy_category.indexOf(' ')
    if (spaceIndex != -1) {
      taxonomy_category = taxonomy_category.slice(0, spaceIndex + 1) + taxonomy_category[spaceIndex + 1].toUpperCase() + taxonomy_category.slice(spaceIndex + 2);
    }
    taxonomy_category = taxonomy_category.slice(0, 1).toUpperCase() + taxonomy_category.slice(1);
    id = taxonomy_category;
    document.getElementById("changingTitle").innerHTML = taxonomy_category 
  }
  
  document.getElementById("logoImage").onclick = (event) => {
    window.open('index.html')
  };
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
    console.log(spaceIndex)
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
    const host = window.location.host;
    console.log(taxonomy_category)
    const response = await fetch(`http://${host}/resources/taxonomy_category/${taxonomy_category}/A/${selection}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    console.log(Object.keys(data).length);
    const fragment = new DocumentFragment();

    for (let j = 0; j < Object.keys(data).length; j++) {

      fragment.appendChild(createCard(data[j]));
    }
    document.getElementById('all-cards').innerHTML = "";
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
function iconChecker(item, row) {
  let icon = "";
  let colorName = "";
  const agencyName = item.agency_name.toLowerCase();


  if (item.taxonomy_category == "Education") {
    icon = 'school'
    colorName = 'rgb(217, 131,26)';
  }
  if (item.taxonomy_category == "Basic Needs") {
    icon = 'home'
    colorName = 'rgb(0, 0,0)';

  }
  if (item.taxonomy_category == "Consumer Services") {
    icon = 'contract_edit'
    colorName = 'rgb(74, 75,77)';

  }
  if (item.taxonomy_category == "Criminal Justice and Legal Services") {
    icon = 'local_police'
    colorName = 'rgb(0, 30,222)';

  }
  if (item.taxonomy_category == "Environment and Public Health/Safety") {
    icon = 'source_environment'
    colorName = 'rgb(11, 161,88)';

  }
  if (item.taxonomy_category == "Health Care") {
    icon = 'health_and_safety'
    colorName = 'rgb(161, 11,11)';

  }
  if (item.taxonomy_category == "Income Support and Employment") {
    icon = 'payments'
    colorName = 'rgb(114, 156,100)';

  }
  if (item.taxonomy_category == "Individual and Family Life") {
    icon = 'diversity_1'
    colorName = 'rgb(11, 93,161)';

  }
  if (item.taxonomy_category == "Mental Health and Substance Use Disorder Services") {
    icon = 'stress_management'
    colorName = 'rgb(51, 176,138)';

  }
  if (item.taxonomy_category == "Organizational/Community/International Services") {
    icon = 'volunteer_activism'
    colorName = 'rgb(166, 41, 155)';

  }



  const colIcon = createDivElement(['col-1'], `<span style="color:${colorName};" class="material-symbols-outlined">${icon}</span>`);
  return colIcon;


}
function createCard(item) {
  const agencyName = item.agency_name.toLowerCase();

  const row = createDivElement(['row']);
  colIcon = iconChecker(item, row);
  row.appendChild(colIcon);
  const colTitle = createDivElement(['col-4'], '<h4 class="fw-bold p-0 m-0 color-primary">' + agencyName + '</h4>');
  const colType = createDivElement(['col-3'], 'Type: ' + item.taxonomy_name);
  const colContact = createDivElement(['col-4'], 'Contact: ' + item.site_number);

  const newRow = createDivElement(['row']);
  const colLink = createDivElement(['col-7'], `<a href=${item.service_website}>${item.service_website}</a>`);
  const addressRow = createDivElement(['row']);
  const colAddress = createDivElement(['col-4'], 'Address: ' + item.address_1);



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

document.addEventListener('DOMContentLoaded', (event) => {
  main();
});