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

class Sprite{
  constructor({position, velocity, color = 'red', offset}){
    //now we pass through both properties through the object argument we created
    this.position = position
    //very important in games
    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.lastKey

    this.attackbox = {
      position:{
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 100,
      height: 50
    }

    this.color = color
    this.isAttacking
    this.health = 100;
  }

  draw(){
    c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
    
    //draw attackbox
    if(this.isAttacking){
    c.fillStyle = 'green'
    c.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width, this.attackbox.height)
    }
  }

  update(){
    this.draw()
    this.attackbox.position.x = this.position.x - this.attackbox.offset.x
    this.attackbox.position.y = this.position.y
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if(this.position.y + this.height + this.velocity.y >= canvas.height){
      this.velocity.y = 0
    }
    //in canvas, the top left corner is 0,0
    else{
      this.velocity.y += gravity
    }
  }

  attack(){
    this.isAttacking = true
    setTimeout(() =>{
      this.isAttacking = false;
    }, 100)
    //after 100ms, isAttacking will be false
  }
}

const player = new Sprite({
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
  }
})

const enemy = new Sprite({
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

function rectangularCollision({rectangle1, rectangle2}){
  return(
    rectangle1.attackbox.position.x + rectangle1.attackbox.width >= rectangle2.position.x 
    && rectangle1.attackbox.position.x <= rectangle2.position.x + rectangle2.width
    && rectangle1.attackbox.position.y + rectangle1.attackbox.height >= rectangle2.position.y
    && rectangle1.attackbox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

let timer = 60
let timerID

function determineWinner({player, enemy, timerID}){
  clearTimeout(timerID)
  document.querySelector('#display-text').style.display = 'flex'
  if(player.health === enemy.health){
    document.querySelector('#display-text').innerHTML = 'TIE'
  }
  else if(player.health > enemy.health){
    document.querySelector('#display-text').innerHTML = 'PLAYER 1 WINS'
  }
  else if(enemy.health > player.health){
    document.querySelector('#display-text').innerHTML = 'PlAYER 2 WINS'
  }
}

function decreaseTimer(){
  timerID = setTimeout(decreaseTimer, 1000)
  //calls itself
  if(timer > 0){
    timer--
    document.querySelector('#timer').innerHTML = timer
  }
  if(timer === 0){
    determineWinner({player, enemy, timerID})
  }
}

decreaseTimer()

function animate(){
  window.requestAnimationFrame(animate)
  //which frame to loop over and over
  //recursive animation loop
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  if(keys.a.pressed && player.lastKey === 'a'){
    player.velocity.x = -2
  }
  else if(keys.d.pressed && player.lastKey === 'd'){
    player.velocity.x = 2
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
    player.health -= 20
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