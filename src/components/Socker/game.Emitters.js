import { socker } from '../Room/Room';

export const emit = {
  startDraft: () => {
    socker.emit('is-ready');
  }
};
