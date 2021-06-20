import { renderData } from '../main';

import MockApi from '../MockApi';
import JournalData from '../data/JournalData';

import { listenErrorModal } from './modalsHandlers';

import { renderGroupInfo } from '../views/groupsView';
import { renderStudent, reRenderStudent } from '../views/studentView';
import { closeForm, clearModalErrors, showErrorModals, showAppError } from '../views/modalsView';

import { validateStudentObject } from '../helpers/validateInputs';

export async function addStudent(formData) {
	const preparedStudent = prepareNewStudent(formData);

	if (preparedStudent) {
		try {
			const newStudent = await MockApi.createStudent(preparedStudent);

			closeForm();

			JournalData.addStudent(newStudent);

			renderStudent(newStudent, JournalData.getStudentsIndex(newStudent) + 1);

			renderGroupInfo();
		} catch (e) {
			showAppError();
			listenErrorModal();

			console.error(e);
			console.log('file: studentController', 'addStudent()');
			return;
		}
	}
}

export async function changeStudent(formData, targetId) {
	const changedStudentData = prepareNewStudent(formData);

	if (changedStudentData) {
		const changedStudent = JournalData.changeStudent(targetId, changedStudentData);

		try {
			await MockApi.changeStudent(changedStudent);
		} catch (e) {
			showAppError();
			listenErrorModal();

			console.error(e);
			console.log('file: studentController', 'changeStudent()');
			return;
		}

		reRenderStudent(changedStudent, JournalData.getStudentsIndex(changedStudent) + 1);

		closeForm();

		renderGroupInfo();
	}
}

function prepareNewStudent(formData) {
	const newStudent = {};

	for (let [key, value] of formData.entries()) {
		if (key === 'marks') {
			newStudent[key] = value.split(',');
		} else {
			newStudent[key] = value;
		}
	}

	newStudent.groupId = newStudent.groupId ? newStudent.groupId : JournalData.chosenGroupId;

	const validationResult = validateStudentObject(newStudent);

	clearModalErrors();

	if (Object.getOwnPropertyNames(validationResult).length) {
		showErrorModals(validationResult);
		return null;
	}

	return newStudent;
}

export async function addMark(newMark, studentId) {
	if (newMark && newMark !== '0' && newMark <= 12) {
		const student = JournalData.getStudent(studentId);

		try {
			await MockApi.changeStudent(student);
		} catch (e) {
			showAppError();
			listenErrorModal();

			console.error(e);
			console.log('file: studentController', 'changeStudent()');
			return;
		}

		student.marks.push(newMark);

		reRenderStudent(student, JournalData.getStudentsIndex(student));

		renderGroupInfo();
	}
}

export async function deleteStudent(chosenStudent) {
	const chosenStudentId = chosenStudent.dataset.id;

	closeForm();
	try {
		await MockApi.deleteStudent(chosenStudentId);
	} catch (e) {
		showAppError();
		listenErrorModal();

		console.error(e);
		console.log('file: studemtController', 'deleteStudent()');
		return;
	}

	chosenStudent.remove();

	JournalData.deleteStudent(chosenStudentId);

	renderData(JournalData.chosenGroupId);

	renderGroupInfo();
}
