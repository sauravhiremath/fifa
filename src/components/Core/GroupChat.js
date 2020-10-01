import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, MessageList } from 'react-chat-elements';

import { subscribeTo } from '../Socker/game.Subscriptions';

class GroupChat extends React.Component {
  state = {
    messages: []
  };

  static propTypes = {
    setParentStates: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    subscribeTo.showPlayers((err, message) => {
      let convertedMsg = '';
      message.forEach(player => {
        convertedMsg += `${player.username} is ${
          player.isReady ? 'ready' : 'not ready'
        } \n`;
      });
      const systemMsg = {
        position: 'right',
        notch: false,
        date: null,
        type: 'text',
        text: convertedMsg
      };
      this.setState(state => ({
        messages: [...state.messages, systemMsg]
      }));
      console.log(message);
    });

    subscribeTo.draftStart((err, message) => {
      const systemMsg = {
        position: 'right',
        notch: false,
        date: null,
        type: 'text',
        text: message
      };
      this.setState(state => ({ messages: [...state.messages, systemMsg] }));
      this.props.setParentStates([{ isDraftReady: true }]);

      console.log(message);
    });

    subscribeTo.playerCollections((err, message) => {
      this.props.setParentStates([{ allCollections: message }]);
      console.log(message);
    });

    subscribeTo.myTurnStart((err, message) => {
      const systemMsg = {
        position: 'right',
        notch: false,
        date: null,
        type: 'text',
        text: message
      };

      this.setState(state => ({ messages: [...state.messages, systemMsg] }));
      this.props.setParentStates([{ isTurn: true }]);
      console.log(message);
    });

    subscribeTo.playerTurnStart((err, message) => {
      const systemMsg = {
        position: 'right',
        notch: false,
        date: null,
        type: 'text',
        text: message
      };

      const currentUsername = message.replace(/ .*/, '');

      this.setState(state => ({ messages: [...state.messages, systemMsg] }));
      this.props.setParentStates([{ currentUsername }]);
      console.log(message);
    });

    subscribeTo.personalTurnEnd((err, message) => {
      const systemMsg = {
        position: 'right',
        notch: false,
        date: null,
        type: 'text',
        text: message
      };

      this.setState(state => ({ messages: [...state.messages, systemMsg] }));
      this.props.setParentStates([{ isTurn: false }]);
      console.log(message);
    });

    subscribeTo.playerTurnEnd((err, message) => {
      const systemMsg = {
        position: 'right',
        notch: false,
        date: null,
        type: 'text',
        text: message
      };

      this.setState(state => ({ messages: [...state.messages, systemMsg] }));
      console.log(message);
    });

    subscribeTo.draftEnd((err, message) => {
      const systemMsg = {
        position: 'right',
        notch: false,
        date: null,
        type: 'text',
        text: message
      };

      this.setState(state => ({ messages: [...state.messages, systemMsg] }));
      console.log(message);
    });
  }

  render() {
    const { messages } = this.state;

    return (
      <div>
        <div
          style={{
            color: '#88898a',
            fontSize: '0.5em',
            height: '40vh',
            overflowY: 'scroll'
          }}
        >
          <MessageList
            className="group-chat"
            lockable={false}
            toBottomHeight="100%"
            dataSource={messages}
            style={{}}
          />
        </div>
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
