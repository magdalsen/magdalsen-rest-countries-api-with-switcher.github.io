import '../css/style.css'

const container = document.querySelector<HTMLDivElement>('.container');
const select = document.querySelector<HTMLSelectElement>('#countries');

// start page
const arrCountries: string[] = ['germany', 'usa', 'brazil', 'iceland', 'afghan', 'Åland', 'albania', 'algeria'];
type Data = { 
  flags: {
    svg: HTMLImageElement;
  }
  name: { 
    common: string; 
  };
  population: number;
  region: string;
  capital: string[];
}[]

const dataBox = (json: Data) => {
  return `
    <section class="data__box">
       <img src=${json[0].flags.svg} class="data__box--flag" />
       <div class="data__box--name">${json[0].name.common}</div>
       <div class="data__box--details">${json[0].population}</div>
       <div class="data__box--details">${json[0].region}</div>
       <div class="data__box--details">${json[0].capital}</div>
    </section>
    `
}

arrCountries.map((country) => {
   fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then((response) => response.json())
  .then((json) => {
    if(container) {
      container.innerHTML += dataBox(json);
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
  population: number;
  region: string;
  capital: string[];
}[]

const dataBoxAll = (json: DataAll) => {
  return `
    <section class="data__box">
       <img src=${json.flags.svg} class="data__box--flag" />
       <div class="data__box--name">${json.name.common}</div>
       <div class="data__box--details">${json.population}</div>
       <div class="data__box--details">${json.region}</div>
       <div class="data__box--details">${json.capital}</div>
    </section>
    `
}

const selectFn = (output: string) => {
  fetch(`https://restcountries.com/v3.1/region/${output}`)
.then((response) => response.json())
.then((json:[]) => {
  if(container) {
    json.map(el => {
      container.innerHTML += dataBoxAll(el);
    })
  }
})
}

if(select) {
  select.addEventListener('change', function() {
    const output = select.options[select.selectedIndex].value;
    if (container) {
      container.innerHTML = '';
    }
    selectFn(output);
  })
}

// input (search)
