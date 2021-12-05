window.onload = function () {
  const field = document.getElementsByClassName("container");
  const game = {
    board: ["", "", "", "", "", "", "", "", ""],
    winningPositions: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
    turn: "X",
    noWin: true,
    itsOld: 0,
    generateCells: function () {
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = i;
        cell.onclick = (e) => {
          if (!cell.classList.contains("busy") && this.noWin) {
            this.move(e);
            cell.classList.add("busy");
          }
        };
        field[0].appendChild(cell);
      }
    },
    checkVictory: function () {
      for (let i in this.winningPositions) {
        if (
          this.board[this.winningPositions[i][0]] == this.turn &&
          this.board[this.winningPositions[i][1]] == this.turn &&
          this.board[this.winningPositions[i][2]] == this.turn
        ) {
          document
            .getElementById(this.winningPositions[i][0])
            .classList.add("wins");
          document
            .getElementById(this.winningPositions[i][1])
            .classList.add("wins");
          document
            .getElementById(this.winningPositions[i][2])
            .classList.add("wins");
          info.innerText = `Player ${this.turn} won`;
          this.noWin = false;
          this.clear();
        }
      }
      if(this.itsOld == 9 && this.noWin) {
        info.innerText = `Gave Old`;
        this.clear();
      }
    },
    clear: async function () {
      await new Promise((r) => setTimeout(r, 2500));
      this.board = ["", "", "", "", "", "", "", "", ""];
      this.noWin = true;
      for (let i = 0; i < 9; i++)
        field[0].removeChild(document.getElementById(i));
      info.innerText = "";
      this.itsOld = 0;
      init.style.display = "flex";
    },
    move: function (e) {
      let aux = parseInt(e.target.id);
      e.target.innerText = this.turn;
      this.board[aux] = this.turn;
      this.itsOld++;
      this.checkVictory();
      this.turn == "X" ? (this.turn = "O") : (this.turn = "X");
    },
  };
  play.onclick = () => {
    init.style.display = "none";
    game.generateCells();
  };
};
