let id = "";
let taxonomy_category = "none";
let query = "none";
let queryType = "agency_name"
let order = "none"
let selection = "all"

main = function () {
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
    if (spaceIndex != -1) {
      countyName = countyName.slice(0, spaceIndex + 1) + countyName[spaceIndex + 1].toUpperCase() + countyName.slice(spaceIndex + 2);
    }
    countyName = countyName.slice(0, 1).toUpperCase() + countyName.slice(1);
    id = countyName;
    document.getElementById("changingTitle").innerHTML = countyName + " County"
  }
  loadBar();
  document.getElementById("enableSort").onclick = (event) => {
    if (order == "none") {
      order = "A+";
      document.getElementById("enableSort").classList.add(["color-tertiary"])
      loadData(`/${taxonomy_category}/${query}/${queryType}/${order}/${selection}`);
    } else {
      order = "none";
      document.getElementById("enableSort").classList.remove(["color-tertiary"])
      loadData(`/${taxonomy_category}/${query}/${queryType}/${order}/${selection}`);
    }
  }
  document.getElementById("sortDirection").onclick = (event) => {
    if (order == "A+") {
      order = "A-";
      loadData(`/${taxonomy_category}/${query}/${queryType}/${order}/${selection}`);
    } else if (order == "A-") {
      order = "A+";
      loadData(`/${taxonomy_category}/${query}/${queryType}/${order}/${selection}`);
    } else {
      order = "none";
      loadData(`/${taxonomy_category}/${query}/${queryType}/${order}/${selection}`);
    }
  }
  document.getElementById("printButton").onclick = (event) => {
    window.print();
  }
  document.getElementById("radioName").onclick = (event) => {
    document.getElementById("radioDescription").classList.remove(["active"]);
    document.getElementById("radioName").classList.add(["active"]);
    queryType = "agency_name";
  }
  document.getElementById("radioDescription").onclick = (event) => {
    document.getElementById("radioName").classList.remove(["active"]);
    document.getElementById("radioDescription").classList.add(["active"]);
    queryType = "service_description";
  }
  document.getElementById("filterButton").onclick = (event) => {
    if (document.getElementById("filterInput").value) {
      query = document.getElementById("filterInput").value;
    } else {
      query = "none";
    }
    console.log([taxonomy_category, query, queryType, order, selection])
    loadData(`/${taxonomy_category}/${query}/${queryType}/${order}/${selection}`);
  }
  loadData();
}

async function loadBar() {
  const taxCats = ["Education", "Basic Needs", "Consumer Services", "Criminal Justice and Legal Services", "Environment and Public Health_Safety", "Health Care", "Income Support and Employment", "Individual and Family Life",
    "Mental Health and Substance Use Disorder Services", "Organizational_Community_International Services"];
  taxCats.forEach(function (taxCat) {
    if (taxCat == "Education") {
      icon = 'school'
      colorName = 'rgb(217, 131,26)';
      iconTitle = "Education";
    } else if (taxCat == "Basic Needs") {
      icon = 'home'
      colorName = 'rgb(0, 0,0)';
      iconTitle = "Basic Needs";
    } else if (taxCat == "Consumer Services") {
      icon = 'contract_edit'
      colorName = 'rgb(74, 75,77)';
      iconTitle = "Consumer Services";
    } else if (taxCat == "Criminal Justice and Legal Services") {
      icon = 'local_police'
      colorName = 'rgb(0, 30,222)';
      iconTitle = "Criminal Justice and Legal Services";
    } else if (taxCat == "Environment and Public Health_Safety") {
      icon = 'source_environment'
      colorName = 'rgb(11, 161,88)';
      iconTitle = "Environment and Public Health/Safety";
    } else if (taxCat == "Health Care") {
      icon = 'health_and_safety'
      colorName = 'rgb(161, 11,11)';
      iconTitle = "Health Care";
    } else if (taxCat == "Income Support and Employment") {
      icon = 'payments'
      colorName = 'rgb(114, 156,100)';
      iconTitle = "Income Support and Employment";
    } else if (taxCat == "Individual and Family Life") {
      icon = 'diversity_1'
      colorName = 'rgb(11, 93,161)';
      iconTitle = "Individual and Family Life";
    } else if (taxCat == "Mental Health and Substance Use Disorder Services") {
      icon = 'stress_management'
      colorName = 'rgb(51, 176,138)';
      iconTitle = "Mental Health and Substance Use Disorder Services";
    } else if (taxCat == "Organizational_Community_International Services") {
      icon = 'volunteer_activism'
      colorName = 'rgb(166, 41, 155)';
      iconTitle = "Community Services";
    }

    const colIcon = document.createElement('button');
    colIcon.classList.add('col-1', 'colIcon');
    colIcon.innerHTML = `<span style="color:${colorName};" class="material-symbols-outlined">${icon}</span>`;
    colIcon.onclick = (event) => {
      taxonomy_category = taxCat;
      loadData(`/${taxonomy_category}/${query}/${queryType}/${order}/${selection}`);
    }
    const colText = document.createElement('button');
    colText.classList.add('col-1', 'colIcon');
    colText.innerHTML = `${iconTitle}`;
    colText.onclick = (event) => {
      taxonomy_category = taxCat;
      loadData(`/${taxonomy_category}/${query}/${queryType}/${order}/${selection}`);
    }
    document.getElementById("filterRow1").appendChild(colIcon);
    document.getElementById("filterRow2").appendChild(colText);
  })


}

