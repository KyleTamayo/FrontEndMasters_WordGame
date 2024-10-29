let guess = "";
let count = 0;
let word = "";

const playerGuess = document.querySelector(".guess-1");

async function getWord() {
	const promise = await fetch("https://words.dev-apis.com/word-of-the-day");
	const proceedPromise = await promise.json();
	word = proceedPromise["word"].toUpperCase();
}

async function checkGuess(guess) {
	const response = await fetch("https://words.dev-apis.com/validate-word", {
		method: "POST",
		body: JSON.stringify({ "word": guess.toLowerCase() })
	});
	const parsedResponse = await JSON.parse(response);
	console.log(parsedResponse);
}

playerGuess.addEventListener('input', function (event) {
	event.target.readOnly = true
	event.target.value = event.target.value.toUpperCase()
	guess += event.target.value
	++count;

	if (count == 5){
		for (let i = 0; i < 5; ++i) {
			if (word[i] != guess[i])
				console.log("Fail")
		}
		checkGuess(guess)
		guess = ""
	}


});

function main() {
	getWord();
}

main();