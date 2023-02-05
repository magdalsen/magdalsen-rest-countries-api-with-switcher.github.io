(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))c(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerpolicy&&(n.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?n.credentials="include":a.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();const i=document.querySelector(".container"),r=document.querySelector("#countries"),l=document.querySelector("#search"),o=document.createElement("section"),u=document.querySelector(".country-inputs"),p=document.querySelector(".dark__mode");p&&p.addEventListener("click",function(){document.body.classList.toggle("dark-mode")});const g=["germany","usa","brazil","iceland","afghan","Åland","albania","algeria"],m=t=>(o.classList.add("data__box"),o.innerHTML=`
    <img src=${t[0].flags.svg} class="data__box--flag" />
    <div class="data__box--name">${t[0].name.common}</div>
    <div class="data__box--details"><span>Population:</span> ${t[0].population}</div>
    <div class="data__box--details"><span>Region:</span> ${t[0].region}</div>
    <div class="data__box--details"><span>Capital:</span> ${t[0].capital}</div>
  `,o);g.map(t=>{fetch(`https://restcountries.com/v3.1/name/${t}`).then(e=>e.json()).then(e=>{i&&(o.setAttribute("id",e[0].ccn3),i.appendChild(m(e).cloneNode(!0)),v(e))})});const f=t=>{let e=t.borders;return t.borders===void 0?"none":e.map(s=>`<button type="button" class="button__right">${s}</button>`)},b=t=>{const e=Object.entries(t.name.nativeName),s=Object.entries(t.currencies),c=Object.entries(t.languages);let a=[];return c.forEach(n=>a.push(n[1])),`
    <section class="details__container--flag"><button type="button"><a class="back__button" href="https://magdalsen.github.io/magdalsen-rest-countries-api-with-switcher.github.io/"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">
    <path fill="#000000" d="M6.293 13.707l-5-5c-0.391-0.39-0.391-1.024 0-1.414l5-5c0.391-0.391 1.024-0.391 1.414 0s0.391 1.024 0 1.414l-3.293 3.293h9.586c0.552 0 1 0.448 1 1s-0.448 1-1 1h-9.586l3.293 3.293c0.195 0.195 0.293 0.451 0.293 0.707s-0.098 0.512-0.293 0.707c-0.391 0.391-1.024 0.391-1.414 0z"></path>
    </svg>&nbsp;&nbsp; <span>Back</span></a></button></section>
    <section class="details__container--data">
      <img class="details__flag" src="${t.flags.svg}" />
      <section class="details__data--right">
      <div class="details__data--name">${t.name.common}</div>
      <div class="details__data--data">
        <div>
          <div class="details__data"><span>Native name:</span> ${e[0][1].official}</div>
          <div class="details__data"><span>Population:</span> ${t.population}</div>
          <div class="details__data"><span>Region:</span> ${t.region}</div>
          <div class="details__data"><span>Sub Region:</span> ${t.subregion}</div>
          <div class="details__data"><span>Capital:</span> ${t.capital}</div>
        </div>
        <div>
          <div class="details__data"><span>Top Level Domain:</span> ${t.tld}</div>
          <div class="details__data"><span>Currencies:</span> ${s[0][0]}</div>
          <div class="details__data"><span>Languages:</span> ${a}</div>
        </div>
      </div>
      <div>
        <div class="details__data details__data--border"><span>Border countries:</span> ${f(t)}</div>
      </div>
      </section>
    </section>
  `},v=t=>{t.forEach(e=>{var s;(s=document.getElementById(e.ccn3))==null||s.addEventListener("click",function(){u&&(u.innerHTML=""),i&&(i.classList.toggle("details__container"),i.innerHTML=b(e))})})},h=t=>(o.classList.add("data__box"),o.innerHTML=`
       <img src=${t.flags.svg} class="data__box--flag" />
       <div class="data__box--name">${t.name.common}</div>
       <div class="data__box--details"><span>Population:</span> ${t.population}</div>
       <div class="data__box--details"><span>Region:</span> ${t.region}</div>
       <div class="data__box--details"><span>Capital:</span> ${t.capital}</div>
    `,o),_=(t,e)=>{fetch(`${t}${e}`).then(s=>s.json()).then(s=>{i&&s.map(c=>{o.setAttribute("id",c.ccn3),i.appendChild(h(c).cloneNode(!0)),v(s)})})};r&&r.addEventListener("change",function(){const t=r.options[r.selectedIndex].value,e="https://restcountries.com/v3.1/region/";i&&(i.innerHTML=""),_(e,t)});l&&l.addEventListener("change",function(){const t=l.value,e="https://restcountries.com/v3.1/name/";if(i&&(i.innerHTML=""),t===""||t===","||t==="."||t===";"){i.style.display="block",i.innerHTML="Search by country name! Don't use special chars.";return}_(e,t)});
