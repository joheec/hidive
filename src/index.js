import React from 'react';
import ReactDom from 'react-dom';
import AnimeCollection from './anime-collection';

const root = document.createElement('div');
document.body.append(root);
document.body.style.margin = 0;
document.body.style.backgroundColor = '#000000';

ReactDom.render(<AnimeCollection />, root);
