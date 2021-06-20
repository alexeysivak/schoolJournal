import '../styles/main.less';

import MockApi from './MockApi';
import JournalData from './data/JournalData';
import TargetDefiner from './helpers/TargetDefiner';

import {
	listenInfoModal,
	listenConfirmationModal,
	listenGroupNameModal,
	listenAddStudentModal,
	onFormClick,
	listenErrorModal,
} from './controllers/modalsHandlers';

import { addMark } from './controllers/studentsController';

import { renderGroup, clearGroupsContainer, renderGroupInfo } from './views/groupsView';

import { renderStudent, clearStunentsContainer } from './views/studentView';

import {
	showConfirmationModal,
	showAddStudentModal,
	showForbiddanceModal,
	showGroupNameModal,
	showStudentInfoModal,
	showAppError,
} from './views/modalsView';

import { GROUP_CLASS, STUDENT_CLASS } from './helpers/configs';

/**
 * DOM elements
 */
export const mainContainer = document.getElementById('mainContainer');
export const groupsContainer = document.getElementById('groupsContainer');
export const studentsContainer = document.getElementById('studentsContainer');
export const groupInfoBlock = document.getElementById('groupInfoBlock');

const groupAddButton = document.getElementById('groupAddButton');
const groupSearchForm = document.getElementById('groupSearchForm');
const groupSearchInput = document.getElementById('groupSearchInput');
const studentSearchForm = document.getElementById('studentSearchForm');
const studentSearchInput = document.getElementById('studentSearchInput');
const studentAddButton = document.getElementById('studentAddButton');

/**
 * Event listeners binding
 */
document.addEventListener('DOMContentLoaded', init);

groupsContainer.addEventListener('click', onGroupsContainerClick);
groupAddButton.addEventListener('click', onGroupAddButtonClick);
studentAddButton.addEventListener('click', onStudentAddButtonClick);
studentsContainer.addEventListener('click', onStudentsContainerClick);

groupSearchForm.addEventListener('submit', doSearch);
studentSearchForm.addEventListener('submit', doSearch);
groupSearchInput.addEventListener('input', resetSearchResuts);
studentSearchInput.addEventListener('input', resetSearchResuts);

async function init() {
	try {
		await MockApi.groups.then((groups) => (JournalData.data = groups));
	} catch (e) {
		showAppError();
		listenErrorModal();

		console.error(e);
		console.log('file: studentController', 'addStudent()');
		return;
	}

	JournalData.data.forEach((group) => {
		renderGroup(group);
	});
}

async function onGroupsContainerClick(e) {
	e.stopPropagation();

	if (TargetDefiner.isGroupEl(e.target)) {
		const targetId = e.target.dataset.id;

		JournalData.setChosenGroupId(targetId);

		await renderData();

		renderGroupInfo();
	}

	if (TargetDefiner.isGroupDeleteBtn(e.target)) {
		const target = e.target;

		confirmDeletion(target, GROUP_CLASS);
	}
}

export async function renderData() {
	const chosenGroupId = JournalData.chosenGroupId;

	const chosenGroup = JournalData.getChosenGroup();

	if (!chosenGroup.students) {
		const studentsData = await MockApi.getStudentsData(chosenGroupId);
		chosenGroup.students = studentsData;
	}

	clearStunentsContainer();

	chosenGroup.students.forEach((student) => {
		const studentOrder = chosenGroup.students.indexOf(student);

		renderStudent(student, studentOrder + 1);
	});
}

function confirmDeletion(target, targetClass) {
	showConfirmationModal();

	listenConfirmationModal(target, targetClass);
}

function onGroupAddButtonClick() {
	showGroupNameModal();

	listenGroupNameModal();
}

function onStudentAddButtonClick() {
	if (!JournalData.chosenGroupId) {
		stopAdding();
		return;
	}

	showAddStudentModal();

	listenAddStudentModal();
}

function stopAdding() {
	showForbiddanceModal();

	const confirmationForm = document.getElementById('confirmationForm');

	confirmationForm.addEventListener('click', onFormClick);
}

function onStudentsContainerClick(e) {
	e.stopPropagation();

	const target = e.target;

	if (TargetDefiner.isStudentDeleteBtn(target)) {
		const chosenStudent = e.target.closest('.student');
		confirmDeletion(chosenStudent, STUDENT_CLASS);
		return;
	}

	if (TargetDefiner.isStudentEl(target)) {
		const targetId = target.dataset.id || target.parentNode.dataset.id;

		showStudentInfoModal(targetId);

		listenInfoModal(targetId);
	}

	if (TargetDefiner.isAddMarkBtn(target)) {
		const newMark = target.previousElementSibling.value;

		const studentId = target.closest('.student').dataset.id;

		addMark(newMark, studentId);
	}
}

/**
 * search block
 */
function doSearch(e) {
	e.preventDefault();

	const formData = new FormData(this);

	if (TargetDefiner.isGroupSearchForm(e.target)) {
		doGroupSearch(formData);
	}

	if (TargetDefiner.isStudentSearchForm(e.target) && JournalData.chosenGroupId) {
		doStudentSearch(formData);
	}
}

function doGroupSearch(formData) {
	const GROUP_SEARCH_INPUT_NAME = 'groupSearchInput';

	const groupToSearch = formData.get(GROUP_SEARCH_INPUT_NAME);

	const searchedGroups = JournalData.data.filter((group) => group.name.includes(groupToSearch));

	clearGroupsContainer();

	searchedGroups.forEach((group) => renderGroup(group));
}

function doStudentSearch(formData) {
	const STUDENT_SEARCH_INPUT_NAME = 'studentSearchInput';

	const studentToSearch = formData.get(STUDENT_SEARCH_INPUT_NAME);

	const neenedGroup = JournalData.getChosenGroup();

	clearStunentsContainer();

	neenedGroup.students.forEach((student) => {
		if (student.surname.includes(studentToSearch)) {
			renderStudent(student, JournalData.getStudentsIndex(student) + 1);
		}
	});
}

function resetSearchResuts(e) {
	e.preventDefault();

	const target = e.target;

	if (!target.value && TargetDefiner.isGroupSearchInput(target)) {
		clearGroupsContainer();
		JournalData.data.forEach((group) => {
			renderGroup(group);
		});
	}

	if (!target.value && TargetDefiner.isStudentSearchInput(target)) {
		clearStunentsContainer();

		const neenedGroup = JournalData.data.find((group) => group.id === JournalData.chosenGroupId);

		let studentOrder = 0;
		neenedGroup.students.forEach((student) => {
			studentOrder += 1;
			renderStudent(student, studentOrder);
		});
	}
}
