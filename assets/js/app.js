document.addEventListener("DOMContentLoaded",()=>{

console.log("Projeto Quintal Vivo iniciado.");

const links=document.querySelectorAll(".nav-link");

links.forEach(link=>{

link.addEventListener("click",()=>{

const menu=document.querySelector(".navbar-collapse");

if(menu.classList.contains("show")){

new bootstrap.Collapse(menu).hide();

}

});

});

});
