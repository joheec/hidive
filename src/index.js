import React from 'react';
import ReactDom from 'react-dom';
import glamor from 'glamor';
import glamorous from 'glamorous';

//Requires a proxy otherwise response is missing Access-Control-Allow-Origin header.
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const localProxyUrl = 'http://localhost:8081/';
const url = 'https://d10xkldqejj5hr.cloudfront.net/dev/dashboard.json';

const root = document.createElement('div');
document.body.append(root);
document.body.style.margin = 0;
document.body.style.backgroundColor = '#000000';

class Videos extends React.Component {
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
          this.state.TitleRows.map(category => 
            <div key={category.Name}>
              <CategoryDiv>{category.Name}</CategoryDiv>
              <TitlesDiv>
                {category.Titles.map(title => 
                  <TitleDiv key={title.Id}>
                    <TitleImg src={title.KeyArtUrl} alt={title.Name} />
                  </TitleDiv>
                )}
              </TitlesDiv>
            </div>
          )
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
            console.log(this.state);
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

const CategoryDiv = glamorous.div({
  color: '#ffffff',
  margin: '5px',
});

const TitlesDiv = glamorous.div({
  height: '127px',
  margin: '0px 5px 5px 5px',
  whiteSpace: 'nowrap',
  overflowX: 'auto',
});

const TitleDiv = glamorous.div({
  display: 'inline-block',
  margin: '5px',
  width: '218px',
  height: '117px',
});

const TitleImg = glamorous.img({
  width: '218px',
  height: '117px',
});

ReactDom.render(<Videos />, root);
