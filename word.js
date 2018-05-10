var imports = require('./letters.js')
var inquirer = require('inquirer')
var exports = module.exports = {}


var wordBank = ['magical', 'illusion', 'independent', 'discussion', 'mathematics', 'selection', 'arrangement',
                'occasionally', 'constantly', 'breeze', 'rhyme', 'explanation', 'discipline']
var letterBank = []
var visualWord = []
var wordChoice = []
var chosenLetters = []
var newWord = ""
var letterCount = 0
var counter = 0
var guesses = 10

//function that randomizes the words that will be used for the game
wordChooser = function() {
  wordChoice = []
  wordChoice = wordBank[Math.floor(Math.random() * 12)]
}

//function that converts words from wordBank into array
wordCreator = function() {
  letterBank = []
  for (var i = 0; i < wordChoice.length; i++) {
    letterBank[i] = new imports.LetterCreator(wordChoice[i], false)
  }
  letterCount = letterBank.length
}

//function that prints letters to the console based on their boolean values
wordPrinter = function() {
  visualWord = []
  newWord = ""
  for (var i = 0; i < letterBank.length; i++) {
    visualWord.push(letterBank[i].checkBoolean())
  }
  newWord = visualWord.join("")
  console.log("\n   --------------------------------------------------------------------------")
  console.log("   |                                                                        |")
  console.log("   |                                                                        |")
  console.log("   |                                                                        |")
  console.log("   |     Your word is: " + newWord)
  console.log("   |                                                                        |")
  console.log("   |                                                                        |")
  console.log("   |                                                                        |")
  console.log("   --------------------------------------------------------------------------\n")
}

//function that alters boolean values of letters based upon user input
function responseChecker(guess) {
  for (var i = 0; i < letterBank.length; i++) {
    letterBank[i].changeBoolean(guess)
  }
}

//function that checks whether the word is fully completed; restarts game on completion
function gameRestart() {
  var booleanArray = []
  for (var i = 0; i < letterBank.length; i++) {
    booleanArray.push(letterBank[i].boolean)
  }
  if (booleanArray.includes(false)) {
    letterGuessPrompt()
    return
  }
  else {
    console.log("   Congratulations!  You you correctly guessed the word!")
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'playAgain',
          message: 'Try again?',
          default: false
        }
        ])
        .then(function(response) {
          if (response.playAgain === true) {
            //clears the console of text
            chosenLetters = []
            console.log('\x1Bc')
            gameRelaunch()
            return
          }
        })
    return
  }
}

//function that looks through each letter to see if the user input matched any letters in the word
function gameUpdate(guess) {
  counter = 0
  chosenLetters.push(guess)
  console.log("\n   Your guess was: " + guess)
  console.log("   **************************\n")
  console.log("   Your bank of chosen letters is: ", chosenLetters)
  letterBank.forEach(function(letter) {
    if (guess === letter.string) {
      return
    }
    else {
      counter++
    }
  })
  //ensures the player gets a chance to play again on a failed round
  if (guesses === 0) {
    console.log("   You are are out of guesses!  Too bad, so sad!")
    console.log("   The word you were trying to guess was: " + wordChoice)
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'playAgain',
          message: 'Try again?',
          default: false
        }
        ])
        .then(function(response) {
          if (response.playAgain === true) {
            //clears the console of text
            console.log('\x1Bc')
            chosenLetters = []
            gameRelaunch()
            return
          }
        })
  }
  else if (counter >= letterCount) {
    guesses--
    console.log("\n   Incorrect letter guess!  You have only " + guesses + " guesses remaining!")
    console.log("   ###################################################################\n")
  }
}

//function that runs the user prompt service
letterGuessPrompt = function() {
if (guesses === 0) {
  gameUpdate()
  return
}
else {
inquirer
  .prompt([
    {
      type: "input",
      message: "What letter would you like to guess?",
      name: "letterGuess"
    }
    ])
    .then(function(response) {
      console.log("prompt received")
      
      //passes through response for letter verification
      responseChecker(response.letterGuess)
      
      //prints out results of letter guessing
      wordPrinter()

      //checks for letters incorrectly guessed
      gameUpdate(response.letterGuess)

      //checks if word is complete; launches prompt again if not complete
      gameRestart()

    })
  }
}

exports.gameLaunch = function() {
  guesses = 10
  console.log("\n\n   Welcome to Hangman: Node Edition!  See if you can correctly guess the hidden word!\n" +
    "   Be careful though!  You can only get 10 guesses wrong before you lose the round!\n")
  wordChooser()
  wordCreator()
  wordPrinter()
  letterGuessPrompt()
}

function gameRelaunch() {
  guesses = 10
  console.log("\n\n  Here's your next word!  Good luck!\n")
  wordChooser()
  wordCreator()
  wordPrinter()
  letterGuessPrompt()
}



