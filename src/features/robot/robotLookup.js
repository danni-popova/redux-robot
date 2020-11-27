export const lookUpWord = async (letter) => {
    const response = await fetch(`https://api.datamuse.com/words?sp=${letter}*&max=10000`);
    return await response.json()[Math.floor(Math.random() * 10000)].word;
}