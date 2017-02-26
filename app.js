let PCchoice,
  userChoice,
  winner,
  availableMoves,
  moveClasses = [
    ".r1c1",
    ".r1c2",
    ".r1c3",
    ".r2c1",
    ".r2c2",
    ".r2c3",
    ".r3c1",
    ".r3c2",
    ".r3c3"
  ],
  tiles = new Set(moveClasses),
  winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  tilesContent;

/*////////
  funs!!
/*/ ///////

const getUserChoice = () => {
  $(".board").css("display", "none");
  $(".choice button").click(function() {
    userChoice = $(this).data("value");
    PCchoice = userChoice === "X" ? "O" : "X";
    $(".choice").css("display", "none");
    $(".board").css("display", "");
  });
  return true;
};

const init = (option) => {
  if (option === "reset") {
    $(".tile").text("");
    $(".result h3").text("");
    $(".tile").off();
  }
  availableMoves = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  tilesContent = Array(9).fill(null);
  $(".tile").on("click", function() {
    makeAMove($(this).data("index"), userChoice);
    AI();
  });
};

//
const endGame = (option) => {
  if (option === "win") {
    $(".result h3").text(`${winner === userChoice ? "You" : "PC"} Won!!!!`);
    availableMoves.clear();
  } else if (option === "draw") {
    $(".result h3").text(`Draw`);
  }
  availableMoves.clear();
  $(".tile").click(function() {
    init("reset");
  });
};

const makeAMove = (index, choice) => {
  tilesContent[index] = choice;
  move(index, choice);
  if (won()) {
    endGame("win");
    return false;
  } else if (draw()) {
    endGame("draw");
    return false;
  }
};

//
const move = (index, choice) => {
  $(moveClasses[index]).text(choice).off();
  availableMoves.delete(index);
};

//
const draw = () => {
  if (tilesContent.indexOf(null) === -1) {
    return true;
  }
  return false;
};

//
const won = () => {
  let checkEqforAll;
  for (let i = 0; i < winCases.length; i += 1) {
    checkEqforAll = tilesContent[winCases[i][0]] == tilesContent[winCases[i][1]] &&
      tilesContent[winCases[i][0]] == tilesContent[winCases[i][2]] &&
      tilesContent[winCases[i][1]] == tilesContent[winCases[i][2]];
    if (checkEqforAll && tilesContent[winCases[i][2]] !== null) {
      // since they're all the same then any tile is alright
      winner = tilesContent[winCases[i][2]];
      return winner;
    }
  }
  return false;
};

//
const AI = () => {
  let index;
  for (let i = 0; i < winCases.length; i += 1) {
    if (tilesContent[winCases[i][0]] == tilesContent[winCases[i][2]]) {
      if (availableMoves.has(winCases[i][1]) && tilesContent[winCases[i][0]] == userChoice)
        index = winCases[i][1];
    } else if (tilesContent[winCases[i][0]] == tilesContent[winCases[i][1]]) {
      if (availableMoves.has(winCases[i][2]) && tilesContent[winCases[i][0]] == userChoice)
        index = winCases[i][2];
    } else if (tilesContent[winCases[i][1]] == tilesContent[winCases[i][2]]) {
      if (availableMoves.has(winCases[i][0]) && tilesContent[winCases[i][1]] == userChoice)
        index = winCases[i][0];
    }
  }
  if (index === null || !availableMoves.has(index)) {
    index = Array.from(availableMoves)[Math.floor(Math.random() * availableMoves.size)];
  }
  makeAMove(index, PCchoice);
};

if (getUserChoice()) {
  init();
}
