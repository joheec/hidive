import React from 'react';
import ReactDom from 'react-dom';
import glamor from 'glamor';
import glamorous from 'glamorous';

//Requires a proxy otherwise response is missing Access-Control-Allow-Origin header.
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
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
