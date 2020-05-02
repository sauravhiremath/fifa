import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom';
import { Row } from 'react-bootstrap';

const searchClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

export default class Searchbar extends React.Component {
  state = {
    search: ''
  };

  Hit = ({ hit }) => (
    <Row>
      <div className="hitImage">
        <img src={hit.image} alt="player" />
      </div>
      <div className="hitName">
        <Highlight attribute="name" hit={hit} />
      </div>
      <div className="hitName">
        <Highlight attribute="Overall Rating" hit={hit} />
      </div>
    </Row>
  );

  Content = () => (
    <div className="resultsBox">
      <Hits hitComponent={this.Hit} />
    </div>
  );

  render() {
    return (
      <div>
        <InstantSearch indexName="bestbuy" searchClient={searchClient}>
          <SearchBox
            showLoadingIndicator
            translations={{
              submitTitle: 'Submit your search query.',
              resetTitle: 'Clear your search query.',
              placeholder: 'Search players here...'
            }}
          />

          <this.Content />
        </InstantSearch>
      </div>
    );
  }
}
