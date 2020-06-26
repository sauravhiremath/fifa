import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { ContentDialog } from 'react-uwp';

export default class ErrorHandler extends React.Component {
  /**
   * Render Error modal
   * Received props -> redirectUrl  string       - URL to redirect to, after processing error
   *                -> error        Object       - Topic and Message for the error
   *                -> resetError   function     - Reset Error state on parent component
   */
  state = {
    redirect: false
  };

  static propTypes = {
    redirectUrl: PropTypes.string.isRequired,
    error: PropTypes.object.isRequired,
    resetError: PropTypes.func.isRequired
  };

  handleError = () => {
    const { resetError } = this.props;
    this.setState({ redirect: true });
    resetError();
  }

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
          primaryButtonAction={() => this.handleError()}
          closeButtonAction={() => this.handleError()}
          primaryButtonText="Redirect back"
          secondaryButtonText={null}
          onCloseDialog={() => {
            this.handleError();
          }}
        />
      </div>
    );
  }
}
