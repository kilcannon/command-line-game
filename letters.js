var exports = module.exports = {}
  
exports.LetterCreator = function (string, boolean) {
  this.string = string;
  this.boolean = boolean;
  this.changeBoolean = function(guess) {
    if (this.boolean === true) {
      return
    }
    else if (this.boolean === false && this.string === guess) {
      this.boolean = true
    }
  }
  this.checkBoolean = function() {
    if (this.boolean === false) {
      return " __ "
    }
    else {
      return " " + this.string + " "
    }
  }
}