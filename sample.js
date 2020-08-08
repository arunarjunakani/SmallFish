const { Chess } = require('./node_modules/chess.js')
const prompt = require('prompt-sync')({sigint: true});

const chess = new Chess()
console.log(chess.ascii())

while (!chess.game_over()) {
	const pmoves = chess.moves()
	const pMove = prompt()
	if (!pmoves.includes(pMove)) {
		console.log("Illegal Move:"  + pMove)
		console.log(pmoves)
		continue;
	}
	chess.move(pMove)
    console.log(chess.ascii())

    const moves = chess.moves()
    const move = moves[Math.floor(Math.random() * moves.length)]
    chess.move(move)
    // console.log(move);
    console.log(chess.ascii())
}

console.log(chess.pgn())