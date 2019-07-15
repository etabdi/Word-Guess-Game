
const cityData = {

    "Kabul":"Afghanistan",
    "Tirana":"Albania",
    "Algiers":"Algeria",
    "Andorra la Vella":"Andorra",
    "Luanda":"Angola",
    "Saint John's":"Antigua and Barbuda",
    "Buenos Aires":"Argentina",
    "Yerevan":"Armenia",
    "Canberra":"Australia",
    "Vienna":"Austria",
    "Baku":"Azerbaijan",
	"Nassau":"Bahamas",
    "Manama":"Bahrain",
    "Dhaka":"Bangladesh",
    "Bridgetown":"Barbados",
    "Minsk":"Belarus",
    "Brussels":"Belgium",
    "Belmopan":"Belize",
    "Porto-Novo":"Benin",
    "Thimphu":"Bhutan",
    "Sucre (de jure)":"Bolivia",
    "Bosnia":"Herzegovina",
    "Gaborone":"Botswana",
    "Brasilia":"Brazil",
    "Bandar Seri Begawan":"Brunei",
    "Sofia":"Bulgaria",
    "Ouagadougou":"Burkina Faso",
    "Gitega":"Burundi",		
    "Praia":"Cabo Verde",
    "Phnom Penh":"Cambodia",
    "Yaounde":"Cameroon",
    "Ottawa":"Canada",
    "Bangui":"Central African Republic",
    "N'Djamena":"Chad",
    "Santiago":"Chile",
    "Beijing":"China",
    "Bogotá":"Colombia",
    "Moroni":"Comoros",
    "Kinshasa":"Congo",
    "Havana":"Cuba",
    "Nicosia":"Cyprus",
    "Prague":"Czechia",		
    "Copenhagen":"Denmark",
    "Djibouti":"Djibouti",
    "Asmara":"Eritrea",
    "Addis Ababa":"Ethiopia",
    "Paris":"France",
    "Berlin":"Germany",
    "Athens":"Greece",
    "Guatemala City":"Guatemala",
    "Reykjavik":"Iceland",
    "New Delhi":"India",
    "Dublin":"Ireland",
    "Rome":"Italy",
    "Kingston":"Jamaica",
    "Tokyo":"Japan",
    "Mexico City":"Mexico",
    "Oslo":	"Norway",
    "Asunción":"Paraguay",
    "Lima":"Peru",
    "Manila":"Philippines",
    "Warsaw":"Poland",
    "Lisbon":"Portugal",
    "Moscow":"Russia",
    "Singapore":"Singapore",	
	"Seoul"	:	"South Korea",
    "Madrid"	:	"Spain",
    "Bern"	:	"Switzerland",
    "Bangkok"	:	"Thailand",
    "London"	:	"United Kingdom",
    "Washington, D.C."	:	"United States of America",
    "Caracas"	:	"Venezuela",
    "Hanoi"	:	"Vietnam"    
   
  }
  
    class cities {
    constructor(remainingAttempts = 10) {
      this.started = false; 
      this.answer = "";     
      this.ansLetters = []; 
      this.ansDisplay = []; 
      this.numWins = 0;    
      this.remaining = remainingAttempts;
    }
   
    start(remainingGuess = this.remaining) {
      this.remaining = remainingGuess;
      this.answer = this.pickAnswer(cityData);
      this.ansLetters = this.initAnswerLetters(this.answer);
      this.ansDisplay = this.initAnswerDisplay(this.answer);
      this.started = true;
    }
    
    pickAnswer(inputData) {
      let arrayData = [];
      for (let name in inputData) {
        arrayData.push(name);
      }
      let ndx = Math.floor(Math.random() * arrayData.length);
  
      return arrayData[ndx];
    }
  
    
    initAnswerLetters(ansStr) {
      let ansLetters = [];
      for (let i = 0; i < ansStr.length; i++) {
        let ansChar = ansStr.charAt(i).toLowerCase();
        if (/^\w$/.test(ansChar)) {
          ansLetters.push(ansChar);
        }
      }
  
      return new Set(ansLetters);
    }
  
    initAnswerDisplay(ansStr) {
      let ansDisplay = [];
      for (let i = 0; i < ansStr.length; i++) {
        let ansChar = ansStr[i];
        ansDisplay[i] = ansChar;
        if (/\w/.test(ansChar)) {
          ansDisplay[i] = "_";
        }
      }
  
      return ansDisplay;
    }
  
    updateGameData(inputChar) {
      
      if (this.ansLetters.delete(inputChar)) {
        this.updateAnsDisplay(inputChar);
        if (this.userWon()) {
          this.numWins++;
          return true;
        }
      } else {
        this.remaining--;
      }
  
      return false;
    }
  
    updateAnsDisplay(char) {
      console.log("char: =>" + char + "<- word: " + this.answer);
  
      for (let i = 0; i < this.answer.length; i++) {
        if (this.answer.charAt(i).toLowerCase() === char) {
          this.ansDisplay[i] = this.answer[i];
          console.log("got " + char + "  word: " + this.ansDisplay);
        }
      }
  
      return this.ansDisplay;
    }
  
    userWon() {
      if (this.ansLetters.size == 0) {
        return true;
      }
      return false;
    }
  
    hint() {
      return cityData[this.answer];
    }
  }
  
  class WebElems {
    constructor(game = new cities()) {
      this.startMsg = document.getElementById("start");
      this.numWins = document.getElementById("num-wins");
      this.answer = document.getElementById("question");
      this.remaining = document.getElementById("remaining-guesses");
      this.guessed = document.getElementById("already-guessed");
          this.game = game;
    }
  
    handleKeyInput(userInput) {
      console.log("input: " + userInput);
  
      if (this.game.started) {
        this.startMsg.style.visibility = "hidden";

        if (/^[\w~!@#$%^&*()_+=,.]$/.test(userInput)) {
          console.log("answer: " + this.game.answer);
          if (this.game.updateGameData(userInput.toLowerCase())) {
            this.start();
            userInput = ""; 
          } else {
            if (this.game.remaining === 0) {
              userInput = "";
            }
          }
          this.updatePage(userInput);
        }
      } else {
        
        if (this.game.remaining === 0) {
          this.startMsg.style.visibility = "hidden";
        }
        this.start();
      }
    }
  
    start(remainingGuess = 10) {
      this.game.start(remainingGuess);
      this.guessed.textContent = "";
      this.updatePage("");
      $("#hint").text("");
    }
  
    updatePage(inputChar) {
      this.numWins.textContent = this.game.numWins;
      this.answer.textContent = this.game.ansDisplay.join("");
      this.remaining.textContent = this.game.remaining;
      this.guessed.textContent += inputChar.toUpperCase();
  
      if (this.game.remaining === 0) {
        this.showAnswer();
        this.game.started = false;
      }
    }
  
    
    showAnswer() {
      this.answer.textContent = this.game.answer;
      this.startMsg.style.visibility = "visible";
    }
  
      hint() {
      
      return this.game.hint();
    }
  }
  var x = document.getElementById("myAudio").autoplay;

  if (num-wins===0)
  {
    alert("you win");
  }

  