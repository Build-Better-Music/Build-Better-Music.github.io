function gradeQuiz(quizID, optionID) {
	var quiz = document.getElementById(quizID);
	console.log(quizID)
	var answer = quiz.dataset.answer;
	var optionChosen = optionID.substr(optionID.length - answer.length);

	var explanation = quiz.getElementsByClassName('answer-explanation')[0];
	explanation.style.display = "block";

	if (answer == optionChosen) {
		var complimentStrings = ['Good Job!', 'You\'re Right!', 'Nice Work!', 'Keep it up!', 'You got this!'];
		var compliment = complimentStrings[Math.floor(Math.random() * complimentStrings.length)]
		explanation.innerHTML = '<p>' + compliment + '</p>' + explanation.innerHTML;
		var optioncheckbox = document.getElementById(optionID);
		optioncheckbox.checked = true;
		optioncheckbox.parentElement.classList.add('right-answer');
	} else {
		var optioncheckbox = document.getElementById(optionID);
		optioncheckbox.checked = true;
		optioncheckbox.parentElement.classList.add('wrong-answer');
		document.getElementById(quizID + answer).checked = true;
	}

	//disables all the checkboxes
	var options = quiz.getElementsByClassName('option');
	for (let i = 0; i < options.length; i++) {
		options[i].disabled = true;
	}
	var optionlabels = quiz.getElementsByClassName('optionlabel');
	for (let i = 0; i < optionlabels.length; i++) {
		optionlabels[i].onclick = '';
	}
}

function prepQuizes() {
	var quizes = document.getElementsByClassName('quiz');
	for (let i = 0; i < quizes.length; i++) {
		(function () {
			var quiz = quizes[i];
			var quizID = quiz.id;
			var options = quiz.getElementsByClassName('optionlabel');
			for (let j = 0; j < options.length; j++) {
				var option = options[j];
				(function (opt) {
					opt.onclick = function () {
						gradeQuiz(quizID, opt.getAttribute("for"));
					};
				})(option)
			}
		})()
	}
}

window.addEventListener('DOMContentLoaded', prepQuizes)
