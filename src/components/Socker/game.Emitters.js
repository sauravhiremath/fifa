import { socker } from '../Room/Room';

export const emit = {
  startDraft: () => {
    socker.emit('is-ready');
  },

  playerTurnPass: item => {
    socker.emit('player-turn-pass', item);
  },

  closeConnection: () => {
    socker.close();
  }
};
