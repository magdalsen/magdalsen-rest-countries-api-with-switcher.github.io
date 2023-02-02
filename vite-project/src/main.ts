import '../css/style.css'

const container = document.querySelector<HTMLDivElement>('.container');
const select = document.querySelector<HTMLSelectElement>('#countries');
const search = document.querySelector<HTMLInputElement>('#search');
const box = document.createElement('section');
const inputs = document.querySelector('.country-inputs');
const backBtn = document.createElement('button');

// start page
const arrCountries: string[] = ['germany', 'usa', 'brazil', 'iceland', 'afghan', 'Åland', 'albania', 'algeria'];
type Data = { 
  flags: {
    svg: HTMLImageElement;
  }
  name: { 
    common: string; 
  };
  ccn3: string;
  population: number;
  region: string;
  capital: string[];
}[]

const dataBox = (json: Data) => {
  box.classList.add('data__box');
  box.innerHTML = `
    <img src=${json[0].flags.svg} class="data__box--flag" />
    <div class="data__box--name">${json[0].name.common}</div>
    <div class="data__box--details">${json[0].population}</div>
    <div class="data__box--details">${json[0].region}</div>
    <div class="data__box--details">${json[0].capital}</div>
  `
  return box;
}

const details = (json: Data) => {
  json.forEach(el => {
    document.getElementById(el.ccn3)?.addEventListener('click', function() {
      backBtn.setAttribute('type', 'button');
      backBtn.innerHTML = `
        <a href="/">Back</a>
      `;
      if (container) {
        if (inputs) inputs.innerHTML = '';
        container.style.display = 'block';
        container.innerHTML = `
          <div>${el.name.common}</div>
        `;
        container.appendChild(backBtn);
      }
    })
  })
}

arrCountries.map((country) => {
   fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then((response) => response.json())
  .then((json: Data) => {
    if(container) {
      // container.innerHTML += dataBox(json);
      box.setAttribute('id', json[0].ccn3);
      container.appendChild(dataBox(json).cloneNode(true));
      details(json);
    }
  })
})

// select
interface DataAll {
  flags: {
    svg: HTMLImageElement;
  }
  name: { 
    common: string; 
  };
  ccn3: string;
  population: number;
  region: string;
  capital: string[];
}[]

const dataBoxAll = (json: DataAll) => {
  box.classList.add('data__box');
  box.innerHTML = `
       <img src=${json.flags.svg} class="data__box--flag" />
       <div class="data__box--name">${json.name.common}</div>
       <div class="data__box--details">${json.population}</div>
       <div class="data__box--details">${json.region}</div>
       <div class="data__box--details">${json.capital}</div>
    `
    return box;
}

const selectFn = (url: string, output: string) => {
  fetch(`${url}${output}`)
.then((response) => response.json())
.then((json) => {
  if(container) {
    json.map((el: DataAll) => {
      // container.innerHTML += dataBoxAll(el);
      box.setAttribute('id', el.ccn3);
      container.appendChild(dataBoxAll(el).cloneNode(true));
      details(json);
    })
  }
})
}

if(select) {
  select.addEventListener('change', function() {
    const output = select.options[select.selectedIndex].value;
    const url = 'https://restcountries.com/v3.1/region/';
    if (container) {
      container.innerHTML = '';
    }
    selectFn(url, output);
  })
}

// input (search)
if(search) {
    search.addEventListener('change', function() {
    const output = search.value;
    const url = 'https://restcountries.com/v3.1/name/';
    if (container) {
      container.innerHTML = '';
    }
    if (output === '' || output === ',' || output === '.' || output === ';') {
      container!.style.display = 'block';
      container!.innerHTML = "Search by country name! Don't use special chars.";
      return
    }
    selectFn(url, output);
  })
}