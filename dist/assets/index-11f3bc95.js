(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))c(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerpolicy&&(s.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?s.credentials="include":a.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const i=document.querySelector(".container"),d=document.querySelector("#countries"),l=document.querySelector("#search"),o=document.createElement("section"),u=document.querySelector(".country-inputs"),p=document.querySelector(".dark__mode");p&&p.addEventListener("click",function(){document.body.classList.toggle("dark-mode")});const m=["germany","usa","brazil","iceland","afghan","Åland","albania","algeria"],f=t=>(o.classList.add("data__box"),o.innerHTML=`
    <img src=${t[0].flags.svg} class="data__box--flag" />
    <div class="data__box--name">${t[0].name.common}</div>
    <div class="data__box--details"><span>Population:</span> ${t[0].population}</div>
    <div class="data__box--details"><span>Region:</span> ${t[0].region}</div>
    <div class="data__box--details"><span>Capital:</span> ${t[0].capital}</div>
  `,o);m.map(t=>{fetch(`https://restcountries.com/v3.1/name/${t}`).then(e=>e.json()).then(e=>{i&&(o.setAttribute("id",e[0].ccn3),i.appendChild(f(e).cloneNode(!0)),v(e))})});const g=t=>{let e=t.borders;return t.borders===void 0?"none":e.map(n=>`<button type="button" class="button__right">${n}</button>`)},b=t=>{const e=Object.entries(t.name.nativeName),n=Object.entries(t.currencies),c=Object.entries(t.languages);let a=[];return c.forEach(s=>a.push(s[1])),`
    <section class="details__container--flag"><button type="button"><a class="back__button" href="http://${document.location.host}"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">
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
          <div class="details__data"><span>Currencies:</span> ${n[0][0]}</div>
          <div class="details__data"><span>Languages:</span> ${a}</div>
        </div>
      </div>
      <div>
        <div class="details__data details__data--border"><span>Border countries:</span> ${g(t)}</div>
      </div>
      </section>
    </section>
  `},v=t=>{t.forEach(e=>{var n;(n=document.getElementById(e.ccn3))==null||n.addEventListener("click",function(){u&&(u.innerHTML=""),i&&(i.classList.toggle("details__container"),i.innerHTML=b(e))})})},h=t=>(o.classList.add("data__box"),o.innerHTML=`
       <img src=${t.flags.svg} class="data__box--flag" />
       <div class="data__box--name">${t.name.common}</div>
       <div class="data__box--details"><span>Population:</span> ${t.population}</div>
       <div class="data__box--details"><span>Region:</span> ${t.region}</div>
       <div class="data__box--details"><span>Capital:</span> ${t.capital}</div>
    `,o),_=(t,e)=>{fetch(`${t}${e}`).then(n=>n.json()).then(n=>{i&&n.map(c=>{o.setAttribute("id",c.ccn3),i.appendChild(h(c).cloneNode(!0)),v(n)})})};d&&d.addEventListener("change",function(){const t=d.options[d.selectedIndex].value,e="https://restcountries.com/v3.1/region/";i&&(i.innerHTML=""),_(e,t)});l&&l.addEventListener("change",function(){const t=l.value,e="https://restcountries.com/v3.1/name/";if(i&&(i.innerHTML=""),t===""||t===","||t==="."||t===";"){i.style.display="block",i.innerHTML="Search by country name! Don't use special chars.";return}_(e,t)});
