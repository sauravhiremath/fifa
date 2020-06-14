import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom';

const customSearchClient = {
  async search(requests) {
    const res = await fetch('http://localhost:3003/search', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: Cookies.get('fifa-profile')
      },
      body: JSON.stringify({ requests })
    });
    return res.json();
  }
};

export default class Game extends React.Component {
  static contextTypes = { theme: PropTypes.object };

  static propTypes = {
    addPlayer: PropTypes.func.isRequired
  };

  PlayerHits = () => {
    const CustomHits = connectHits(this.Hits);

    return (
      <div className="playerHitsBox">
        <CustomHits />
      </div>
    );
  };

  Hits = ({ hits }) => {
    return (
      <div>
        {hits.map(item => (
          <div
            key={item.objectID}
            className="playerHitsRow"
            onClick={() => {
              this.updatePlayerList(item);
            }}
          >
            <div className="playerHitsImage">
              <img src={item.photo_url} alt="" />
            </div>
            <div className="playerHitsContent">
              <div>{item.name}</div>
              <div>
                <b>Rating:</b> {item['Overall Rating']}  <b>Positions:</b> {item.positions}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  updatePlayerList = playerInfo => {
    const { addPlayer } = this.props;
    addPlayer(playerInfo);
  };

  render() {
    const { theme } = this.context;

    return (
      <div
        className="items-collection d-none d-sm-block"
        style={{
          background: theme.useFluentDesign ? theme.acrylicTexture80.background : 'none'
        }}
      >
        <InstantSearch
          indexName="dev_PLAYERS"
          searchClient={customSearchClient}
          stalledSearchDelay={500}
        >
          <SearchBox
            showLoadingIndicator
            translations={{
              submitTitle: 'Submit your search query.',
              resetTitle: 'Clear your search query.',
              placeholder: 'Search players here...'
            }}
          />
          <this.PlayerHits />
        </InstantSearch>
      </div>
    );
  }
}