async function loadData(filter = "") {
  document.getElementById('all-cards').innerHTML = "<div class='d-flex justify-content-center'><span class='material-symbols-outlined'>hourglass_empty</span></div><div class='d-flex justify-content-center'>Loading...</div>"
  try {
    const host = window.location.host;
    const response = await fetch(`http://${host}/resources/county/${id}${filter}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    console.log(Object.keys(data).length);
    const fragment = new DocumentFragment();
    const printTableBody = document.getElementById("printInsert");
    printTableBody.innerHTML = "";

    for (let j = 0; j < Object.keys(data).length; j++) {

      fragment.appendChild(createCard(data[j]));
      printTableBody.append(createTableRow(data[j]));
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
function iconChecker(item) {
  let icon = "";
  let colorName = "";
  const agencyName = item.agency_name.toLowerCase();


  if (item.taxonomy_category == "Education") {
    icon = 'school'
    colorName = 'rgb(217, 131,26)';
  } else if (item.taxonomy_category == "Basic Needs") {
    icon = 'home'
    colorName = 'rgb(0, 0,0)';

  } else if (item.taxonomy_category == "Consumer Services") {
    icon = 'contract_edit'
    colorName = 'rgb(74, 75,77)';

  } else if (item.taxonomy_category == "Criminal Justice and Legal Services") {
    icon = 'local_police'
    colorName = 'rgb(0, 30,222)';

  } else if (item.taxonomy_category == "Environment and Public Health/Safety") {
    icon = 'source_environment'
    colorName = 'rgb(11, 161,88)';

  } else if (item.taxonomy_category == "Health Care") {
    icon = 'health_and_safety'
    colorName = 'rgb(161, 11,11)';

  } else if (item.taxonomy_category == "Income Support and Employment") {
    icon = 'payments'
    colorName = 'rgb(114, 156,100)';

  } else if (item.taxonomy_category == "Individual and Family Life") {
    icon = 'diversity_1'
    colorName = 'rgb(11, 93,161)';

  } else if (item.taxonomy_category == "Mental Health and Substance Use Disorder Services") {
    icon = 'stress_management'
    colorName = 'rgb(51, 176,138)';

  } else if (item.taxonomy_category == "Organizational/Community/International Services") {
    icon = 'volunteer_activism'
    colorName = 'rgb(166, 41, 155)';

  }

  const colIcon = createDivElement(['col-1'], `<span style="color:${colorName};" class="material-symbols-outlined">${icon}</span>`);
  return colIcon;

}

function createCard(item) {
  const agencyName = item.agency_name.toLowerCase();

  const row = createDivElement(['row']);
  colIcon = iconChecker(item);
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

function createTableRow(data) {
  const row = document.createElement("tr");

  const icon = document.createElement("th");
  icon.innerHTML = iconChecker(data).innerHTML;
  row.appendChild(icon);

  const resourceName = document.createElement("th");
  resourceName.innerHTML = data.agency_name;
  row.appendChild(resourceName);

  const resourceType = document.createElement("th");
  resourceType.innerHTML = data.taxonomy_name;
  row.appendChild(resourceType);

  const website = document.createElement("th");
  website.innerHTML = data.service_website;
  row.appendChild(website);

  const contact = document.createElement("th");
  contact.innerHTML = data.site_number;
  row.appendChild(contact);

  const address = document.createElement("th");
  address.innerHTML = data.address_1;
  row.appendChild(address);
  
  return row;
}

document.addEventListener('DOMContentLoaded', (event) => {
  main();
});