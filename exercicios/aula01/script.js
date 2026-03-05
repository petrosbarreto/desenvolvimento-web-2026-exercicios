window.onload = function() {
    console.log("Bem-vindo ao meu portfólio!");
};

const tituloPrincipal = document.querySelector('header h1');

tituloPrincipal.addEventListener('mouseover', function() {
    tituloPrincipal.style.color = '#2e8b57'; 
});

tituloPrincipal.addEventListener('mouseout', function() {
    tituloPrincipal.style.color = '#4b0082'; 
});