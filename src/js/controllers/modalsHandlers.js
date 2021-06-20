import TargetDefiner from '../helpers/TargetDefiner';

import { closeForm, showStudentEditModal, showDeletionErrorModal } from '../views/modalsView';

import { addStudent, changeStudent, deleteStudent } from './studentsController';

import { deleteGroup, addGroup } from './groupsController';

import { GROUP_CLASS, STUDENT_CLASS } from '../helpers/configs';

export function listenInfoModal(targetId) {
	const studentInfoBlock = document.getElementById('studentInfoBlock');

	studentInfoBlock.addEventListener('click', (e) => {
		if (TargetDefiner.isStudentEditBtn(e.target)) {
			closeForm();
			showStudentEditModal(targetId);

			listenStudentEditModal(targetId);
		}

		if (TargetDefiner.isFormCloseBtn(e.target)) {
			closeForm();
		}
	});
}

export function listenConfirmationModal(target, targetClass) {
	const confirmationForm = document.getElementById('confirmationForm');

	confirmationForm.addEventListener('click', (e) => {
		if (TargetDefiner.isDeleteBtn(e.target) && targetClass === GROUP_CLASS) {
			const targetId = target.closest('.groups__group').dataset.id;
			deleteGroup(targetId);
		}

		if (TargetDefiner.isDeleteBtn(e.target) && targetClass === STUDENT_CLASS) {
			deleteStudent(target);
		}

		if (TargetDefiner.isCancelBtn(e.target)) {
			closeForm();
		}
	});
}

export function listenGroupNameModal() {
	const addingForm = document.getElementById('addingForm');

	addingForm.addEventListener('submit', onAddingFormSubmit);
	addingForm.addEventListener('click', onFormClick);
}

export function listenAddStudentModal() {
	const addingForm = document.getElementById('addingForm');

	addingForm.addEventListener('submit', onAddingFormSubmit);
	addingForm.addEventListener('click', onFormClick);
}

function onAddingFormSubmit(e) {
	e.preventDefault();

	const formData = new FormData(this);

	if (TargetDefiner.isAddGroupBtn(e.target)) {
		addGroup(formData);
	}

	if (TargetDefiner.isAddStudentBtn(e.target)) {
		addStudent(formData);
	}
}

export function listenStudentEditModal(targetId) {
	const changingForm = document.getElementById('changingForm');

	changingForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const formData = new FormData(changingForm);
		changeStudent(formData, targetId);
	});

	changingForm.addEventListener('click', onFormClick);
}

export function listenErrorModal() {
	const errorBlock = document.getElementById('errorBlock');

	errorBlock.addEventListener('click', onFormClick);
}

export function onFormClick(e) {
	e.stopPropagation();

	if (TargetDefiner.isFormCloseBtn(e.target)) {
		closeForm();
	}
}
