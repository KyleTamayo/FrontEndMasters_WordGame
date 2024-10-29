async function getWord() {
	const promise = await fetch("https://words.dev-apis.com/word-of-the-day");
	const proceedPromise = await promise.json();
	return proceedPromise["word"];
}

async function checkGuess(guess) {
	const response = await fetch("https://words.dev-apis.com/validate-word", {
		method: "POST",
		body: JSON.stringify({word: guess})
	});

	const parsedResponse = await response.json();
	return parsedResponse["validWord"];
}

function main(){
	const word = getWord();
	const inputBoxes = document.querySelectorAll(".user-input");

	let guess = "";
	let count = 0;

	const isLetter = (x) => /^[a-zA-Z]$/.test(x);

	for(let i = 0; i < inputBoxes.length; ++i) {
		inputBoxes[i].addEventListener('input', (e) => {
			if (isLetter(e.target.value)) {
				e.target.readOnly = true;
				guess += e.target.value;
				++count;
			}
			else
				console.log("Not a letter!");

			e.target.value = e.target.value.toUpperCase();
		});
	}
}


main();