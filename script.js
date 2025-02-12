var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Get sum of cards in hand
var getHandSum = function (hand) {
  console.log(`hand in getHandSum is `)
  console.log(hand)
  var numAcesInHand = 0;
  var sumLimit= 21;
  var sum = 0;
  for (let i = 0; i < hand.length; i += 1) {
    var currCard = hand[i];
    // If card rank is 2-10, value is same as rank
    if (currCard.rank >= 2 && currCard.rank <= 10) {
      sum += currCard.rank;
      // If card rank is 11-13, i.e. Jack, Queen, or King, value is 10
    } else if (currCard.rank >= 11 && currCard.rank <= 13) {
      sum += 10;
      // If card is Ace, value is 11 by default
    } else if (currCard.rank === 1) {
      numAcesInHand += 1;
      sum += 11;
    }
  }
  // If sum is greater than sum limit and hand contains Aces, convert Aces from value of 11
  // to value of 1, until sum is less than or equal to sum limit or there are no more Aces.
  if (sum > sumLimit && numAcesInHand > 0) {
    for (let i = 0; i < numAcesInHand; i += 1) {
      sum -= 10;
      // If the sum is less than sumLimit before converting all Ace values from
      // 11 to 1, break out of the loop and return the current sum.
      if (sum <= sumLimit) {
        break;
      }
    }
  }
  console.log(sum)
  return sum;
};
// function to convert suit word to emoji
var convertSuitWordToEmoji = function (suitWord) {
  if (suitWord == 'spades') {
    return '♠️';
  }
  if (suitWord == 'hearts') {
    return '♥️';
  }
  if (suitWord == 'clubs') {
    return '♣️';
  }
  if (suitWord == 'diamonds') {
    return '♦️';
  }
  // If we reach here, we entered an invalid suit
  return 'Invalid Suit!';
};

var getCardStringRepresentation = function (card) {
  return `${card.name} of ${convertSuitWordToEmoji(card.suit)}`;
};

var printCardswithEmojiSuits = function (cards) {
  var returnString = '';
  // Iterate until cards.length - 1 so we can avoid the extra comma at the end of return string
  for (var i = 0; i < cards.length - 1; i += 1) {
    var currCard = cards[i];
    returnString += `${getCardStringRepresentation(currCard)}, `;
  }
  var lastCard = cards[cards.length - 1];
  returnString += getCardStringRepresentation(lastCard);
  return returnString;
};

var howToPlay = function() {
  return `To play BlackJack, first place a bet.<br>
  The aim of Black Jack is to draw cards up to 21<br>
  After drawing 2 cards. Decide to hit to draw<br>
  or stand to stop drawing. Cards are compared<br>
  with computer's hand. The hand that is closest to 21 wins.<br><br>

  Enjoy the Game!`
}

// features to work on
//1. reset blackjack game game ends (solved)
//2. change suit to emoji
//3. collect user name and display it
//4. betting function

// initalise global array to store the cards

var playerCards = [];
var computerCards = [];
var gameMode = `username`;
var playerScore = 0;
var computerScore = 0;
var winMessage= ``;
var playerPoints = 100;
var userName = ``;
var betPoints

var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

var main = function (input) {

  if (!userName) {
    if (!input) {
      return 'Please input a non-empty string as your user name!';
    }
    userName = input;
    gameMode = `betpoints`
    return winMessage = `Let's welcome ${userName} to our BlackJack game!<br><br>
    You have ${playerPoints} points.<br><br>
    How many points do you want to bet?`
  }

  if (gameMode == `reset`){
    playerCards = [];
    computerCards = [];
    playerScore = 0;
    computerScore = 0;
    gameMode = `betpoints`
    return winMessage = `${userName}, Let play another game.<br><br>
    You have ${playerPoints} points.<br><br>
    How many points do you want to bet?`
  }

  if (gameMode == `betpoints`) {
    gameMode = `draw card`
    betPoints = Number(input)
    return winMessage = `You have bet ${betPoints} Points.<br><br>
    Press Submit to Deal Cards.`
  }

  if (gameMode === `draw card`) {
    for (i = 0; i < 2; i++) {
      playerCards.push(shuffledDeck.pop());
    };
    //summarise score and assign to global variable
    playerScore = getHandSum(playerCards);
    gameMode = `hit or stand`;
  }

  winMessage= `You drawed ${printCardswithEmojiSuits(playerCards)}
  <br><br>
  Your score is: ${playerScore}.<br><br>
  Enter hit or stand.`

  if (gameMode == `hit or stand`) {

    if (input == `hit`){

      playerCards.push(shuffledDeck.pop());
      playerScore = getHandSum(playerCards);
      console.log(playerCards)
      var drawnCard = `${userName}, now these cards are in your hand `
      winMessage = `${drawnCard}<br><br>
      ${printCardswithEmojiSuits(playerCards)}<br><br>
      Your score is ${playerScore}.<br><br>
      Enter hit or stand.`

      if (playerScore>21){
        playerPoints-= betPoints;
        winMessage = `You lose!<br><br>
        These cards are in your hand ${printCardswithEmojiSuits(playerCards)}<br><br>
        Your score is ${playerScore}.<br><br>
        You have ${playerPoints} Points left.<br><br>
        Refresh page to Play Again.`
      }
     };
    
    if (input == `stand`) {

      //computer starts to draw card after player hits stand
      for (k = 0; k < 2; k++) {
        computerCards.push(shuffledDeck.pop());
        }
        computerScore = getHandSum(computerCards);
          
         while (computerScore < 17) {
          currComputerCard = shuffledDeck.pop();
          computerCards.push(currComputerCard)
          computerScore = getHandSum(computerCards)
        }

      // computer draws blackjack while or player bursts.
      if ((computerScore == 21 && playerScore <21) || playerScore >21){
        gameMode = `reset`
        playerPoints-= betPoints;
        return winMessage = `You Lost!<br><br>
        Computer got ${computerScore}<br><br>
        Your hand is  ${playerScore}.<br><br>
        You have ${playerPoints} Points left.<br><br>
        Refresh page to Play Again.`
      };
  
      if ((playerScore == 21 && computerScore < 21) || computerScore > 21){
      gameMode = `reset`
      playerPoints+= betPoints;
      return winMessage = `You Win!<br><br>
      Computer got ${computerScore}<br><br>
      You got ${playerScore}.<br><br>
      You have ${playerPoints} Points left.<br><br>
      Refresh page to Play Again.`}

      if ((playerScore > computerScore) && playerScore <21) {
      gameMode = `reset`
      playerPoints+= betPoints;
      return winMessage = `You Win!<br><br>
      Computer got ${computerScore}.<br><br>
      You got ${playerScore}.<br><br>
      You have ${playerPoints} Points left.<br><br>
      Refresh page to Play Again.`} 

      if (playerScore < computerScore){
      gameMode = `reset`
      playerPoints-= betPoints;
      return winMessage =`You Lose!<br><br>
      Computer got ${computerScore}.<br><br>
      You got ${playerScore}.<br><br>
      You have ${playerPoints} Points left.<br><br>
      Refresh page to Play Again.`}

      if (playerScore == computerScore) {
      gameMode = `reset`
      return winMessage =`Draw!<br><br>
      Computer got ${computerScore}.<br><br>
      You got ${playerScore}.<br><br>
      You have ${playerPoints} Points left.<br><br>
      Refresh page to Play Again.`
    }
  }
}
return winMessage
};

