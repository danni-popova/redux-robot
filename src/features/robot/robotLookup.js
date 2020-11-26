export const lookUpWord = (letter) => {
    fetch("https://api.datamuse.com/words?sp=" + letter + "*&max=10000")
        .then(response => response.json())
        .then(result => console.log(result[Math.floor(Math.random() * 10000)].word))
        .catch(error => console.log('error', error));
}