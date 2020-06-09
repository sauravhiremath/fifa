import React from 'react';
import { Input, Button, MessageBox } from 'react-chat-elements';

import { subscribeTo } from '../Socker/game.Subscriptions';

class GroupChat extends React.Component {
  state = {
    messages: ['Joined Room']
  };

  constructor(props) {
    super(props);
    subscribeTo.showPlayers((err, message) => {
      if (message) {
        console.log(message[0].username);
        // this.setState(messages => ({ messages: [...messages, message[0].username] }));
      }
    });

    subscribeTo.draftMessage((err, message) => {
      this.setState(messages => ({ messages: [...messages, message] }));
      console.log(message);
    });

    subscribeTo.playerTurnStart((err, message) => {
      this.setState(messages => ({ messages: [...messages, message] }));
      console.log(message);
    });

    subscribeTo.playerTurnEnd((err, message) => {
      this.setState(messages => ({ messages: [...messages, message] }));
      console.log(message);
    });

    subscribeTo.draftEnd((err, message) => {
      this.setState(messages => ({ messages: [...messages, message] }));
      console.log(message);
    });
  }

  showLogs = () => {
    const { messages } = this.state;

    return messages.map((message, index) => {
      return (
        <div key={index} style={{ color: 'black' }}>
          <MessageBox title position="left" type="text" text={message} />
        </div>
      );
    });
  };

  render() {
    const { message } = this.state;

    return (
      <div>
        {this.showLogs()}
        <Input
          multiline
          placeholder="Type here..."
          rightButtons={<Button color="white" backgroundColor="black" text="Send" />}
        />
      </div>
    );
  }
}

export default GroupChat;
