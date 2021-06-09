import { getStudentTemplate } from '../templates/temlates';
import { studentsContainer } from '../main';

export function renderStudent(student, studentOrder) {
	studentsContainer.insertAdjacentHTML(
		'beforeend',
		getStudentTemplate(student, studentOrder),
	);
}
