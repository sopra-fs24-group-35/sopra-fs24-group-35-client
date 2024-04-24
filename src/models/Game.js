class Game{
    constructor(data = {}) {
        this.gameId = null;
        this.board = null;
        this.players = null;
        this.turnCycle = null;
        this.diceResult = null;
        Object.assign(this, data);
    }
}

export default Game;