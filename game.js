const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time')
const spanTime2 = document.querySelector('#time2')
const spanRecord = document.querySelector('#record')
const pResult = document.querySelector('#result')
let intro = document.getElementById('intro')
let after = document.getElementById('after')
let btn = document.getElementById('btn')

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
  x: undefined,
  y: undefined,
};

const gifPosition = {
  x: undefined,
  y: undefined,
}

let enemiesPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
/* resize manda a llamar a este evento que es cuando se cambia de tamaño, esto con el fin de que cada que cambiemos de tamaño se ajuste al tamaño de nuestros dibujos, cuando esto se ejecuta mandamos yamar a la funcion setCanvasSize */

function setCanvasSize() {
  /* del tamaño de nuestra altura siempre y cuando sea mayor a nuestro ancho le decimos que el canvas */
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }
  canvasSize = Number(canvasSize.toFixed(0));

  canvas.setAttribute('width', canvasSize);
  /* agregamos el tamaño que hemos dispuesto para el canvas */
  canvas.setAttribute('height', canvasSize);
  /* setattribute borra lo que este dentro al cambiar */
  
  elementsSize = canvasSize / 10;
  /* del tamaño del canvas lo divido entre 10 para obtener el tamaño de todo lo que tengo que poner dentro en este caso 10 bombas */
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
  /* llamamos a la funcion de star game, de tal forma que primero establecemos los tamaños y despues empezamos el juego */
}

function startGame() {
  console.log({ canvasSize, elementsSize });
  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[level];
  if(!map){
    gamewin();
    return;
  }
  if (!timeStart) {
    timeStart = Date.now()
    timeInterval = setInterval(showTime,100)
    showRecord();
  }
  /* el metodo split nos devuelve un arreglo donde cada espacio va a hacer la separacion*/
  /* la funcion trim nos ayuda a limpiar espacios en blanco al inicio y final */
  const mapRows = map.trim().split('\n');
  /* console.log(mapRow); */

  /* ahora tenemos un arreglo y no un string por ello no podemos utilizar trim */
  /* recorro el arreglo modificando y limpiando primero los strings y luego separando letra por letra*/
  const mapRowCol = mapRows.map(row => row.trim().split(''));
  /* console.log(mapRowCol); */
  console.log({map, mapRows, mapRowCol});
  
  showLives();

  enemiesPositions = [];
  game.clearRect(0,0,canvasSize, canvasSize);

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
      /* desimos que solo le vamos a dar este valor una ves cuando sea puerta y ademas player position nunca haya sido utilizada es decir solo si es undefined va a estrar al if si no lo es va dejar los valores que ya se tienen */
      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          /* damos los valores de la puerta a la calavera */
          console.log(playerPosition);
        } 
      }else if(col == 'I'){
        gifPosition.x = posX;
        gifPosition.y = posY  
      }else if(col == 'X'){
        enemiesPositions.push({
          x: posX,
          y: posY,
        })
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
  const giftcolisionX = playerPosition.x.toFixed(3) == gifPosition.x.toFixed(3);
  const giftcolisionY = playerPosition.y.toFixed(3) == gifPosition.y.toFixed(3);
  const gifcolision = giftcolisionX && giftcolisionY;
  
  if (gifcolision) {
    levelWin();
  }

  const enemyCollision = enemiesPositions.find(enemy => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  if (enemyCollision) {
    levelFail();
  }
  game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
  console.log(playerPosition.x, playerPosition.y)
}

function levelWin() {
  console.log('subiste de nivel');
  level++;
  startGame()
}

function levelFail(){
  lives--;
  console.log(lives);
  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined
  }
  playerPosition.x = undefined;
  playerPosition.y =  undefined;
  startGame();
}
/* corazones vidas */
function showLives(){
  /* super prototipos */
  /* creamos un arreglo del tamaño de vidas y le metemos los emojis */
  const heartsArray = Array(lives).fill(emojis['HEART']); // [1,2,3]
  
  spanLives.innerHTML = "";
  heartsArray.forEach(heart => spanLives.append(heart));
  /* spanLives.innerHTML = emojis['HEART'].repeat(lives); */
}

function showTime(){
  spanTime.innerHTML = Date.now() - timeStart;
  spanTime2.innerHTML = Date.now() - timeStart;
}
function showRecord(){
  spanRecord.innerHTML = localStorage.getItem("record_time")
}


function gamewin() {
  const recordTime = localStorage.getItem('record_time');
  const playerTime = Date.now() - timeStart;
  console.log({recordTime, playerTime})

  console.log('Terminaste el juego')  
  clearInterval(timeInterval);
  if (recordTime) {
    if (recordTime >= playerTime ) {
      localStorage.setItem('record_time',playerTime)
      pResult.innerHTML="superaste el record";
    }else{
      pResult.innerHTML="lo siento no superaste el record";
    }
  }else{
    localStorage.setItem('record_time',playerTime)
    pResult.innerHTML="primera vez :)";
  }
  intro.style.display = "none";
  after.style.display = "flex";


}

window.addEventListener('keydown',moveByKeys);
/* keydown escucha al momento de tocar keyup al momento de haber tocado y levantar */
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

btn.addEventListener('click',reiniciarJuego);

function reiniciarJuego(){
  intro.style.display = "flex";
  after.style.display = "none";
  level = 0;
  lives = 3;
  timeStart = undefined
  playerPosition.x = undefined;
  playerPosition.y =  undefined;
  startGame();
}

function moveByKeys(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();
}
function moveUp() {
  console.log('Me quiero mover hacia arriba');

  if ((playerPosition.y - elementsSize) < elementsSize) {
    console.log('OUT');
  } else {
    playerPosition.y -= elementsSize;
    startGame();
  }
}
function moveLeft(){
  if ((playerPosition.x - elementsSize) < elementsSize){
    console.log('out')
  }else{
    playerPosition.x -= elementsSize;
    startGame();
  }

  console.log("Me movere hacia Izquierda");
}
function moveRight(){
  if ((playerPosition.x + elementsSize) > canvasSize){
    console.log('out')
  }else{
    playerPosition.x += elementsSize;
  startGame();
  }
  console.log("Me movere hacia derecha");
}
function moveDown(){
  if ((playerPosition.y + elementsSize) > canvasSize){
    console.log('out')
  }else{
    playerPosition.y += elementsSize;
    startGame();
  }
  console.log("Me movere hacia abajo");
}