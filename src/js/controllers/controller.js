import MockApi from '../MockApi';
import { renderStudent } from '../views/groupView';
import {
	renderGroup,
	deleteGroupEl,
	showGroupNameModal,
	clearGroupsContainer,
	clearStunentsContainer,
	showConfirmationModal,
	showAddStudentModal,
	showForbiddanceModal,
	showErrorModals,
} from '../views/groupsView';
import JournalData from '../data/JournalData';
import {
	validateAddGroupData,
	validateStudentObject,
} from '../helpers/validateInputs';
import { showFormError, closeForm } from '../views/formsView';

export async function init() {
	await MockApi.groups.then((groups) => (JournalData.data = groups));

	JournalData.data.forEach((group) => {
		renderGroup(group);
	});
}

export function onGroupsContainerClick(e) {
	e.stopPropagation();

	const GROUP_CLASS = 'groups__group';
	const GROUP_DELETE_BUTTON_CLASS = 'groups__delete-button';

	const target = e.target;

	if (target.classList.contains(GROUP_CLASS)) {
		const targetId = target.dataset.id;
		JournalData.renderedGroupId = targetId;
		renderData(targetId);
	}

	if (target.classList.contains(GROUP_DELETE_BUTTON_CLASS)) {
		const targetId = target.closest('.groups__group').dataset.id;

		confirmDeletion(targetId);
	}
}

async function renderData(targetId) {
	const chosenGroup = JournalData.data.find((group) => group.id === targetId);

	if (!chosenGroup.students) {
		const studentsData = await MockApi.getStudentsData(targetId);
		chosenGroup.students = studentsData;
	}

	clearStunentsContainer();

	let studentOrder = 0;
	chosenGroup.students.forEach((student) => {
		studentOrder += 1;
		renderStudent(student, studentOrder);
	});
}

function confirmDeletion(targetId) {
	showConfirmationModal();

	const confirmationForm = document.getElementById('confirmationForm');

	const DELETE_BUTTON_CLASS = 'form__delete-button';
	const CANCEL_BUTTON_CLASS = 'form__cancel-button';

	confirmationForm.addEventListener('click', (e) => {
		if (e.target.classList.contains(DELETE_BUTTON_CLASS)) {
			closeForm();

			MockApi.deleteGroup(targetId);

			JournalData.deleteGroup(targetId);

			deleteGroupEl(targetId);
		}

		if (e.target.classList.contains(CANCEL_BUTTON_CLASS)) {
			closeForm();
		}
	});
}

export function onGroupAddButtonClick() {
	showGroupNameModal();

	const addingForm = document.getElementById('addingForm');

	addingForm.addEventListener('submit', onAddingFormSubmit);
	addingForm.addEventListener('click', onFormClick);
}

function onAddingFormSubmit(e) {
	e.preventDefault();

	const formData = new FormData(this);

	const GROUP_ADD_FORM_CLASS = 'group-form';
	const STUDENT_ADD_FORM_CLASS = 'student-form';

	if (this.classList.contains(GROUP_ADD_FORM_CLASS)) {
		addGroup(formData);
	}

	if (this.classList.contains(STUDENT_ADD_FORM_CLASS)) {
		addStudent(formData);
	}
}

async function addGroup(formData) {
	const GROUP_NAME_INPUT = 'groupName';
	const formGroupName = formData.get(GROUP_NAME_INPUT);

	const validationResult = validateAddGroupData(formGroupName);

	if (validationResult) {
		showFormError(GROUP_NAME_INPUT, validationResult);
		return;
	}

	const newGroup = await MockApi.createGroup(formGroupName);

	closeForm();

	JournalData.data.push(newGroup);

	renderGroup(newGroup);
}

function addStudent(formData) {
	const newStudent = {};
	for (let [key, value] of formData.entries()) {
		newStudent[key] = value;
	}
	newStudent.groupId = JournalData.renderedGroupId;

	const validationResult = validateStudentObject(newStudent);

	if (Object.getOwnPropertyNames(validationResult).length) {
		
		showErrorModals(validationResult);
	}
}

function onFormClick(e) {
	e.stopPropagation();

	const target = e.target;
	const FORM_CLOSE_BUTTON_CLASS = 'form__close-button';

	if (target.classList.contains(FORM_CLOSE_BUTTON_CLASS)) {
		closeForm();
	}
}

export function doSearch(e) {
	e.preventDefault();

	const formData = new FormData(this);

	const GROUP_SEARCH_FORM_CLASS = 'groups__search-block';
	const STUDENT_SEARCH_FORM_CLASS = 'group__search-block';

	if (e.target.classList.contains(GROUP_SEARCH_FORM_CLASS)) {
		doGroupSearch(formData);
	}

	if (
		e.target.classList.contains(STUDENT_SEARCH_FORM_CLASS) &&
		JournalData.renderedGroupId
	) {
		doStudentSearch(formData);
	}
}

function doGroupSearch(formData) {
	const GROUP_SEARCH_INPUT_NAME = 'groupSearchInput';

	const groupToSearch = formData.get(GROUP_SEARCH_INPUT_NAME);

	const searchedGroups = JournalData.data.filter((group) =>
		group.name.includes(groupToSearch),
	);

	clearGroupsContainer();

	searchedGroups.forEach((group) => renderGroup(group));
}

function doStudentSearch(formData) {
	const STUDENT_SEARCH_INPUT_NAME = 'studentSearchInput';

	const studentToSearch = formData.get(STUDENT_SEARCH_INPUT_NAME);

	const neenedGroup = JournalData.data.find(
		(group) => group.id === JournalData.renderedGroupId,
	);

	clearStunentsContainer();

	let studentOrder = 0;
	neenedGroup.students.forEach((student) => {
		if (student.surname.includes(studentToSearch)) {
			studentOrder += 1;
			renderStudent(student, studentOrder);
		}
	});
}

export function resetSearchResuts(e) {
	e.preventDefault();

	const target = e.target;

	const GROUP_SEARCH_INPUT_CLASS = 'groups__search-input';
	const STUDENT_SEARCH_INPUT_CLASS = 'group__search-input';

	if (!target.value && target.classList.contains(GROUP_SEARCH_INPUT_CLASS)) {
		clearGroupsContainer();
		JournalData.data.forEach((group) => {
			renderGroup(group);
		});
	}

	if (
		!target.value &&
		target.classList.contains(STUDENT_SEARCH_INPUT_CLASS)
	) {
		clearStunentsContainer();

		const neenedGroup = JournalData.data.find(
			(group) => group.id === JournalData.renderedGroupId,
		);

		let studentOrder = 0;
		neenedGroup.students.forEach((student) => {
			studentOrder += 1;
			renderStudent(student, studentOrder);
		});
	}
}

export function onStudentAddButtonClick() {
	if (!JournalData.renderedGroupId) {
		stopAdding();
		return;
	}

	showAddStudentModal();

	const addingForm = document.getElementById('addingForm');

	addingForm.addEventListener('submit', onAddingFormSubmit);
	addingForm.addEventListener('click', onFormClick);
}

function stopAdding() {
	showForbiddanceModal();

	const confirmationForm = document.getElementById('confirmationForm');

	confirmationForm.addEventListener('click', onFormClick);
}
