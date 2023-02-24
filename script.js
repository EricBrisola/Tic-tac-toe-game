const boardPlayerX = []
const boardPlayerO = []
let currentPlayer = 'X'

const possibleWins = [
  ['0', '1', '2'],
  ['0', '3', '6'],
  ['0', '4', '8'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '4', '5'],
  ['6', '7', '8'],
  ['2', '4', '6']
]

const allPositions = document.querySelectorAll('.game-btn')
allPositions.forEach((eachBtn) => eachBtn.addEventListener('click', game))

/*------------------------------------------------------Game functions---------------------------------------*/

function game (position) 
{     
    const player = document.querySelector('#players-turn')
    const playerXName = document.querySelector('#player-1').value
    const playerOName = document.querySelector('#player-2').value
    
    if(playerXName === '' || playerOName === '')
   {
     alert('Insert your names to play')
   } 
    else
    {
      if(currentPlayer === 'X')
      {
        position.currentTarget.classList.add('x-style')
        boardPlayerX.push(position.currentTarget.dataset.i)
        position.currentTarget.removeEventListener('click', game)
        currentPlayer = 'O'
        player.textContent = "Player's turn: " + currentPlayer
        setTimeout(checksWinner, 500) 
      }
       else if(currentPlayer === 'O')
       {
         position.currentTarget.classList.add('circle-style')
         boardPlayerO.push(position.currentTarget.dataset.i)
         position.currentTarget.removeEventListener('click', game) 
         currentPlayer = 'X'
         player.textContent = "Player's turn: " + currentPlayer 
         setTimeout(checksWinner, 500)
       } 
    }
}

function checksWinner () 
{
  const xWinner = document.querySelector('#player-1').value
  const oWinner = document.querySelector('#player-2').value
  
  possibleWins.forEach((winPosition) =>
  {
    if(winPosition.every(eachPos => boardPlayerX.includes(eachPos))) 
    {
      alert(xWinner + ' wins')
      resetGame ()
    }
     else if(winPosition.every(eachPos => boardPlayerO.includes(eachPos)))
     {
       alert(oWinner + ' wins')
       resetGame ()
     }
  })

  if(boardPlayerO.length + boardPlayerX.length > 8)
     {
       alert('Draw')
       resetGame ()
     }
}

function resetGame () 
{
  document.querySelector('#player-1').value = ''
  document.querySelector('#player-2').value = ''

  boardPlayerX.splice(0,boardPlayerX.length)
  boardPlayerO.splice(0,boardPlayerO.length)

  allPositions.forEach((position) =>
  {
    position.classList.remove('x-style')
    position.classList.remove('circle-style')
    position.addEventListener('click', game)
  })

  currentPlayer = 'X'
  document.querySelector('#players-turn').textContent = "Player's turn: " + currentPlayer
}
