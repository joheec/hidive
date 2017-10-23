import React from 'react';
import glamor from 'glamor';
import glamorous from 'glamorous';

export default class TitleRows extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredTitle: null,
      clickedTitle: null,
    }

    this.setHoveredTitle = this.setHoveredTitle.bind(this);
    this.setClickedTitle = this.setClickedTitle.bind(this);
  }

  render() {
    return (
      this.props.titleRows.map(category => 
        <div key={category.Name}>
          <CategoryH3>{category.Name}</CategoryH3>
          <TitlesDiv>
            {category.Titles.map(title => 
              <TitleDiv 
                key={title.Id}
                onMouseEnter={() => this.setHoveredTitle(title, category.Name)}
                onMouseLeave={() => this.setHoveredTitle(null, null)}
                onClick={() => this.setClickedTitle(title, category.Name)}
              >
                {
                  this.state.hoveredTitle == title.Id ? 
                    <TitleOverlayDiv>
                      <TitleOverlayContentDiv>
                        <h3 style={{margin: '4px'}}>{title.Name}</h3>
                        <p style={{margin: '4px'}}>
                          Rating: {title.StarRating} | {title.ShowInfoTitle}<br/>
                          {title.ShortSynopsis}
                        </p>
                      </TitleOverlayContentDiv>
                    </TitleOverlayDiv> : 
                    null
                }
                <TitleImg src={title.MasterArtUrl} alt={title.Name} />
              </TitleDiv>
            )}
          </TitlesDiv>
          {
            this.state.clickedTitle != null && category.Name == this.state.clickedTitle.category ?
              <TitleDetailsDiv>
                <ColumnHeadDiv>
                  <h3>{this.state.clickedTitle.Name}</h3>
                  <p>
                    {this.state.clickedTitle.ShowInfoTitle}<br />
                    Rating: {this.state.clickedTitle.StarRating}
                  </p>
                </ColumnHeadDiv>
                <ColumnTextDiv>
                  <p>
                    {this.state.clickedTitle.LongSynopsis}
                  </p>
                </ColumnTextDiv>
                <ColumnImageDiv>
                  <TitleDetailsImg src={this.state.clickedTitle.KeyArtUrl} alt={this.state.clickedTitle.Name} />
                </ColumnImageDiv>
                <CloseSpan onClick={() => this.setClickedTitle(null, null)}>X</CloseSpan>
              </TitleDetailsDiv> :
              null
          }
        </div>
      )
    );
  }

  setHoveredTitle(title, titleCategory) {
    let titleId = title == null ? null : title.Id
    this.setState({hoveredTitle: titleId});
    if (this.state.clickedTitle != null && title != null && titleCategory != null && 
        this.state.clickedTitle.Id != title.Id && titleCategory == this.state.clickedTitle.category) {
      this.setState({
        clickedTitle: {
          ...title,
          category: titleCategory,
        }
      });
    }
  }

  setClickedTitle(clickedTitle, titleCategory) {
    let newState = clickedTitle == null ?  
      {clickedTitle: null} :
      {
        clickedTitle: {
          ...clickedTitle,
          category: titleCategory
        }
      }; 
    this.setState(newState);
  }
};

const CategoryH3 = glamorous.h3({
  color: '#ffffff',
  margin: '5px',
});

const TitlesDiv = glamorous.div({
  maxHeight: '254px',
  margin: '0px 5px 5px 5px',
  whiteSpace: 'nowrap',
  overflowX: 'auto',
});

const TitleDiv = glamorous.div({
  display: 'inline-block',
  position: 'relative',
  verticalAlign: 'top',
  margin: '5px',
  width: '218px',
  height: '117px',
  transitionDuration: '400ms',
  transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
  transitionDelay: '0ms',
  ':hover': {
    cursor: 'pointer',
    width: '436px',
    height: '234px',
    transitionDuration: '400ms',
    transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.1, 1)',
    transitionDelay: '0ms',
  },
});

const TitleImg = glamorous.img({
  width: '100%',
  height: '100%',
});

const TitleOverlayDiv = glamorous.div({
  position: 'absolute',
  zIndex: '2',
  width: '100%',
  height: '100%',
  color: '#ffffff',
  background: 'rgba(0, 0, 0, 0.6)',
  opacity: '0',
  ':hover': {
    opacity: '1',
    transitionDuration: '400ms',
    transitionDelay: '400ms',
  }
});

const TitleOverlayContentDiv = glamorous.div({
  whiteSpace: 'normal',
  margin: '4px',
  position: 'absolute',
  left: '0',
  bottom: '0',
});

const TitleDetailsDiv = glamorous.div({
  display: 'block',
  textAlign: 'left',
  height: '300px',
  color: '#ffffff',
});

const TitleDetailsImg = glamorous.img({
  width: '100%',
  height: '100%',
});

const ThemeColumnDiv = glamorous.div({
  display: 'inline-block',
  margin: '10px',
  verticalAlign: 'top',
  height: '100%',
  color: '#ffffff',
});

const ColumnHeadDiv = glamorous(ThemeColumnDiv)({
  width: '20%'
});

const ColumnTextDiv = glamorous(ThemeColumnDiv)({
  width: '30%',
});

const ColumnImageDiv = glamorous(ThemeColumnDiv)({
  width: '45%',
});

const CloseSpan = glamorous.span({
  cursor: 'pointer',
  position: 'absolute',
  right: '50px',
});
