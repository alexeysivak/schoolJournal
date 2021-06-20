import { mainContainer } from '../main';
import JournalData from '../data/JournalData';
import {
	addGroupFormTemplate,
	deletionConfirmationModal,
	addStudentFormTemplate,
	addStudentForbiddanceTemplate,
	getStudentEditionModalTemplate,
	getStudentInfoModalTemplate,
	appErrorModal,
	groupDataErrorModal,
	deletionErrorModal,
} from '../templates/temlates';

export function showFormError(fieldName, errorTemplate) {
	clearErrors();

	const wrongEl = document.querySelector(`[name="${fieldName}"]`);

	wrongEl.insertAdjacentHTML('afterend', errorTemplate);
}

function clearErrors() {
	const ERROR_MESSAGE_CLASS = '.error-message';

	const errorsElements = document.querySelectorAll(ERROR_MESSAGE_CLASS);

	for (let i = 0; i < errorsElements.length; i++) {
		errorsElements[0].remove();
	}
}

export function closeForm() {
	const modalContainer = document.getElementById('modalContainer');

	modalContainer.remove();
}

export function showGroupNameModal() {
	mainContainer.insertAdjacentHTML('beforeend', addGroupFormTemplate);
}

export function showAddStudentModal() {
	mainContainer.insertAdjacentHTML('beforeend', addStudentFormTemplate);
}

export function showForbiddanceModal() {
	mainContainer.insertAdjacentHTML('beforeend', addStudentForbiddanceTemplate);
}

export function showErrorModals(validationResult) {
	for (let key in validationResult) {
		const errorField = document.querySelector(`[name = ${key}]`);

		errorField.insertAdjacentHTML('afterend', validationResult[key]);
	}
}

export function clearModalErrors() {
	const errors = document.querySelectorAll('.error-message');

	if (errors.length) {
		Array.from(errors).forEach((error) => error.remove());
	}
}

export function showConfirmationModal() {
	mainContainer.insertAdjacentHTML('beforeend', deletionConfirmationModal);
}

export function showStudentEditModal(studentId) {
	const neededStudent = JournalData.getStudent(studentId);

	mainContainer.insertAdjacentHTML('beforeend', getStudentEditionModalTemplate(neededStudent));
}

export function showStudentInfoModal(studentId) {
	const neededStudent = JournalData.getStudent(studentId);

	mainContainer.insertAdjacentHTML('beforeend', getStudentInfoModalTemplate(neededStudent));
}

export function showAppError() {
	mainContainer.insertAdjacentHTML('beforeend', appErrorModal);
}
