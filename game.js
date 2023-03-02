const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};

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

  const map = maps[0];
  /* el metodo split nos devuelve un arreglo donde cada espacio va a hacer la separacion*/
  /* la funcion trim nos ayuda a limpiar espacios en blanco al inicio y final */
  const mapRow = map.trim().split('\n')
  /* console.log(mapRow); */

  /* ahora tenemos un arreglo y no un string por ello no podemos utilizar trim */
  /* recorro el arreglo modificando y limpiando primero los strings y luego separando letra por letra*/
  const mapRowCol = mapRow.map(row => row.trim().split(''))
  /* console.log(mapRowCol); */

  /* forEach tambien le podemos pedir el numero del indice que se encuentra en este caso es rowI y colI */
  mapRowCol.forEach((row, rowI) => {
    /* es importante entender que en row lo que tenemos es un arreglo de arreglos, es decir accedemos a las filas */
    row.forEach((col, colI) => {
      /* en col por el contrario accedemos ya a cada elemento de cada fila y cada columna */
      const emoji = emojis[col];
      /* el indice empieza en 0 */
      const posX = elementsSize * (colI+1)
      const posY = elementsSize * (rowI+1)

      /* encontramos la posicion del jugador, para empezar donde esta la puerta */
      if (col == 'O'){
        playerPosition.x = posX;
        playerPosition.y = posY;
        /* damos los valores de la puerta a la calavera */
        console.log(playerPosition);
      };
      game.fillText(emoji,posX,posY)
      /* console.log({row,col}) */
    });
  });
/*   for (let  row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      game.fillText(emojis[mapRowCol[row-1][col-1]], elementsSize*col, ((elementsSize * row)-15));
    }
  } */
  /* escribimos donde esta la calabera le decimos que pase el emoji del jugador en la posicion de la puerta */
  movePlayer();
}

function movePlayer() {
  game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
}

window.addEventListener('keydown',moveByKeys);
/* keydown escucha al momento de tocar keyup al momento de haber tocado y levantar */
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
  /* console.log(event) */
  if (event.key == 'ArrowUp') {
    moveUp();
  }else if (event.key == 'ArrowLeft') {
    moveLeft();
  }else if (event.key == 'ArrowRight') {
    moveRight();
  }else if (event.key == 'ArrowDown') {
    moveDown();
  }
}
function moveUp(){
  playerPosition.y -= elementsSize;
  movePlayer();
  console.log("Me movere hacia arriba");
}
function moveLeft(){
  console.log("Me movere hacia Izquierda");
}
function moveRight(){
  console.log("Me movere hacia derecha");
}
function moveDown(){
  console.log("Me movere hacia abajo");
}