import React from 'react';
import glamor from 'glamor';
import glamorous from 'glamorous';
import TitleRows from './titleRows';

//Requires a proxy otherwise response is missing Access-Control-Allow-Origin header.
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const localProxyUrl = 'http://localhost:8081/';
const url = 'https://d10xkldqejj5hr.cloudfront.net/dev/dashboard.json';

export default class AnimeCollection extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    }

    this.fetchJson = this.fetchJson.bind(this);
  }

  render() {
    return (
      <BackgroundDiv>
        {
          this.state.loading == true ? 
            <LoadingDiv>Currently loading...</LoadingDiv> :
            <TitleRows titleRows={this.state.TitleRows}/>
        }
      </BackgroundDiv>
    );
  }

  componentDidMount() {
    this.fetchJson(proxyUrl + url)
      .then(response => {
        if (response) {
          console.log(`Attempting fetch with cors-proxy hosted locally at ${localProxyUrl}.`);
          this.fetchJson(localProxyUrl + url);
        }
      });
  }

  fetchJson(url) {
    return fetch(url)
      .then(response => 
        response.json()
          .then(content => {
            if (!content) {
              throw new Error('No content received from fetch');
            }
            this.setState({...content});
            return this.state['loading'];
          })
          .then(loadingStatus => {
            if (loadingStatus) {
              this.setState({loading: false});
            }
          })
          .catch(e => {
            console.log(`Unable to set state with JSON (${e})`);
            return e;
          })
      )
      .catch(e => {
        console.log(`Unable to fetch JSON using ${url} (${e})`);
        return e
      });
  }

}

const LoadingDiv = glamorous.div({
  color: '#ffffff',
});

const BackgroundDiv = glamorous.div({
  margin: '4%',
});
