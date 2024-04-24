class User {
    constructor(data = {}) {
        gameId = this.gameId;
        board = this.board;
        players = this.players;
        turnCycle = this.turnCycle;
        diceResult = this.diceResult;
        Object.assign(this, data);
    }
}

export default Game;