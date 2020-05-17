export const initListeners = (socker) => {
  socker.on('[SUCCESS] Successfully initialised', () => {
    console.log('[SUCCESS] Successfully initialised');
    this.setState({
      isAuth: true
    });
  });

  socker.on('Error: Create a room first!', () => {
    console.log('Error: Create a room first!');
    this.setState({
      errorTitle: 'ROOM NOT FOUND',
      errorContent: 'Error: Create a new Room or enter the correct ROOM ID'
    });
  });

  socker.on('Error: Room already created. Join the room!', () => {
    console.log('Error: Create a new room again or Join existing one!');
    this.setState({
      errorTitle: 'ROOM ALREADY PRESENT',
      errorContent: 'Error: Join the existing room or Create a new room again'
    });
  });
}
