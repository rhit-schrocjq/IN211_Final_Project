main = function () {
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

}

document.addEventListener('DOMContentLoaded', (event) => {
  main();
});