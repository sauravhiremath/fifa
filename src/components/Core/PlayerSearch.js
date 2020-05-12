import React from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

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
              <div>{item.rating}</div>
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
        className="d-none d-sm-block"
        style={{ background: theme.useFluentDesign ? theme.acrylicTexture80.background : 'none' }}
      >
        <InstantSearch indexName="bestbuy" searchClient={searchClient}>
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
