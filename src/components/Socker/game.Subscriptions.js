import { socker } from '../Room/Room';

export const subscribeTo = {
  showPlayers: cb => {
    socker.on('show-players-joined', data => cb(null, data.playersJoined));
  },

  draftMessage: cb => {
    socker.on('draft-message', message => cb(null, message));
  },

  playerTurnStart: cb => {
    socker.on('player-turn-start', message => cb(null, message));
  },

  playerTurnEnd: cb => {
    socker.on('player-turn-end', message => cb(null, message));
  },

  draftEnd: cb => {
    socker.on('draft-end', message => cb(null, message));
  }
};
