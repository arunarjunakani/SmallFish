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

function bestMove() {
	const moves = game.moves({verbose: true})

	const currVal = evaluateBoard()[game.turn()];
	for (move of moves) {
		console.log(move["to"])
	}

    const bestMove = moves[Math.floor(Math.random() * moves.length)]
    return bestMove;
}

function evaluateBoard() {
	let result = {
		"w": 0,
		"b": 0
	}
	for (i in game.board()) {
		for (j in game.board()) {
			let piece = game.board()[i][j]
			if (piece) {
				result[piece.color] += getWeight(piece)
			}
		}
	}
	return result
}

function getWeight(piece) {
	if (!piece) return 0
	switch (piece.type) {
		case "p":
			return 10
		case "n":
		case "b":
			return 30
		case "r":
			return 50
		case "q":
			return 90
		case "k":
			return 0
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