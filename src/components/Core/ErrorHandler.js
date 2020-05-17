import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { ContentDialog } from 'react-uwp';

export default class ErrorHandler extends React.Component {
  /**
   * Render Error modal
   * Received props -> Redirect URL
   *                -> Erorr Topic and Message
  */
  state = {
    redirect: false
  };

  static propTypes = {
    redirectUrl: PropTypes.string.isRequired,
    error: PropTypes.object.isRequired
  };

  render() {
    const { redirectUrl, error } = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return (
        <div>
          <Redirect exact to={`${redirectUrl}`} />
        </div>
      );
    }

    return (
      <div>
        <ContentDialog
          title={`${error.title}`}
          content={`${error.content}`}
          defaultShow="true"
          primaryButtonAction={() => this.setState({ redirect: true })}
          secondaryButtonAction={() => this.setState({ redirect: true })}
          closeButtonAction={() => this.setState({ redirect: true })}
          primaryButtonText="Redirect back"
          secondaryButtonText={null}
          onCloseDialog={() => {
            this.setState({ redirect: true });
          }}
        />
      </div>
    );
  }
}
