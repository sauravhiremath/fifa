import React from 'react';
import GridLayout from 'react-grid-layout';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Highlight, connectHits } from 'react-instantsearch-dom';
import { Row } from 'react-bootstrap';

import 'react-resizable/css/styles.css';
import 'react-grid-layout/css/styles.css';

const searchClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

export default class Searchbar extends React.Component {
  state = {
    search: ''
  };

  PlayerHits = () => {
    const CustomHits = connectHits(this.Hits);
    return (
      <div className="resultsBox">
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
            className="playerRow"
            onClick={() => {
              this.updatePlayerList(item);
            }}
          >
            <div className="playerImage">
              <img src={item.image} alt="" />
            </div>
            <div className="playerContent">
              <div>{item.name}</div>
              <div>{item.text}</div>
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
    return (
      <div className="d-none d-sm-block">
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
