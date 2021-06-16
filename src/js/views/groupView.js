import {
	getStudentTemplate,
	getGroupInfoTemplate,
} from '../templates/temlates';
import { studentsContainer, groupInfoBlock } from '../main';

export function renderStudent(student, studentOrder) {
	studentsContainer.insertAdjacentHTML(
		'beforeend',
		getStudentTemplate(student, studentOrder),
	);
}

export function renderGroupInfo(averageMark, gropName) {
	groupInfoBlock.innerHTML = null;

	const groupInfoTemplate = getGroupInfoTemplate(averageMark, gropName);
	groupInfoBlock.insertAdjacentHTML('afterbegin', groupInfoTemplate);
}

export function reRenderStudent(student, studentOrder) {
	const changedStudentTemplate = getStudentTemplate(student, studentOrder);

	const studentToChangeEl = document.querySelector(
		`.student[data-id="${student.id}"]`,
	);

	studentToChangeEl.outerHTML = changedStudentTemplate;
}
