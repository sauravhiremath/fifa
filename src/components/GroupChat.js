import React from 'react';
import { Input, Button, MessageBox } from 'react-chat-elements';
import { socker } from './Socker';

class GroupChat extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>
          <MessageBox
            position="left"
            type="text"
            text="Hey, wanna team up in this?"
            data={{
              uri: 'https://facebook.github.io/react/img/logo.svg',
              status: {
                click: false,
                loading: 0
              }
            }}
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
