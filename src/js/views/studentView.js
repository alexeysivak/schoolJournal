import {
	getStudentTemplate,

} from '../templates/temlates';

import { studentsContainer} from '../main';

export function renderStudent(student, studentOrder) {
	studentsContainer.insertAdjacentHTML(
		'beforeend',
		getStudentTemplate(student, studentOrder),
	);
}


export function reRenderStudent(student, studentOrder) {
	const changedStudentTemplate = getStudentTemplate(student, studentOrder);

	const studentToChangeEl = document.querySelector(
		`.student[data-id="${student.id}"]`,
	);

	studentToChangeEl.outerHTML = changedStudentTemplate;
}

export function clearStunentsContainer() {
	studentsContainer.innerHTML = null;
}
