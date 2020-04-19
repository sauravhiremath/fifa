import React from 'react';

export default class Welcome extends React.Component {
  render() {
    const { username } = this.state;
    return (
      <div>
        Welcome { username }
      </div>
    );
  }
}
