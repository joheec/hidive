import React from 'react';
import glamor from 'glamor';
import glamorous from 'glamorous';

export default ({hoveredTitle, clickedTitle, title, category, setHoveredTitle, setClickedTitle}) => (
  <TitleDiv 
    key={title.Id}
    onMouseEnter={() => setHoveredTitle(title, category)}
    onMouseLeave={() => setHoveredTitle(null, null)}
    onClick={() => setClickedTitle(title, category)}
  >
    {
      hoveredTitle == title.Id ? 
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
);

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

