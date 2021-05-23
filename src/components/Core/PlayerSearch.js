import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom';
import { Image } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';

import playerLoading from './../../images/playerLoading.svg';
import { restUrl } from '../../env';

const customSearchClient = {
  async search(requests) {
    const res = await fetch(`${restUrl}/search`, {
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

export default class PlayerSearch extends React.Component {
  state = { searchParameter: '' };

  static contextTypes = { theme: PropTypes.object };

  static propTypes = {
    updateCurrentItem: PropTypes.func.isRequired,
    isDraftReady: PropTypes.bool.isRequired
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.searchParameter === this.state.searchParameter) {
      return false;
    }
    return true;
  }

  PlayerHits = () => {
    const CustomHits = connectHits(this.Hits);

    return (
      <div className="playerHitsBox">
        <CustomHits />
      </div>
    );
  };

  Hits = ({ hits }) => {
    const image = process.env.NODE_ENV === 'production' ? 'photo_url' : 'image';
    const name = process.env.NODE_ENV === 'production' ? 'name' : 'title';
    const rating = process.env.NODE_ENV === 'production' ? 'Overall Rating' : 'rating';
    const positions = process.env.NODE_ENV === 'production' ? 'positions' : 'genre';

    return (
      <div>
        {hits.map(item => (
          <div
            key={item.objectID}
            className="playerHitsRow"
            onClick={() => this.addItem(item)}
          >
            <div className="playerHitsImage">
              <LazyLoad height={100}>
                <Image
                  src={item[image].replace('https', 'http')}
                  onError={e => (e.target.src = playerLoading)}
                />
              </LazyLoad>
            </div>
            <div className="playerHitsContent">
              <div>{item[name]}</div>
              <div>
                <b>Rating:</b> {item[rating]} <b>Positions:</b> {item[positions]}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  addItem = item => {
    const { updateCurrentItem, isDraftReady } = this.props;
    if (isDraftReady) {
      updateCurrentItem(item);
    }
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
          indexName={process.env.NODE_ENV === 'production' ? 'dev_PLAYERS' : 'movies'}
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
            onChange={e => this.setState({ searchParameter: e.target.value })}
          />
          <this.PlayerHits />
        </InstantSearch>
      </div>
    );
  }
}
