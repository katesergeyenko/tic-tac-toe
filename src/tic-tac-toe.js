const SIZE_OF_FIELD = 3;

class TicTacToe {
  constructor() {
		this.currentSymbol = 'x';
		this.matrix = [
					[null, null, null],
					[null, null, null],
					[null, null, null],
				];
  }

	getCurrentPlayerSymbol() {
		return  this.currentSymbol;
	}

	nextTurn(rowIndex, columnIndex) {
		if (this.getFieldValue(rowIndex, columnIndex) === null && this.isFinished() === false) {
			this.matrix[rowIndex][columnIndex] = this.currentSymbol;

			this.currentSymbol = this.getCurrentPlayerSymbol() === 'x' ? 'o' : 'x';
		}
	}

	isFinished() {
		return this.getWinner() !== null || this.noMoreTurns();
	}

	getWinner() {
		const arr = new Array(8);

		for (let i = 0; i < 8; i++) {
			arr[i] = [];
		}

		let k = 0;
		for (let i = 0; i < SIZE_OF_FIELD; i++) {
			for (let j = 0; j < SIZE_OF_FIELD; j++) {
				arr[i][j] = this.matrix[i][j];
				arr[i + SIZE_OF_FIELD][j] = this.matrix[j][i];
			}
			k += 2;
		}
		
		for (let j = 0; j < SIZE_OF_FIELD; j++) {
			arr[k][j] = this.matrix[j][j];
			arr[k + 1][j] = this.matrix[j][2 - j];
		}

		////////////////////////////////////////////////
		let isXWinner = false;
		let isOWinner = false;

		for (k = 0; k < 8; k++) {
			if (arr[k][0] === arr[k][1] && arr[k][0] === arr[k][2]) {
				if (arr[k][0] === 'x') {
					isXWinner = true;
				}
				else if (arr[k][0] === 'o') {
					isOWinner = true;
				}
			}
		}
		/////////////////////////////////////////////////

		if (isXWinner === true && isOWinner === false) {
			return 'x';
		}
		else if (isOWinner === true && isXWinner === false) {
			return 'o';
		}
		else {
			return null;
		}
	}

	noMoreTurns() {
		for (var i = 0; i < SIZE_OF_FIELD; i++) {
			for (var j = 0; j < SIZE_OF_FIELD; j++) {
				if (this.matrix[i][j] === null){
					return false;
				}
			}
		}

		return true;
	}

	isDraw() {
		return this.isFinished() && this.getWinner() === null;
	}

	getFieldValue(rowIndex, colIndex) {
		return this.matrix[rowIndex][colIndex];
	}
}

module.exports = TicTacToe;
