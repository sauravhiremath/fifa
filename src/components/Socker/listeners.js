export const initListeners = (room, socker) => {
  socker.on('[SUCCESS] Successfully initialised', () => {
    console.log('[SUCCESS] Successfully initialised');
    room.setState({
      isAuth: true
    });
  });

  socker.on('Error: Incorrect password!', () => {
    console.log('Error: Incorrect password!');
    room.setState({
      error: {
        errorTitle: 'INCORRECT PASSWORD',
        errorContent: 'Sorry, incorrect password for the room. Try again'
      }
    });
  });

  socker.on('Error: Create a room first!', () => {
    console.log('Error: Create a room first!');
    room.setState({
      error: {
        errorTitle: 'ROOM NOT FOUND',
        errorContent: 'Sorry, requested Room does not exist. Create a New Room or enter the correct ROOM ID'
      }
    });
  });

  socker.on('Error: Room already created. Join the room!', () => {
    console.log('Error: Create a new room again or Join existing one!');
    room.setState({
      error: {
        errorTitle: 'ROOM ALREADY PRESENT',
        errorContent: 'Sorry, requested Room already present, Join the existing room or Create a new room again'
      }
    });
  });
}
