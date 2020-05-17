# Countdown

Word guessing game, clone of the famous [“​Countdown​” TV](https://en.wikipedia.org/wiki/Countdown_(game_show)) game show with one key difference: In Countdown, there may be several correct words, but in this game, there is only one.

## Game Definition

### Gameplay:

Drag the available letters to to the empty fields to try to guess the correct word.

### Rules:

* The correct word is randomly selected.
* 9 letters are displayed (both correct and incorrect) shuffled.
* The player should drag and drop the letters into the empty fields.
* The player has 1 minute to complete the word.
* Once dropped in an empty field, a letter cannot return to its original place, but it can be moved to a different empty field.
* The player fails when they select the wrong letters or if they are ordered incorrectly.
* On fail, the board is reset but the timer continues.
* The player lose by either running out of time or by failing 3 times.
* If they lose, they see a fail message and an option to try again with a different word.

#### How to win:

* The only way to win is to spell the correct word within the time limit.

## Project Specifications

The project was coded in Javascript using [React.js](https://reactjs.org/)
For styling the library [Styled Component](https://styled-components.com/) was used.
The project follows the [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react) for development conventions.

### Word Algorithm

The word algorithm to enforce only one correct answer within the dictionary and to select extra wrong letters, is based on the "On the Subject of Passwords" module's defuse instructions in the Bomb Defusal Manual v.1 from the game **Keep Talking and Nobody Explodes**.

For more information visit [https://keeptalkinggame.com/](https://keeptalkinggame.com/)

## Available Scripts

In the project directory, you can run the project in development mode using:

### `npm start`

Do not forget to install dependencies before by using:

### `npm install`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.