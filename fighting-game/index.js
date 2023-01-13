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
  constructor({position, velocity}){
    //now we pass through both properties through the object argument we created
    this.position = position
    //very important in games
    this.velocity = velocity
    this.height = 150
  }

  draw(){
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, 50, this.height)
  }

  update(){
    this.draw()
    this.position.y += this.velocity.y

    if(this.position.y + this.height + this.velocity.y >= canvas.height){
      this.velocity.y = 0
    }
    //in canvas, the top left corner is 0,0
    else{
      this.velocity.y += gravity
    }
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
  }
})

const enemy = new Sprite({
  position: {
  x:400,
  y:100
  },
  velocity: {
    x:0,
    y:0
  }
})


console.log(player)

function animate(){
  window.requestAnimationFrame(animate)
  //which frame to loop over and over
  //recursive animation loop
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()
}

animate()