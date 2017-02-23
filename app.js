let PCchoice = "X",
  userChoice = "O",
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
  winCases= [
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
/*////////

const init = (option) => {
  if (option === "reset") {
    $(".tile").text("");
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
    $(".result h3").text(`Winner is ${winner}`);
    availableMoves.clear();
  } else if (option === "draw") {
    $(".result h3").text(`Draw`);
  }
  $(".tile").click(function () {
    init("reset");
  });
};

const makeAMove = (index, choice) => {
  console.log("making a move");
  if (won()) {
      console.log("won returned true");
      availableMoves.clear();
      endGame("win");
      return false;
  } else if (draw()) {
    console.log("draw returned true");
    endGame("draw");
    return false;
  }
  tilesContent[index] = choice;
  move(index, choice);
};

//
const draw = () => {
  if (tilesContent.indexOf(null) === -1) {
    console.log("draw");
    return true;
  }
};

//
const move = (index, choice) => {
  $(moveClasses[index]).text(choice).off();
  availableMoves.delete(index);
};

//
const won = () => {
  let state,
  tc = tilesContent,
  wc = winCases;
  for (let i = 0; i < winCases.length; i += 1) {
    state = tc[wc[i][0]] == tc[wc[i][1]] &&
      tc[wc[i][0]] == tc[wc[i][2]] &&
      tc[wc[i][1]] == tc[wc[i][2]];
    if (state && tc[wc[i][2]] !== null) {
      // since they're all the same then any tile is alright
      console.log("won");
      winner = tilesContent[winCases[i][2]];
      return winner;
    }
  }
};

//
const AI = () => {
  console.log("AI");
  let index = Array.from(availableMoves)[Math.floor(Math.random() * availableMoves.size)];
  makeAMove(index, PCchoice);
};

init();
