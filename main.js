let guess = "";
let count = 0;
let word = "";

const playerGuess = document.querySelector(".guess-1");

const isLetter = (x) => /^[a-zA-Z]$/.test(x);

async function getWord() {
	const promise = await fetch("https://words.dev-apis.com/word-of-the-day");
	const proceedPromise = await promise.json();
	word = proceedPromise["word"].toUpperCase();
}

async function checkGuess(guess) {
	const response = await fetch("https://words.dev-apis.com/validate-word", {
		method: "POST",
		body: JSON.stringify({word: guess})
	});
	console.log(response);
	// console.log(response);
	const parsedResponse = await response.json;
	console.log(parsedResponse);
}

playerGuess.addEventListener('input', function (event) {
	event.target.value = event.target.value.toUpperCase()
	if (isLetter(event.target.value)) {
		event.target.readOnly = true
		guess += event.target.value
		++count;
	}
	else
		console.log("Not a letter!")

	if (count == 5){
		for (let i = 0; i < 5; ++i) {
			if (word[i] != guess[i])
				console.log("Fail")
		}
		checkGuess(guess.toLowerCase());
		guess = "";
	}
});

getWord();