import { socker } from '../Room/Room';

export const subscribeTo = {
  showPlayers: cb => {
    socker.on('show-players-joined', data => cb(null, data.playersJoined));
  },

  draftMessage: cb => {
    socker.on('draft-message', message => {
      console.log(message);
      cb(null, message);
    });
  },

  playerTurnStart: cb => {
    socker.on('player-turn-start', message => {
      console.log(message);
      cb(null, message);
    });
  },

  playerTurnEnd: cb => {
    socker.on('player-turn-end', message => {
      console.log(message);
      cb(null, message);
    });
  },

  draftStart: cb => {
    socker.on('draft-start', message => {
      console.log(message);
      cb(null, message);
    });
  },

  draftEnd: cb => {
    socker.on('draft-end', message => {
      console.log(message);
      cb(null, message);
    });
  }
};
