function onChange(oldPos, newPos) {
	// console.log(game.moves())
	if (game.game_over())
		console.log("Game Over")
}

const game = new Chess()

function onDrop(start, end) {
	move = game.move({
		from: start,
		to: end,
		promotion: 'q'
	})
	if (move == null) return 'snapback'
}

const board = Chessboard('myBoard', {
	draggable: true,
	onChange: onChange,
	onDrop: onDrop,
	showNotation: false,
	position: 'start'
});



