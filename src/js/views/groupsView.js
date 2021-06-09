import {
	getGroupTemplate,
	creationFormTemplate,
	groupDeletionConfirmation,
	addStudentFormTemplate,
	addStudentForbiddanceTemplate,
} from '../templates/temlates';
import { mainContainer, groupsContainer, studentsContainer } from '../main';

export function renderGroup(group) {
	groupsContainer.insertAdjacentHTML('beforeend', getGroupTemplate(group));
}

export function clearGroupsContainer() {
	groupsContainer.innerHTML = null;
}

export function clearStunentsContainer() {
	studentsContainer.innerHTML = null;
}

export function deleteGroupEl(groupId) {
	const groupEl = document.querySelector(
		`.groups__group[data-id="${groupId}"]`,
	);

	groupEl.remove();
}

export function showGroupNameModal() {
	mainContainer.insertAdjacentHTML('beforeend', creationFormTemplate);
}

export function showAddStudentModal() {
	mainContainer.insertAdjacentHTML('beforeend', addStudentFormTemplate);
}

export function showForbiddanceModal() {
	mainContainer.insertAdjacentHTML(
		'beforeend',
		addStudentForbiddanceTemplate,
	);
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
	mainContainer.insertAdjacentHTML('beforeend', groupDeletionConfirmation);
}
