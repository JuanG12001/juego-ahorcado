import html from "./app.html?raw";
import { perdiste } from "./components/mensaje-perdiste";

let palabra = " ";
let intentos = 0;

export const App = (elementId) => {

  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
  })();


  const opciones = document.querySelector(".option__position");
  const game__option = document.querySelector(".game__option");
  const option__close = document.querySelector(".option__close");
  const game__star = document.querySelector(".game__star");
  const iniciar__juego = document.querySelector("#iniciar__juego");
  const star__position = document.querySelector(".star__position");
  const game__input = document.querySelector("#game__input");
  const winer__position = document.querySelector(".winer__position");
  const game__send = document.querySelector(".game__send");
  const winner = document.querySelector(".winner");
  const game__abc = document.querySelector(".game__abc");
  const incrementar = document.querySelector(".incrementar");
  const lost__position = document.querySelector(".lost__position");
  const lost = document.querySelector(".lost");
  const imagenes = document.querySelectorAll("img");
  const secret__text = document.querySelector('.secret__text')
  const secret__winner = document.querySelector('.secret__winner')
  const game__reload = document.querySelector('.game__reload')
  const nuevoElementoLi = document.createElement('li');

  //block
  game__input.disabled = true;
  game__send.disabled = true;
  game__reload.disabled = true;

  //listeners
  game__star.addEventListener('input',(event)=>{
    let inputValue = event.target.value;
    let filteredValue = inputValue.replace(/[^A-Za-z]/g, ''); 
    event.target.value = filteredValue; 
    event.target.value = filteredValue.toUpperCase();
    game__abc.innerHTML = '';
    const palabras = game__star.value.split(/\s+/);
    palabras.forEach(function(palabra) {
        if (palabra !== '') { 
            nuevoElementoLi.textContent = '_'.repeat(palabra.length); 
            game__abc.appendChild(nuevoElementoLi);
        }
    });
  })


  game__input.addEventListener('input',(event)=>{
    let inputValue = event.target.value;
    let filteredValue = inputValue.replace(/[^A-Za-z]/g, ''); 
    event.target.value = filteredValue; 
    event.target.value = filteredValue.toUpperCase();
  })

  game__option.addEventListener("click", () => {
    opciones.style.display = "inline";
    option__close.style.display = "inline";
  });

  option__close.addEventListener("click", () => {
    opciones.style.display = "none";
  });

  iniciar__juego.addEventListener("click", () => {
    if (game__star.value) {
      palabra = game__star.value;
      star__position.style.display = "none";
      game__send.disabled = false;
      game__input.disabled = false;
      game__reload.disabled = false;
      intentos = 0;
      incrementar.textContent = 0;
  
      
      game__abc.innerHTML = '';
      for (let i = 0; i < palabra.length; i++) {
        const nuevoElementoLi = document.createElement('li');
        nuevoElementoLi.textContent = '_';
        game__abc.appendChild(nuevoElementoLi);
      }
    }
  });

  game__send.addEventListener("click", () => {
    const letraIngresada = game__input.value.toUpperCase();
    let aciertos = 0; 
  
    if (game__input.value.length === palabra.length) {
      if (game__input.value === palabra) {
        winer__position.style.display = "inline";
        game__send.disabled = true;
        game__input.disabled = true;
        secret__winner.textContent = `"${palabra}"`;
        game__reload.disabled = true;
        return; 
      }
    }
  
    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i] === letraIngresada) {
        game__abc.children[i].textContent = letraIngresada;
        aciertos++;
      }
    }
  
    if (aciertos === 0) {
      intentos++;
      incrementar.textContent = intentos;
      imagenes[intentos].style.display = "inline";
  
      if (intentos === 7) {
        game__send.disabled = true;
        game__input.disabled = true;
        game__reload.disabled = true;
        secret__text.textContent = `"${palabra}"`;
        setTimeout(() => {
          game__abc.innerHTML = '';
          perdiste(intentos, lost__position, game__star, game__send, game__input, game__reload);
        }, 200);
      }
    } else {
      if (game__abc.textContent === palabra) {
        winer__position.style.display = "inline";
        game__send.disabled = true;
        game__input.disabled = true;
        secret__winner.textContent = `"${palabra}"`;
        game__reload.disabled = true;
      }
    }
  });

  game__reload.addEventListener('click',()=>{
      star__position.style.display = "inline";
      game__send.disabled = true;
      game__input.disabled = true;
      game__reload.disabled = true;
      game__star.value = "";
      game__input.value = "";
      intentos = 0;
      incrementar.textContent = 0;
      game__abc.innerHTML = '';
      imagenes.forEach((img) => (img.style.display = "none"));
  })

  winner.addEventListener("click", () => {
    if ((winer__position.style.display = "none")) {
      game__send.disabled = true;
      game__input.disabled = true;
      game__reload.disabled = true;
      game__star.value = "";
      game__input.value = "";
      star__position.style.display = "inline";
      imagenes.forEach((img) => (img.style.display = "none"));
      game__abc.innerHTML = '';
    }
  });

  lost.addEventListener("click", () => {
    if ((lost__position.style.display = "none")) {
      game__send.disabled = true;
      game__input.disabled = true;
      game__reload.disabled = true;
      game__star.value = "";
      game__input.value = "";
      star__position.style.display = "inline";
      imagenes.forEach((img) => (img.style.display = "none"));
      game__abc.innerHTML = '';
    }
  });


};
