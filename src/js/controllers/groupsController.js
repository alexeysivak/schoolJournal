import MockApi from '../MockApi';
import JournalData from '../data/JournalData';

import { listenErrorModal } from './modalsHandlers';

import { deleteGroupEl, renderGroup } from '../views/groupsView';

import { closeForm, showFormError, showAppError } from '../views/modalsView';

import { validateAddGroupData } from '../helpers/validateInputs';

export async function deleteGroup(targetId) {
	closeForm();

	try {
		await MockApi.deleteGroup(targetId);
	} catch (e) {
		showAppError();
		listenErrorModal();

		console.error(e);
		console.log('file: studentController', 'addStudent()');
		return;
	}

	JournalData.deleteGroup(targetId);

	deleteGroupEl(targetId);
}

export async function addGroup(formData) {
	const GROUP_NAME_INPUT = 'groupName';
	const formGroupName = formData.get(GROUP_NAME_INPUT);

	const validationResult = validateAddGroupData(formGroupName);

	if (validationResult) {
		showFormError(GROUP_NAME_INPUT, validationResult);
		return;
	}

	try {
		closeForm();

		const newGroup = await MockApi.createGroup(formGroupName);

		JournalData.addGroup(newGroup);

		renderGroup(newGroup);
	} catch (e) {
		showAppError();
		listenErrorModal();

		console.error(e);
		console.log('file: studentController', 'addStudent()');
		return;
	}
}
