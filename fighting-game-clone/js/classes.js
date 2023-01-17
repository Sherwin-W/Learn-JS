class Sprite{
  constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}){
    //imageSrc passes through whenever a sprite is passed, so a image is created with each instance of sprite
    //default scale is 1
    this.position = position
    this.width = 50
    this.height = 150
    this.image = new Image()
    //creates html image inside javascript
    this.image.src = imageSrc
    this.scale = scale
    this.framesMax = framesMax
    this.frameCurrent = 0
    this.frameElapsed = 0
    //how many frames currently elapsed over entirely
    this.frameHold = 15
    //how many frames go though before change frame current
    this.offset = offset
    }

  draw(){
    c.drawImage(this.image,
      this.frameCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      //4 arguments for cropped animation
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      this.image.width / this.framesMax * this.scale,
      this.image.height * this.scale)
  }

  animateFrames(){
    this.frameElapsed++
    if(this.frameElapsed % this.frameHold === 0){
      if(this.frameCurrent < this.framesMax - 1){
        this.frameCurrent++
      }
      else{
        this.frameCurrent = 0;
      }
    }
  }

  update(){
    this.draw()
    this.animateFrames()
  }
}

class Fighter extends Sprite{
  constructor({position, velocity, color = 'red', imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}, sprites}){
    //now we pass through both properties through the object argument we created
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset
    })

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
    this.health = 100
    this.frameCurrent = 0
    this.frameElapsed = 0
    this.frameHold = 15
    this.sprites = sprites

    for(const sprite in this.sprites){
    //js for loop
    //sprite needs to be const for this syntax to work
      sprites[sprite].image = new Image()
      //sprite in this class references idle, run...
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }

  }

  update(){
    this.draw()
    this.animateFrames()
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

  switchSprite(sprite){
    switch(sprite){
      case 'idle':
        if(this.image !== this.sprites.idle.image){
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          this.frameCurrent = 0
          //stops flashes from jumping from 8 frame run to 2 frame jump
        }
        break
      case 'run':
        if(this.image !== this.sprites.run.image){
          this.image = this.sprites.run.image
          this.framesMax = this.sprites.run.framesMax
          this.frameCurrent = 0
        }
        break
        break
      case 'jump':
        if(this.image !== this.sprites.jump.image){
          this.image = this.sprites.jump.image
          this.framesMax = this.sprites.jump.framesMax
          this.frameCurrent = 0
        }
        break
    }
  }
}