import { getStudentTemplate } from '../templates/temlates';
import { studentsContainer } from '../main';

export function renderStudents(group) {
	studentsContainer.innerHTML = null;

	let studentOrder = 0;

	group.forEach((student) => {
		studentOrder += 1;

		studentsContainer.insertAdjacentHTML(
			'beforeend',
			getStudentTemplate(student, studentOrder),
		);
	});
}
