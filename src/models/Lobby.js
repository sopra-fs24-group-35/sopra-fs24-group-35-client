/**
 * Lobby model
 */
class Lobby {
  constructor(data = {}) {
    this.id = null;
    this.code = null;
    this.players = null;
    this.gameId = null;
    Object.assign(this, data);
  }
}

export default Lobby;
