import React from 'react';
import glamor from 'glamor';
import glamorous from 'glamorous';
import Title from './title';
import TitleDetail from './titleDetail';

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
            {
              category.Titles.map(title => 
                <Title key={title.Id}
                  hoveredTitle={this.state.hoveredTitle}
                  clickedTitle={this.state.clickedTitle}
                  title={title}
                  category={category.Name}
                  setHoveredTitle={this.setHoveredTitle}
                  setClickedTitle={this.setClickedTitle}
                />
              )
            }
          </TitlesDiv>
          {
            this.state.clickedTitle != null && category.Name == this.state.clickedTitle.category ?
              <TitleDetail 
                setClickedTitle={this.setClickedTitle}
                clickedTitle={this.state.clickedTitle}
              /> :
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
  maxHeight: '554px',
  margin: '0px 5px 5px 5px',
  whiteSpace: 'nowrap',
  overflowX: 'auto',
});
