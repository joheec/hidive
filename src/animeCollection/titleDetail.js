import React from 'react';
import glamor from 'glamor';
import glamorous from 'glamorous';

export default ({setClickedTitle, clickedTitle}) => (
  <TitleDetailsDiv>
    <ColumnHeadDiv>
      <h3>{clickedTitle.Name}</h3>
      <p>
        {clickedTitle.ShowInfoTitle}<br />
        Rating: {clickedTitle.StarRating}
      </p>
    </ColumnHeadDiv>
    <ColumnTextDiv>
      <p>
        {clickedTitle.LongSynopsis}
      </p>
    </ColumnTextDiv>
    <ColumnImageDiv>
      <TitleDetailsImg src={clickedTitle.KeyArtUrl} alt={clickedTitle.Name} />
    </ColumnImageDiv>
    <CloseSpan onClick={() => setClickedTitle(null, null)}>X</CloseSpan>
  </TitleDetailsDiv>
);

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
  whiteSpace: 'normal',
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
