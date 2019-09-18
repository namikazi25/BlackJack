// 
// Back Jack
// by Sharear Shopnil
//

//Suit Variable
let suits = ["Spades", "Hearts", "Clubs", "Diamond"],
  values = ["Ace", "King", "Queen", "Jack",
    "Ten", "Nine", "Eight", "Seven",
    "Six", "Five", "Four", "Three", "Two"
  ];
//Dom Variable
let textArea = document.getElementById('text-Area');
let newGame = document.getElementById('new-game');
let hit = document.getElementById('hit');
let stay = document.getElementById('stay');

//Game Variable
let gameStarted = false,
  gameOver = false,
  playerWon = false,
  tie = false,
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  deck = [];



hit.style.display = 'none';
stay.style.display = 'none';
showStatus();

newGame.addEventListener('click', function() {

  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);

  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];


  textArea.innerText = "Started .....!";
  newGame.style.display = 'none';
  hit.style.display = 'inline';
  stay.style.display = 'inline';
  showStatus();
})

hit.addEventListener('click', function() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();


});

stay.addEventListener('click', function() {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function createDeck() {
  let deck = [];
  for (let suitsIdx = 0; suitsIdx < suits.length; suitsIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitsIdx],
        value: values[valueIdx]
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let temp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = temp;
  }
}

function getNextCard() {
  return deck.shift();
}


function getCardString(card) {
  return card.value + " of " + card.suit;
}

function getCardNumericValue(card) {
  switch (card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}



function getScore(cardArray) {
  let score = 0;
  let hasAce = false;

  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace') {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}




function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame() {
  updateScores();

  if (gameOver) {
    //let dealer take cards
    while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }

  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
    tie = false;
  } else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
    tie = false;

  } else if (playerScore === 21) {
    playerWon = true;
    gameOver = true;
    tie = false;
  } else if (dealerScore === 21) {
    playerWon = false;
    gameOver = true;
    tie = false;
  } else if (gameOver) {

    if (playerScore > dealerScore) {
      playerWon = true;
    } else if (playerScore === dealerScore) {
      tie = true;
    } else {
      playerWon = false;
    }

  }
}

function showStatus() {
  if (!gameStarted) {
    textArea.innerText = "Welcome to Black Jack!";
    return;
  }

  let dealerCardString = '';
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }

  let playerCardString = '';
  for (let i = 0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }

  updateScores();

  textArea.innerText =
    'Dealer has:\n' +
    dealerCardString +
    '(score:' + dealerScore + ')\n\n' +

    'Player has:\n' +
    playerCardString +
    '(score:' + playerScore + ')\n\n';

  if (gameOver) {
    if (playerWon) {
      textArea.innerText += 'YOU WIN!';
    } else if (tie) {
      textArea.innerText += 'Tie';
    } else {
      textArea.innerText += 'DEALER WINS!';
    }
    newGame.style.display = 'inline';
    hit.style.display = 'none';
    stay.style.display = 'none';
  }


}
