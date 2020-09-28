// Checks for game over
function onChange(oldPos, newPos) {
	if (game.game_over())
		console.log("Game Over")
}

// Makes sure you can only move when it's your turn
function onDragStart(source, piece) {
	return !game.game_over() && piece.charAt(0) == game.turn()
}

function onDrop(start, end) {
	const move = game.move({
		from: start,
		to: end,
		promotion: 'q'
	})
	if (move == null) return 'snapback'
    window.setTimeout(makeMove, 250);
}

function onSnapEnd() {
    board.position(game.fen());
};



// For the AI
function makeMove() {
	const move = bestMove();
    game.move(move);
    board.position(game.fen());
}

function opTurn() {
	return game.turn() === 'w' ? 'b' : 'w'
}

function bestMove() {
	// const moves = game.moves({verbose: true})
	let bestMove = minimaxRoot(3, true)
    return bestMove;
}

function minimaxRoot(depth, isMaximizing) {
	let moves = game.moves();
	let maxChange = -9999
	let bestMove

	for (let i = 0; i < moves.length; i++) {
		let newMove = moves[i] 
		game.move(newMove)
		let val = minimax(depth - 1, -10000, 10000, !isMaximizing)
		game.undo()
		if (val >= maxChange) {
			maxChange = val
			bestMove = newMove
		}	
	}

	return bestMove;
}

function minimax(depth, alpha, beta, isMaximizing) {
	if (depth === 0) {
		return -evaluateBoard()
	}

	let moves = game.moves()
	if (isMaximizing) {
		let maxChange = -9999
		for (let i = 0; i < moves.length; i++) {
			game.move(moves[i])
			maxChange = Math.max(maxChange, minimax(depth - 1, alpha, beta, !isMaximizing))
			game.undo()
		
			alpha = Math.max(alpha, maxChange)
			if (beta <= alpha) {
				return maxChange
			}
		}
		return maxChange
	} else {
		let maxChange = 9999
		for (let i = 0; i < moves.length; i++) {
			game.move(moves[i])
			maxChange = Math.min(maxChange, minimax(depth - 1, alpha, beta, !isMaximizing))
			game.undo()

			beta = Math.min(beta, maxChange)
			if (beta <= alpha) {
				return maxChange
			}
		}
		return maxChange
	}
}

function evaluateBoard() {
	let result = 0
	for (i in game.board()) {
		for (j in game.board()) {
			result += getWeight(game.board()[i][j])
		}
	}
	return result;
}

function getWeight(piece) {
	if (!piece) return 0
	
	let color = piece.color === 'w' ? 1 : -1;
	switch (piece.type) {
		case "p":
			return 10 * color
		case "n":
		case "b":
			return 30 * color
		case "r":
			return 50 * color
		case "q":
			return 90 * color
		case "k":
			return 900 * color
	}
}

const game = new Chess()
const board = Chessboard('myBoard', {
	draggable: true,
	onChange: onChange,
	onDragStart: onDragStart,
	onDrop: onDrop,
    onSnapEnd: onSnapEnd,
	position: 'start'
});