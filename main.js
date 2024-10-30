const ANSWER_LENGTH = 5;
const ROUNDS = 6;
const INPUT_BOXES = document.querySelectorAll(".user-input");

async function main() {
	let row = 0;
	let guess = "";
	let done = false;

	const res = await fetch("https://words.dev-apis.com/word-of-the-day");
	const { word: wordRes } = await res.json();
	const word = wordRes.toUpperCase();
	const wordParts = word.split("");
	
	console.log(word);	
}

main();