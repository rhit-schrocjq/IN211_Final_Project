main = function () {

  document.getElementById("logoImage").onclick = (event) => {
    window.open('index.html')
  };
  document.querySelector("#first").onclick = (event) => {
    window.open('index.html')
  }
  document.querySelector("#second").onclick = (event) => {
    window.open('resources.html');
  }
  document.querySelector("#third").onclick = (event) => {
    window.open('template.html');
  }
  document.getElementById("bottomText").onclick = (event) => {
    document.getElementById("indianaMap").scrollIntoView();
  };
  document.getElementById("selectByCategory").onclick = (event) => {
    document.getElementById("bottom-cards").scrollIntoView();
  };
  const counties = [...document.getElementsByClassName("cls-1")];
  counties.forEach((county) => {
    county.onclick = (event) => {
      window.open('resources.html?county=' + county.id)
    }
  })
  const countyTexts = [...document.getElementsByClassName("small")];
  countyTexts.forEach((countyText) => {
    countyText.onclick = (event) => {
      window.open('resources.html?county=' + countyText.innerHTML)
    }
  })
  const searchButton = document.getElementById('searchCountyButton');
  const searchInput = document.getElementById('searchCountyInput');
  const searchDropdown = document.getElementById('searchCountyDropdown');
  // countySelectForm.onblur = (event) => {
  //   console.log("hi")
  //   searchDropdown.style.display = "none";
  // }
  searchInput.addEventListener('blur', function () {
    setTimeout(function () {
      // The currently focused element 
      if (document.activeElement != searchDropdown && document.activeElement != searchButton) {
        searchDropdown.style.display = "none";
      }
    }, 0);
  });
  searchDropdown.addEventListener('blur', function () {
    setTimeout(function () {
      // The currently focused element 
      if (document.activeElement != searchInput && document.activeElement != searchButton) {
        searchDropdown.style.display = "none";
      }
    }, 0);
  });
  searchButton.addEventListener('blur', function () {
    setTimeout(function () {
      // The currently focused element 
      if (document.activeElement != searchDropdown && document.activeElement != searchInput) {
        searchDropdown.style.display = "none";
      }
    }, 0);
  });
  searchButton.onclick = (event) => {
    if (searchDropdown.options[searchDropdown.selectedIndex]) {
      window.open('resources.html?county=' + searchDropdown.options[searchDropdown.selectedIndex].innerHTML);
    }
  }
  const host = window.location.host;
  searchInput.addEventListener('input', async function () {
    const inputValue = searchInput.value;
    if (inputValue) {
      try {
        const response = await fetch(`http://${host}/counties/${inputValue}`);
        const data = await response.json();
        searchDropdown.style.display = "initial";
        searchDropdown.innerHTML = "";
        let index = 0;
        data.forEach(county => {
          newOption = document.createElement("option");
          newOption.innerHTML = county;
          newOption.onclick = (event) => {
            window.open('resources.html?county=' + county)
          }
          if (index == 0) {
            newOption.selected = "selected";
          }
          searchDropdown.appendChild(newOption);
          index++;
        })
      } catch (error) {
        console.log("Error fetching Data: ", error)
      }
    }
  });
  const fragment = new DocumentFragment();
  taxCats = ["Education", "Basic Needs", "Consumer Services", "Criminal Justice and Legal Services", "Environment and Public Health/Safety", "Health Care", "Income Support and Employment", "Individual and Family Life",
    "Mental Health and Substance Use Disorder Services", "Community Services"];
  taxCats.forEach(function (taxonomy_category) {

    fragment.appendChild(createCard(taxonomy_category));
  });

  document.getElementById('bottom-cards').appendChild(fragment);

}

