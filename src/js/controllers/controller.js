import MockApi from '../MockApi';
import {
	renderStudent,
	reRenderStudent,
	renderGroupInfo,
} from '../views/groupView';
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
	clearModalErrors,
	showStudentEditModal,
} from '../views/groupsView';
import JournalData from '../data/JournalData';
import {
	validateAddGroupData,
	validateStudentObject,
} from '../helpers/validateInputs';
import { showFormError, closeForm } from '../views/formsView';

const GROUP_CLASS = 'groups__group';
const GROUP_DELETE_BUTTON_CLASS = 'groups__delete-button';
const STUDENT_DELETE_BUTTON_CLASS = 'student__delete-button';
const STUDENT_CLASS = 'student';

export async function init() {
	await MockApi.groups.then((groups) => (JournalData.data = groups));

	JournalData.data.forEach((group) => {
		renderGroup(group);
	});
}

export async function onGroupsContainerClick(e) {
	e.stopPropagation();

	if (e.target.classList.contains(GROUP_CLASS)) {
		const targetId = e.target.dataset.id;

		JournalData.setChosenGroupId(targetId);

		await renderData();

		showGroupInfo();
	}

	if (e.target.classList.contains(GROUP_DELETE_BUTTON_CLASS)) {
		const target = e.target;

		confirmDeletion(target, GROUP_CLASS);
	}
}

function showGroupInfo() {
	const averageMark = JournalData.getGroupAveregeMark();

	renderGroupInfo(averageMark, JournalData.chosenGroup.name);
}

async function renderData() {
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

	const confirmationForm = document.getElementById('confirmationForm');

	const DELETE_BUTTON_CLASS = 'form__delete-button';
	const CANCEL_BUTTON_CLASS = 'form__cancel-button';

	confirmationForm.addEventListener('click', (e) => {
		if (
			e.target.classList.contains(DELETE_BUTTON_CLASS) &&
			targetClass === GROUP_CLASS
		) {
			const targetId = target.closest('.groups__group').dataset.id;
			deleteGroup(targetId);
		}

		if (
			e.target.classList.contains(DELETE_BUTTON_CLASS) &&
			targetClass === STUDENT_CLASS
		) {
			deleteStudent(target);
		}

		if (e.target.classList.contains(CANCEL_BUTTON_CLASS)) {
			closeForm();
		}
	});
}

function deleteGroup(targetId) {
	closeForm();

	MockApi.deleteGroup(targetId);

	JournalData.deleteGroup(targetId);

	deleteGroupEl(targetId);
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

	const ADD_GROUP_FORM_CLASS = 'group-form';
	const ADD_STUDENT_FORM_CLASS = 'student-form';

	if (this.classList.contains(ADD_GROUP_FORM_CLASS)) {
		addGroup(formData);
	}

	if (this.classList.contains(ADD_STUDENT_FORM_CLASS)) {
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

	JournalData.addGroup(newGroup);

	renderGroup(newGroup);
}

async function addStudent(formData) {
	const preaparedStudent = prepareNewStudent(formData);

	if (preaparedStudent) {
		const newStudent = await MockApi.createStudent(preaparedStudent);

		closeForm();

		JournalData.addStudent(newStudent);

		renderStudent(newStudent, JournalData.getStudentsIndex(newStudent) + 1);

		showGroupInfo();
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

	newStudent.groupId = newStudent.groupId
		? newStudent.groupId
		: JournalData.chosenGroupId;

	const validationResult = validateStudentObject(newStudent);

	clearModalErrors();

	if (Object.getOwnPropertyNames(validationResult).length) {
		showErrorModals(validationResult);
		return null;
	}

	return newStudent;
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
	const isGroupSearch = e.target.classList.contains(GROUP_SEARCH_FORM_CLASS);

	if (isGroupSearch) {
		doGroupSearch(formData);
	}

	const STUDENT_SEARCH_FORM_CLASS = 'group__search-block';
	const isStudentSearch =
		e.target.classList.contains(STUDENT_SEARCH_FORM_CLASS) &&
		JournalData.chosenGroupId;

	if (isStudentSearch) {
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

	const neenedGroup = JournalData.getChosenGroup();

	clearStunentsContainer();

	neenedGroup.students.forEach((student) => {
		if (student.surname.includes(studentToSearch)) {
			renderStudent(student, JournalData.getStudentsIndex(student) + 1);
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
			(group) => group.id === JournalData.chosenGroupId,
		);

		let studentOrder = 0;
		neenedGroup.students.forEach((student) => {
			studentOrder += 1;
			renderStudent(student, studentOrder);
		});
	}
}

export function onStudentAddButtonClick() {
	if (!JournalData.chosenGroupId) {
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

export function onStudentsContainerClick(e) {
	e.stopPropagation();

	if (e.target.classList.contains(STUDENT_DELETE_BUTTON_CLASS)) {
		const chosenStudent = e.target.closest('.student');
		confirmDeletion(chosenStudent, STUDENT_CLASS);
		return;
	}

	//TODO find better solution then two conditions

	if (
		e.target.classList.contains(STUDENT_CLASS) ||
		e.target.parentNode.classList.contains(STUDENT_CLASS)
	) {
		const targetId = e.target.dataset.id
			? e.target.dataset.id
			: e.target.parentNode.dataset.id;

		changeStudent(targetId);
	}
	const ADD_MARK_BUTTON_CLASS = 'student__add-button';

	if (e.target.classList.contains(ADD_MARK_BUTTON_CLASS)) {
		const target = e.target;

		const newMark = target.previousElementSibling.value;

		const studentId = target.closest('.student').dataset.id;

		addMark(newMark, studentId);
	}
}

function addMark(newMark, studentId) {
	if (newMark && newMark !== '0' && newMark <= 12) {
		const student = JournalData.getStudent(studentId);

		student.marks.push(newMark);

		reRenderStudent(student, JournalData.getStudentsIndex(student));

		MockApi.changeStudent(student);
	}
}

function changeStudent(targetId) {
	showStudentEditModal(targetId);

	const changingForm = document.getElementById('changingForm');

	changingForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const formData = new FormData(changingForm);
		onChangingFormSubmit(formData, targetId);
	});

	changingForm.addEventListener('click', onFormClick);
}

function onChangingFormSubmit(formData, targetId) {
	const changedStudentData = prepareNewStudent(formData);

	if (changedStudentData) {
		const changedStudent = JournalData.changeStudent(
			targetId,
			changedStudentData,
		);

		reRenderStudent(
			changedStudent,
			JournalData.getStudentsIndex(changedStudent) + 1,
		);

		closeForm();

		showGroupInfo();

		MockApi.changeStudent(changedStudent);
	}
}

function deleteStudent(chosenStudent) {
	const chosenStudentId = chosenStudent.dataset.id;

	MockApi.deleteStudent(chosenStudentId);

	chosenStudent.remove();

	JournalData.deleteStudent(chosenStudentId);

	renderData(JournalData.chosenGroupId);

	showGroupInfo();

	closeForm();
}
