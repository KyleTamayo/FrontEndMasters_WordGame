async function main() {
	const userInput = document.querySelectorAll(".user-input");
	let guess = "";
	let guessCount = 0;

	const res = await fetch("https://words.dev-apis.com/word-of-the-day");
	const { word: wordRes } = await res.json();
	const word = wordRes.toUpperCase();
	const wordParts = word.split("");

	const isLetter = (letter) => /^[a-zA-Z]$/.test(letter);

	async function commit(guess) {
		const res = await fetch("https://words.dev-apis.com/validate-word", {
			method: "POST",
			body: JSON.stringify({word: guess})
		});

		const parRes = await res.json();
		
		if (parRes["validWord"] == true){
			alert("VICTORY");
		}
	}	

	userInput.forEach( (inputBox) => {
		inputBox.addEventListener('input', (e) => {
			if (isLetter(e.target.value)) {
				e.target.value = e.target.value.toUpperCase();
				e.target.readOnly = true;
				guess += e.target.value;
				++guessCount;
				console.log(e.target.value);
			}

			if (guessCount == 5) {
				commit(guess);
			}
		});
	});
}

main();