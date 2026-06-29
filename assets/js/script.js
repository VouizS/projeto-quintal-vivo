// Menu Mobile
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("ativo");
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const alvo = document.querySelector(link.getAttribute("href"));
    if (alvo) alvo.scrollIntoView({behavior:"smooth"});
    if (nav) nav.classList.remove("ativo");
  });
});

const ano = document.getElementById("ano");
if (ano) ano.textContent = new Date().getFullYear();

// Animação ao rolar
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("show");
  });
},{threshold:0.15});

document.querySelectorAll(".card,.foto,section").forEach(el=>obs.observe(el));
