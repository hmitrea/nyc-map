import React, { Component } from 'react'
import styled from 'styled-components'



let complaints = [
'311-Blocked-Driveway',
'311-Street-Light-Condition',
'311-UNSANITARY-CONDITION',
'311-GENERAL-CONSTRUCTION',
'311-Water-System',
'311-HEAT-HOT-WATER',
'311-HEATING',
'311-Illegal-Parking',
'311-Noise---Residential',
'311-Noise---Street-Sidewalk',
'311-PLUMBING',
'311-Street-Condition'
]
const layers = complaints

const exposition = {
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
        href={'#'}
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
  background: lightgrey;
  background-opacity: .9;
  color: rgb(35, 28, 51);
`

const ListView = (props) => {
  return (
    <Blurb>
      <h1>Map of New York City</h1>
      <p>Suitability Analysis for Appartment Rentals/Buying</p>
      <List onClick={props.onClick}>
        {buildListItems(props.selectedIndex)}
      </List>
      <p>{props.exposition}</p>
    </Blurb>
  )
}

export default ListView
