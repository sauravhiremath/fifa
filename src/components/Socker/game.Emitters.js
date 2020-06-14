import { socker } from '../Room/Room';

export const emit = {
  startDraft: () => {
    socker.emit('is-ready');
  },

  playerTurnPass: (itemId) => {
    socker.emit('player-turn-pass');
  },

  closeConnection: () => {
    socker.close();
  }
};
