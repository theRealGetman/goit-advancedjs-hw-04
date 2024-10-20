import{a as d,S as E,i as l}from"./assets/vendor-Qob_5Ba8.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const M="https://pixabay.com/api/",v="46495648-ca89e041c4cf307aa03db9722",m=15;d.defaults.baseURL=M;d.defaults.params={key:v,per_page:m,image_type:"photo",orientation:"horizontal",safesearch:!0};async function y(t,o=1){const s=await d.get("",{params:{q:t,page:o}});return{hits:s.data.hits,hasMore:o*m<s.data.totalHits}}const f=new E(".gallery a",{captionsData:"alt",captionDelay:250});function h(t){return t.map(o=>{const{webformatURL:s,largeImageURL:a,tags:e,likes:r,views:n,comments:S,downloads:q}=o;return`
            <li class="gallery-item">
                <a class="gallery-link" href="${a}">
                    <img class="gallery-image" src="${s}" data-source="${a}" alt="${e}" loading="lazy" />
                </a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        ${r}
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        ${n}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        ${S}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        ${q}
                    </p>
                </div>
            </li>
            `}).join("")}function P(){l.error({message:"Please enter a search query!",position:"topRight",timeout:3e3})}function R(){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3})}function p(){l.error({message:"Sorry, something went wrong. Please try again!",position:"topRight",timeout:3e3})}function g(){document.querySelector(".loader").style.display="block"}function b(){document.querySelector(".loader").style.display="none"}function $(){document.querySelector(".gallery").innerHTML=""}function I(t){document.querySelector(".gallery").innerHTML=h(t),f.refresh()}function O(t){document.querySelector(".gallery").insertAdjacentHTML("beforeend",h(t)),f.refresh(),T()}function w(){document.querySelector(".load-more").style.display="block"}function c(){document.querySelector(".load-more").style.display="none"}function L(){l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:3e3})}function T(){window.scrollBy({top:document.querySelector(".gallery-item").getBoundingClientRect().height*2,behavior:"smooth"})}const _=document.querySelector(".search-form");let i="",u=1;_.addEventListener("submit",async t=>{if(t.preventDefault(),u=1,i=document.querySelector("#search-box").value,i.trim()===""){P();return}g();try{const o=await y(i),s=o.hits;if($(),s.length===0){R();return}I(s),o.hasMore?w():(c(),L())}catch(o){console.log(o),p()}finally{b()}});document.querySelector(".load-more").addEventListener("click",async()=>{u+=1,g(),c();try{const t=await y(i,u);O(t.hits),t.hasMore?w():(c(),L())}catch(t){console.log(t),p()}finally{b()}});
//# sourceMappingURL=index.js.map
