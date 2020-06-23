import React, { Component } from 'react'

const layers = [
  'trees',
  'crimes',
  'sidewalk_quality',
  '311_requests',
  //'buildings'
  /* 'sidewalk cleanliness',
     * 'restaurant inspections',
     * 'electricity consumption',
     * '311 requests',
     * 'rodent inspection (yuck)',
     * 'pollution' */
]

const exposition = {
  trees: 'https://www.kaggle.com/keyshin/nyc-trees-a-first-look',
  crimes: 'https://data.world/data-society/nyc-crime-data',
  gdelt: 'http://www.gdeltproject.org/',
  sidewalk_quality: 'lol.com'
}

const makeNameGood = (str) => {
  return str.replace('_', ' ')
}

const buildListItems = (selectedIndex) => {
  return layers.map((title, i) =>
    (<li
      key={title}
      className={selectedIndex == title && 'selected'}
    >
      <a
        onClick={(e) => { e.preventDefault() }}
        href={exposition[title]}
        target='_blank'
        id={title}
      >
        {
          makeNameGood(title)

        }
      </a>
     </li>)
  )
}
const ListView = (props) => {
  return (
    <div className='control-panel side-legend'>
      <h1>New York City Map</h1>
      <p>Suitability analysis for Appartment Buying</p>
      <ul
        className='legend'
        onClick={props.onClick}
      >
        {buildListItems(props.selectedIndex)}
      </ul>
      <p>{props.exposition}</p>
    </div>
  )
}

export default ListView
