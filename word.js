var imports = require('./letters.js')
var inquirer = require('inquirer')
var prompt = require('prompt')

var wordBank = ['magical', 'illusion', 'independent', 'discussion', 'mathematics', 'selection', 'arrangement',
                'occasionally', 'constantly', 'breeze', 'rhyme', 'explanation', 'discipline']
var letterBank = []
var visualWord = []
var newWord = ""
var letterCount = 0
var counter = 0
var guesses

//function that randomizes the words that will be used for the game
function wordChooser() {
  wordChoice = wordBank[Math.floor(Math.random() * 12)]
}

//function that converts words from wordBank into array
function wordCreator() {
  for (var i = 0; i < wordChoice.length; i++) {
    letterBank[i] = new imports.LetterCreator(wordChoice[i], false)
  }
  letterCount = letterBank.length
}

//function that prints letters to the console based on their boolean values
function wordPrinter() {
  visualWord = []
  newWord = ""
  for (var i = 0; i < letterBank.length; i++) {
    visualWord.push(letterBank[i].checkBoolean())
  }
  newWord = visualWord.join("")
  console.log("\n--------------------------------------------------------------------------")
  console.log("|                                                                        |")
  console.log("|                                                                        |")
  console.log("|                                                                        |")
  console.log("|     Your word is: " + newWord)
  console.log("|                                                                        |")
  console.log("|                                                                        |")
  console.log("|                                                                        |")
  console.log("--------------------------------------------------------------------------\n")
}

//function that alters boolean values of letters based upon user input
function responseChecker(guess) {
  for (var i = 0; i < letterBank.length; i++) {
    letterBank[i].changeBoolean(guess)
  }
}

//function that checks whether any letters still contain the false boolean value
function wordCompletion() {
  for (var i = 0; i < letterBank.length; i++) {
    if (letterBank[i].boolean === false) {
      letterGuessPrompt()
      return
    }
  }
}

//function that looks through each letter to see if the user input matched any letters in the word
function gameUpdate(guess) {
  counter = 0
  console.log("\nYour guess was: " + guess)
  console.log("**************************\n")
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
    console.log("You are are out of guesses!  Too bad, so sad!")
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
            gameLaunch()
            return
          }
        })
  }
  else if (counter >= letterCount) {
    guesses--
    console.log("\nIncorrect letter guess!  You have only " + guesses + " guesses remaining!")
    console.log("###################################################################\n")
  }
}

//function that runs the user prompt service
function letterGuessPrompt() {
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
      
      //passes through response for letter verification
      responseChecker(response.letterGuess)
      
      //prints out results of letter guessing
      wordPrinter()

      //checks for letters incorrectly guessed
      gameUpdate(response.letterGuess)

      //checks if word is complete; launches prompt again if not complete
      wordCompletion()
    })
  }
}

//function that launches the game upon loading of node
function gameLaunch() {
  guesses = 10
  console.log("\n\nWelcome to Hangman: Node Edition!  See if you can correctly guess the hidden word!\n" +
    "Be careful though!  You can only get 10 guesses wrong before you lose the round!\n")
  wordChooser()
  wordCreator()
  wordPrinter()
  letterGuessPrompt()
}

gameLaunch()