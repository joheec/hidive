import React from 'react';
import ReactDom from 'react-dom';

//Requires a proxy otherwise response is missing Access-Control-Allow-Origin header.
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://d10xkldqejj5hr.cloudfront.net/dev/dashboard.json';

const root = document.createElement('div');
document.body.append(root);

class Videos extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    }
  }

  render() {
    return (
      <div>Hi</div>
    );
  }

  componentDidMount() {
    fetch(proxyUrl + url)
      .then(response => {
        response.json()
          .then(content => {
            this.setState({...content});
            console.log(this.state);
            return this.state['loading'];
          })
          .then(loadingStatus => {
            if (loadingStatus) {
              this.setState({loading: false});
            }
          })
          .catch(() => {
            console.log('Unable to set state with JSON');
          });
      })
      .catch(() => {
        console.log('Error in fetching JSON');
      });
  }
}

ReactDom.render(<Videos />, root);
