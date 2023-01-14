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