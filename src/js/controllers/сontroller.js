import MockApi from '../MockApi';
import { renderStudents } from '../views/groupView';
import {
	renderGroup,
	deleteGroupEl,
	showGroupNameModal,
	clearGroupsContainer,
	showConfirmationModal,
} from '../views/groupsView';
import JournalData from '../data/JournalData';
import { validateAddGroupData } from '../helpers/validateInputs';
import { showFormError, closeForm } from '../views/formsView';

export async function init() {
	await MockApi.groups.then((groups) => (JournalData.data = groups));

	JournalData.data.forEach((group) => {
		renderGroup(group);
	});
}

export async function onGroupsContainerClick(e) {
	e.stopPropagation();

	const GROUP_CLASS = 'groups__group';
	const GROUP_DELETE_BUTTON_CLASS = 'groups__delete-button';

	const target = e.target;

	if (target.classList.contains(GROUP_CLASS)) {
		const targetId = target.dataset.id;

		const studentsData = await MockApi.getStudentsData(targetId);

		renderStudents(studentsData);
	}

	if (target.classList.contains(GROUP_DELETE_BUTTON_CLASS)) {
		const targetId = target.closest('.groups__group').dataset.id;

		confirmDeletion(targetId);
	}
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

export function onAddGroupButtonClick() {
	showGroupNameModal();

	const addingForm = document.getElementById('addingForm');

	addingForm.addEventListener('submit', onAddingFormSubmit);
	addingForm.addEventListener('click', onAddingFormCLick);
}

async function onAddingFormSubmit(e) {
	e.preventDefault();

	const formData = new FormData(this);

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

function onAddingFormCLick(e) {
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

	const GROUP_SEARCH_INPUT_NAME = 'groupSearchInput';

	const groupToSearch = formData.get(GROUP_SEARCH_INPUT_NAME);

	const searchedGroups = JournalData.data.filter((group) =>
		group.name.includes(groupToSearch),
	);

	clearGroupsContainer();

	searchedGroups.forEach((group) => renderGroup(group));
}
