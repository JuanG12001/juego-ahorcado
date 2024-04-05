export const perdiste = (intentos, lost__position, game__star) => {
 if(intentos === 7){
  lost__position.style.display = "inline";
  game__star.value = "";
  game__input.value = "";
  game__send.disabled = true;
  game__input.disabled = true;
 }

};