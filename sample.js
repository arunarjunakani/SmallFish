const { Chess } = require('./node_modules/chess.js')
const prompt = require('prompt-sync')({sigint: true});

const chess = new Chess()




while (!chess.game_over()) {

	const pMove = prompt()
	chess.move(pMove)
    console.log(chess.ascii())

    const moves = chess.moves()
    const move = moves[Math.floor(Math.random() * moves.length)]
    chess.move(move)
    console.log(chess.ascii())
}

console.log(chess.pgn())