import { groupsContainer, studentsContainer, groupInfoBlock } from '../main';
import JournalData from '../data/JournalData';
import { getGroupInfoTemplate, getGroupTemplate } from '../templates/temlates';

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
	const groupEl = document.querySelector(`.groups__group[data-id="${groupId}"]`);

	groupEl.remove();
}

export function renderGroupInfo() {
	groupInfoBlock.innerHTML = null;

	const averageMark = JournalData.getGroupAveregeMark();
	const groupName = JournalData.chosenGroup.name;

	const groupInfoTemplate = getGroupInfoTemplate(averageMark, groupName);
	groupInfoBlock.insertAdjacentHTML('afterbegin', groupInfoTemplate);
}
