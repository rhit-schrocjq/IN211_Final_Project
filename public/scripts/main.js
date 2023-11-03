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
}

document.addEventListener('DOMContentLoaded', (event) => {
  main();
});