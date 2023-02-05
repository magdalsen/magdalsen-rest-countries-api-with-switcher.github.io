import '../css/style.css'

const container = document.querySelector<HTMLDivElement>('.container');
const select = document.querySelector<HTMLSelectElement>('#countries');
const search = document.querySelector<HTMLInputElement>('#search');
const box = document.createElement('section');
const inputs = document.querySelector('.country-inputs');
const darkMode = document.querySelector('.dark__mode');

// dark mode
if (darkMode) {
  darkMode.addEventListener('click', function() {
    const element = document.body;
    element.classList.toggle('dark-mode');
  })
}

// start page
const arrCountries: string[] = ['germany', 'usa', 'brazil', 'iceland', 'afghan', 'Åland', 'albania', 'algeria'];
type Data = { 
  languages: { [s: string]: unknown; } | ArrayLike<unknown>; //jaki typ?
  subregion: string
  flags: {
    svg: HTMLImageElement;
  }
  name: { 
    common: string; 
    nativeName: {
      official: any;
    }
  };
  ccn3: string;
  population: number;
  region: string;
  capital: string[];
  tld: [];
  currencies: [];
  borders: [];
}[]

const dataBox = (json: Data) => {
  box.classList.add('data__box');
  box.innerHTML = `
    <img src=${json[0].flags.svg} class="data__box--flag" />
    <div class="data__box--name">${json[0].name.common}</div>
    <div class="data__box--details"><span>Population:</span> ${json[0].population}</div>
    <div class="data__box--details"><span>Region:</span> ${json[0].region}</div>
    <div class="data__box--details"><span>Capital:</span> ${json[0].capital}</div>
  `
  return box;
}

arrCountries.map((country) => {
   fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then((response) => response.json())
  .then((json: Data) => {
    if(container) {
      box.setAttribute('id', json[0].ccn3);
      container.appendChild(dataBox(json).cloneNode(true));
      details(json);
    }
  })
})

// details
const borderCountries = (el: DataAll) => {
  let borderArr = el.borders;
  if (el.borders === undefined) {
    return 'none';
  } else {
    return borderArr.map(el => {
      return `<button type="button" class="button__right">${el}</button>`;
    })
  }
};

const detailsData = (el: DataAll) => {
  const toArrayNativeName = Object.entries(el.name.nativeName);
  const toArrayCurrencies = Object.entries(el.currencies);
  const toArrayLanguages = Object.entries(el.languages);
  let newArrLanguages: unknown[] = []; //jaki typ?
  toArrayLanguages.forEach(el => {
    return newArrLanguages.push(el[1])
  });
  return `
    <section class="details__container--flag"><button type="button"><a class="back__button" href="/"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">
    <path fill="#000000" d="M6.293 13.707l-5-5c-0.391-0.39-0.391-1.024 0-1.414l5-5c0.391-0.391 1.024-0.391 1.414 0s0.391 1.024 0 1.414l-3.293 3.293h9.586c0.552 0 1 0.448 1 1s-0.448 1-1 1h-9.586l3.293 3.293c0.195 0.195 0.293 0.451 0.293 0.707s-0.098 0.512-0.293 0.707c-0.391 0.391-1.024 0.391-1.414 0z"></path>
    </svg>&nbsp;&nbsp; <span>Back</span></a></button></section>
    <section class="details__container--data">
      <img class="details__flag" src="${el.flags.svg}" />
      <section class="details__data--right">
      <div class="details__data--name">${el.name.common}</div>
      <div class="details__data--data">
        <div>
          <div class="details__data"><span>Native name:</span> ${toArrayNativeName[0][1].official}</div>
          <div class="details__data"><span>Population:</span> ${el.population}</div>
          <div class="details__data"><span>Region:</span> ${el.region}</div>
          <div class="details__data"><span>Sub Region:</span> ${el.subregion}</div>
          <div class="details__data"><span>Capital:</span> ${el.capital}</div>
        </div>
        <div>
          <div class="details__data"><span>Top Level Domain:</span> ${el.tld}</div>
          <div class="details__data"><span>Currencies:</span> ${toArrayCurrencies[0][0]}</div>
          <div class="details__data"><span>Languages:</span> ${newArrLanguages}</div>
        </div>
      </div>
      <div>
        <div class="details__data details__data--border"><span>Border countries:</span> ${borderCountries(el)}</div>
      </div>
      </section>
    </section>
  `;
}

const details = (json: Data) => {
  json.forEach(el => {
    document.getElementById(el.ccn3)?.addEventListener('click', function() {

      // przykład:
      // const list = ['first', 'second', 'third'];
      // element.classList.add(...list);
      
      if (inputs) inputs.innerHTML = '';
      if (container) {
        container.classList.toggle('details__container');
        container.innerHTML = detailsData(el);
      }
    })
  })
}

// select
interface DataAll {
  languages: { [s: string]: unknown; } | ArrayLike<unknown>;
  subregion: string;
  flags: {
    svg: HTMLImageElement;
  }
  name: { 
    common: string; 
    nativeName: {
      official: any;
    }
  };
  ccn3: string;
  population: number;
  region: string;
  capital: string[];
  tld: [];
  currencies: [];
  borders: [];
}[]

const dataBoxAll = (json: DataAll) => {
  box.classList.add('data__box');
  box.innerHTML = `
       <img src=${json.flags.svg} class="data__box--flag" />
       <div class="data__box--name">${json.name.common}</div>
       <div class="data__box--details"><span>Population:</span> ${json.population}</div>
       <div class="data__box--details"><span>Region:</span> ${json.region}</div>
       <div class="data__box--details"><span>Capital:</span> ${json.capital}</div>
    `
    return box;
}

const selectFn = (url: string, output: string) => {
  fetch(`${url}${output}`)
  .then((response) => response.json())
  .then((json: Data) => {
  if(container) {
    json.map((el) => {
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