class Game {
    constructor({ gameId, board, players, turnCycle, diceResult }) {
        this.gameId = gameId;
        this.board = board;
        this.players = players;
        this.turnCycle = turnCycle;
        this.diceResult = diceResult;
    }
}
export default Game;