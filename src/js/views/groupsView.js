import {
	getGroupTemplate,
	creationFormTemplate,
	groupDeletionConfirmation,
} from '../templates/temlates';
import { mainContainer, groupsContainer } from '../main';

export function renderGroup(group) {
	groupsContainer.insertAdjacentHTML('beforeend', getGroupTemplate(group));
}

export function clearGroupsContainer() {
	groupsContainer.innerHTML = null;
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

export function showConfirmationModal() {
	mainContainer.insertAdjacentHTML('beforeend', groupDeletionConfirmation);
}
