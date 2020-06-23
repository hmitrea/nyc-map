const fs = require('fs-extra')

const trie = {}

const index_emails = function (path_to_directory) {
  const files = fs.readdirSync(path_to_directory)
  files.forEach((file, idx) => {
    const email = fs.readFileSync(path_to_directory + file).toString()
    const words = [...email.matchAll(/\w+/g)].map(d => d[0])
    _add(words, file)
  })
}

const test = (word, node = trie) => {
  for (var leaf in node) {
    if (word.indexOf(leaf) === 0) {
      const val = typeof node[leaf] === 'number' && node[leaf]
        ? dict._suffix[node[leaf]] : node[leaf]

      if (leaf.length === word.length) return node[leaf].files
      else return test(word.slice(leaf.length), val)
    }
  }

  return false
}

const _add = (words, file) => {
  words.forEach((word, i) => {
    const letters = word.split(''); let node = trie
    letters.forEach((char, j) => {
      const letter = letters[j]; const pos = node[letter]

      if (pos == null) node = node[letter] = j === letters.length - 1 ? 0 : {}
      else if (pos === 0) {
				console.log(node, letter)
				if (! node[letter].files)
					node = node[letter] = { _suffix: 0, files: [file] }
				else {
					node[letter].files.push(file)
				}
			}
      else node = node[letter]

    })
  })
}

index_emails('/home/ubuntu/nyc-map/enron/skilling-j/all_documents/')
console.log(test('message'))

module.exports = { index_emails, test, _trie: trie }
