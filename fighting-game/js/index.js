const canvas = document.querySelector('canvas')
//selected from html elements
//querySelector is method of element, finds first that matches css selector
const c = canvas.getContext('2d');
//returns drawing context on canvas

canvas.width = 1024
canvas.height = 567
//16x9 ratio
//css can also resize

c.fillRect(0, 0, canvas.width, canvas.height);
//x pos, y pos, width, height, draws rectangle on canvas

const gravity = 0.2

const background1 = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './images/background/background_layer_1.png'
})

const background2 = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './images/background/background_layer_2.png'
})

const background3 = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './images/background/background_layer_3.png'
})

const shop = new Sprite({
  position: {
    x: 600,
    y: 246
  },
  imageSrc: './images/decorations/shop_anim.png',
  scale: 2.5,
  framesMax: 6
})

const player = new Fighter({
  position: {
  x:0,
  y:0
  //this puts an object in the constructor
  //notice how this defines the position, not explicit
  },
  //puts x and y equal to the position object
  velocity: {
    x:0,
    y:0
  },
  offset: {
    x:0,
    y:0
  },
  imageSrc: 'images/character/Sprites/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
    //calcualted of course
  },
  sprites: {
    idle:{
      imageSrc: 'images/character/Sprites/Idle.png',
      framesMax: 8
    },
    run:{
      imageSrc: 'images/character/Sprites/Run.png',
      framesMax: 8
    },
    jump:{
      imageSrc: 'images/character/Sprites/Jump.png',
      framesMax: 2
    }
  }
})

const enemy = new Fighter({
  position: {
  x:400,
  y:0
  },
  velocity: {
    x:0,
    y:0
  },
  offset: {
    x:50,
    y:0
  },
  color: 'blue'
  //comma and colon are syntax of setting variables in js
})


console.log(player)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },

  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  }
}

let lastKey

decreaseTimer()

function animate(){
  window.requestAnimationFrame(animate)
  //which frame to loop over and over
  //recursive animation loop
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background1.update()
  background2.update()
  background3.update()
  shop.update()
  player.update()
  // enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  if(keys.a.pressed && player.lastKey === 'a'){
    player.velocity.x = -2
    player.switchSprite('run')
  }
  else if(keys.d.pressed && player.lastKey === 'd'){
    player.velocity.x = 2
    player.switchSprite('run')
  }
  else{
    player.switchSprite('idle')
  }
  if(player.velocity.y < 0){
    player.switchSprite('jump')
  }
  //player movement

  if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
    enemy.velocity.x = -2
  }
  else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
    enemy.velocity.x = 2
  }
  //enemy movement

  if(
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking
  ){
    player.isAttacking = false
    //only one hit when collide
    enemy.health -= 20
    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    //selects the id we created in index.html
  }

  if(
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking
  ){
    enemy.isAttacking = false
    player.health -= 10
    document.querySelector('#playerHealth').style.width = player.health + '%'
  }

  if(enemy.health <= 0 || player.health <= 0){
    determineWinner({player, enemy, timerID})
  }
  //end the game based on health
}

animate()

window.addEventListener('keydown', (event)=>{
  //notice how this is an arrow function, which omits the return keyword
  //listens for whenever key pressed
  switch(event.key){
    //grab the key we are pressing, and do something depending on the case
    case 'd':
      keys.d.pressed = true
      player.lastKey = 'd'
      break
    case 'a':
      keys.a.pressed = true
      player.lastKey = 'a'
      break
    case 'w':
      if(player.position.y > (canvas.height - player.height))
      player.velocity.y = -10
      break
    case ' ':
      player.attack()
      break

    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      enemy.lastKey = 'ArrowRight'
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      enemy.lastKey = 'ArrowLeft'
      break
    case 'ArrowUp':
      if(enemy.position.y > (canvas.height - enemy.height)){
      enemy.velocity.y = -10
      }
      break
    case 'm':
      enemy.attack()
      break
  }
  console.log(event.key)
  //finds what caused the event
})

window.addEventListener('keyup', (event)=>{
  switch(event.key){
    //player keys
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 'w':
      keys.w.pressed = false
      break

    //enemy keys
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
    case 'ArrowUp':
      keys.ArrowUp.pressed = false
      break
  }
  console.log(event.key)
})