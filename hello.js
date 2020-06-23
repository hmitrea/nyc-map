// Given a list of keywords and a list of search words,
// return a list of indices that indicate the beginning
// of a sequence of adjacent keywords.


// Examples:
let _ = require('lodash')
var search_list = ["hello", "hi", "hi", "greetings", "hi", "greetings", "hey", "hi"];
var keywords = ["hi", "hey", "greetings"];
// Output: [4, 5]

var search_list = ["peter", "piper", "picked", "a", "peck", "of", "pickled", "peppers", "a",
               "peck", "of", "pickled", "peppers", "peter", "piper", "picked", "if",
               "peter", "piper", "picked", "a", "peck", "of", "pickled", "peppers",
               "wheres", "the", "peck", "of", "pickled", "peppers", "peter", "piper", "picked"];
var keywords = ["a", "peter", "picked", "piper"];
// // Output: [0, 17]
//
var search_list = ["i", "saw", "susie", "sitting", "in", "a", "shoe", "shine", "shop", "where", "she",
               "sits", "she", "shines", "and", "where", "she", "shines", "she", "sits"];
var keywords = ["she", "sits", "shines"];
// Output: [11, 17]

function checkSlice (list, keywords) {
  if (keywords.length > list.length) return false
  while (list.length) {
    let val = list.pop()
    if (keywords.includes(val)) continue
    else return false
  }
  return true
}
function getIndices(search_list, keywords) {
  let indices = []

  search_list.forEach((word, index) => {

    if (keywords.includes(word)) {

      let allFound = checkSlice(search_list.slice(index+1, index+ keywords.length), _.without(keywords, word) )
      console.log(allFound)
      //console.log(_.without(keywords, word))
      //console.log(allFound, search_list.slice(index, index+ keywords.length))
      if (allFound) indices.push(index)
    }
  })
  return indices
}



console.log(getIndices(search_list, keywords))
