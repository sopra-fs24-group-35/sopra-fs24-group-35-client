class Game{
    constructor(data = {}) {
        this.gameId = null;
        this.board = null;
        this.players = null;
        this.turnCycle = null;
        this.diceResult = null;
        Object.assign(this, data);
    }

    territoriesAreEqual(otherGame) {
        if (!(otherGame instanceof Game)) {
            return false;
        }
    
        if (!this.board || !otherGame.board || !this.board.territories || !otherGame.board.territories) {
            // If territories are not defined in either game, consider them unequal
            return false;
        }
    
        if (this.board.territories.length !== otherGame.board.territories.length) {
            // If number of territories is different, consider them unequal
            return false;
        }
    
        for (let i = 0; i < this.board.territories.length; i++) {
            const thisTerritory = this.board.territories[i];
            const otherTerritory = otherGame.board.territories[i];
    
            // Compare territory properties
            if (thisTerritory.name !== otherTerritory.name ||
                thisTerritory.owner !== otherTerritory.owner ||
                thisTerritory.troops !== otherTerritory.troops) {
                return false; // If any property is different, consider them unequal
            }
        }
    
        // All territories are equal
        return true;
    }
}

export default Game;