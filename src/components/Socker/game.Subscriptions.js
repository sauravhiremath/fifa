import { socker } from '../Room/Room';

export const subscribeTo = {
  showPlayers: cb => {
    socker.on('players-joined', data => cb(null, data.playersJoined));
  }
};
