import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'QZWP9XEPO2',
  '0f2689a6db4288bb1cf5436490b6514b',
);

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  render() {
    return (
      <div>
        <InstantSearch indexName="instant_search" searchClient={searchClient}>
          <SearchBox
            showLoadingIndicator
            translations={{
              submitTitle: 'Submit your search query.',
              resetTitle: 'Clear your search query.',
              placeholder: 'Search players here...',
            }}
          />
        </InstantSearch>
      </div>
    );
  }
}