async function loadBar() {
  const taxCats = ["Education", "Basic Needs", "Consumer Services", "Criminal Justice and Legal Services", "Environment and Public Health/Safety", "Health Care", "Income Support and Employment", "Individual and Family Life",
    "Mental Health and Substance Use Disorder Services", "Organizational/Community/International Services"];
  taxCats.forEach(function (taxonomy_category) {
    if (taxonomy_category == "Education") {
      icon = 'school'
      colorName = 'rgb(217, 131,26)';
    }
    if (taxonomy_category == "Basic Needs") {
      icon = 'home'
      colorName = 'rgb(0, 0,0)';

    }
    if (taxonomy_category == "Consumer Services") {
      icon = 'contract_edit'
      colorName = 'rgb(74, 75,77)';

    }
    if (taxonomy_category == "Criminal Justice and Legal Services") {
      icon = 'local_police'
      colorName = 'rgb(0, 30,222)';

    }
    if (taxonomy_category == "Environment and Public Health/Safety") {
      icon = 'source_environment'
      colorName = 'rgb(11, 161,88)';

    }
    if (taxonomy_category == "Health Care") {
      icon = 'health_and_safety'
      colorName = 'rgb(161, 11,11)';

    }
    if (taxonomy_category == "Income Support and Employment") {
      icon = 'payments'
      colorName = 'rgb(114, 156,100)';

    }
    if (taxonomy_category == "Individual and Family Life") {
      icon = 'diversity_1'
      colorName = 'rgb(11, 93,161)';

    }
    if (taxonomy_category == "Mental Health and Substance Use Disorder Services") {
      icon = 'stress_management'
      colorName = 'rgb(51, 176,138)';

    }
    if (taxonomy_category == "Organizational/Community/International Services") {
      icon = 'volunteer_activism'
      colorName = 'rgb(166, 41, 155)';

    }

    const colIcon = createAElement(['col-2'], `<span id="child" style="color:${colorName};" class="material-symbols-outlined">${icon}</span>`);
    document.getElementById("menuBar").appendChild(colIcon);
    colIcon.onclick = (event) => {
      filterSelection(`${taxonomy_category}`);
    }
  })
}


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
function iconChecker(taxonomy_category, row) {
  let icon = "";
  let colorName = "";


  if (taxonomy_category == "Education") {
    icon = 'school'
    colorName = 'rgb(217, 131,26)';
  }
  if (taxonomy_category == "Basic Needs") {
    icon = 'home'
    colorName = 'rgb(0, 0,0)';

  }
  if (taxonomy_category == "Consumer Services") {
    icon = 'contract_edit'
    colorName = 'rgb(74, 75,77)';

  }
  if (taxonomy_category == "Criminal Justice and Legal Services") {
    icon = 'local_police'
    colorName = 'rgb(0, 30,222)';

  }
  if (taxonomy_category == "Environment and Public Health/Safety") {
    icon = 'source_environment'
    colorName = 'rgb(11, 161,88)';

  }
  if (taxonomy_category == "Health Care") {
    icon = 'health_and_safety'
    colorName = 'rgb(161, 11,11)';

  }
  if (taxonomy_category == "Income Support and Employment") {
    icon = 'payments'
    colorName = 'rgb(114, 156,100)';

  }
  if (taxonomy_category == "Individual and Family Life") {
    icon = 'diversity_1'
    colorName = 'rgb(11, 93,161)';

  }
  if (taxonomy_category == "Mental Health and Substance Use Disorder Services") {
    icon = 'stress_management'
    colorName = 'rgb(51, 176,138)';

  }
  if (taxonomy_category == "Community Services") {
    icon = 'volunteer_activism'
    colorName = 'rgb(166, 41, 155)';

  }
  const colIcon = createDivElement(['col-2'], `<span style="color:${colorName};" class="material-symbols-outlined">${icon}</span>`);
  return colIcon;


}
function createCard(taxonomy_category) {

  const row = createDivElement(['row'],);
  const bottomRow = createDivElement(['row']);

  const colIcon = iconChecker(taxonomy_category, row);
  const colTitle = createDivElement(['col-10'], '<p  class="fw-bold p-0 m-0 color-primary">'+ taxonomy_category + '</p>');

  row.appendChild(colIcon);
  row.appendChild(colTitle);


  const cardBody = createDivElement(['card-body']);

  cardBody.appendChild(row);
  cardBody.appendChild(bottomRow);


  const card = createDivElement(['card']);
  // card.onclick = (event) => {
  //   window.open('template.html?id=' + item.taxonomy_code + "+" + item.agency_id + "+" + item.site_id);
  // }
  card.appendChild(cardBody);

  const outer = createDivElement(['col-4']);
  outer.appendChild(card);

  return outer;
}












document.addEventListener('DOMContentLoaded', (event) => {
  main();
});