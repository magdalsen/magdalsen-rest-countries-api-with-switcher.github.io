import '../css/style.css'

const container = document.querySelector<HTMLDivElement>('.container');

// get country data
const arrCountries: string[] = ['germany', 'usa', 'brazil', 'iceland', 'afghan', 'Åland', 'albania', 'algeria'];
type Test = { 
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

const dataBox = (json: Test) => {
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
      container.innerHTML+= dataBox(json);
    }
  })
})









// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
