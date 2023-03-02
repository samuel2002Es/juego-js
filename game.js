const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
/* resize manda a llamar a este evento que es cuando se cambia de tamaño, esto con el fin de que cada que cambiemos de tamaño se ajuste al tamaño de nuestros dibujos, cuando esto se ejecuta mandamos yamar a la funcion setCanvasSize */

function setCanvasSize() {
  /* del tamaño de nuestra altura siempre y cuando sea mayor a nuestro ancho le decimos que el canvas */
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  
  canvas.setAttribute('width', canvasSize);
  /* agregamos el tamaño que hemos dispuesto para el canvas */
  canvas.setAttribute('height', canvasSize);
  /* setattribute borra lo que este dentro al cambiar */
  
  elementsSize = ((canvasSize / 10)-1);
  /* del tamaño del canvas lo divido entre 10 para obtener el tamaño de todo lo que tengo que poner dentro en este caso 10 bombas */

  startGame();
  /* llamamos a la funcion de star game, de tal forma que primero establecemos los tamaños y despues empezamos el juego */
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[1];
  /* el metodo split nos devuelve un arreglo donde cada espacio va a hacer la separacion*/
  /* la funcion trim nos ayuda a limpiar espacios en blanco al inicio y final */
  const mapRow = map.trim().split('\n')
  console.log(mapRow);

  /* ahora tenemos un arreglo y no un string por ello no podemos utilizar trim */
  /* recorro el arreglo modificando y limpiando primero los strings y luego separando letra por letra*/
  const mapRowCol = mapRow.map(row => row.trim().split(''))
  console.log(mapRowCol);

  for (let  row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      game.fillText(emojis[mapRowCol[row-1][col-1]], elementsSize*col, ((elementsSize * row)-15));
    }
  }
}