async function getWord() {
	const promise = await fetch("https://words.dev-apis.com/word-of-the-day");
	const proceedPromise = await promise.json();
	word = proceedPromise["word"].toUpperCase();
	console.log(word);
}

async function checkGuess(guess) {
	const response = await fetch("https://words.dev-apis.com/validate-word", {
		method: "POST",
		body: JSON.stringify({word: guess})
	});

	const parsedResponse = await response.json();
	console.log(parsedResponse["validWord"]);
	return parsedResponse["validWord"];
}

function main(){
	const word = getWord();
	const inputBoxes = document.querySelectorAll(".user-input");

	let guess = "";
	let count = 0;
	let i = 0;
	let j = 0;

	const isLetter = (x) => /^[a-zA-Z]$/.test(x);

	for(; i < inputBoxes.length; ++i) {
		inputBoxes[i].addEventListener('input', (e) => {
			e.target.value = e.target.value.toUpperCase()

			if (isLetter(e.target.value)) {
				e.target.readOnly = true;
				guess += e.target.value;
				++count;
			}
			else
				console.log("Not a letter!");

			if (count % 5 == 0){
				if(checkGuess(guess.toLowerCase())){
					for(j = count - 1; j >= count-5; --j){
						inputBoxes[j].style.backgroundColor = "green";
					}
				}
				guess = "";
			}
		});
	}
}


main();