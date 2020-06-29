import React, { Component } from 'react'
import styled from 'styled-components'



let complaints = [
'Blocked-Driveway',
'Street-Light-Condition',
'UNSANITARY-CONDITION',
'GENERAL-CONSTRUCTION',
'Water-System',
'HEAT-HOT-WATER',
'HEATING',
'Illegal-Parking',
'Noise---Residential',
'Noise---Street-Sidewalk',
'PLUMBING',
'Street-Condition'
]
const layers = complaints

const exposition = {
}

const makeNameGood = (str) => {
  return str.replace('_', ' ')
}

const Link = styled.a`
  color: white;
  text-decoration: none;
`;

const buildListItems = (selectedIndex) => {
  return layers.map((title, i) =>
    (<li
      key={title}
      className={selectedIndex == title && 'selected'}
    >
      <Link
        onClick={(e) => { e.preventDefault() }}
        href={'#' + title}
        target='_blank'
        id={title}
      >
        {
          makeNameGood(title)

        }
      </Link>
     </li>)
  )
}

const List = styled.section`
  background: transparent;
  border-radius: 3px;
  margin: 0 1em;
  padding: 0.25em 1em;
`

const Blurb = styled.section`
  border-radius: 3px;
  margin: 0 1em;
  padding: 0.25em 1em;
  position: fixed;
  top: 50px;
  z-index: 1000;
  background: rgb(41, 50, 60);
  background-opacity: .9;
  color: lightgrey;
`

const ListView = (props) => {
  return (
    <Blurb>
      <h1>Map of New York City</h1>
      <p>Suitability Analysis for Appartment Rentals/Buying</p>
      <h4>311 complaint - heatmap</h4>
      <List onClick={props.onClick}>
        {buildListItems(props.selectedIndex)}
      </List>
      <p>{props.exposition}</p>
    </Blurb>
  )
}

export default ListView
