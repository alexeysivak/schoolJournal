import '../styles/main.less';
import {
	init,
	onGroupsContainerClick,
	onAddGroupButtonClick,
	doSearch,
} from './controllers/сontroller';

/**
 * DOM elements
 */
export const mainContainer = document.getElementById('mainContainer');
export const groupsContainer = document.getElementById('groupsContainer');
export const studentsContainer = document.getElementById('studentsContainer');
export const addGroupButton = document.getElementById('addGroupButton');
const groupSearchForm = document.getElementById('groupSearchForm');

/**
 * Event listeners binding
 */
document.addEventListener('DOMContentLoaded', init);
groupsContainer.addEventListener('click', onGroupsContainerClick);
addGroupButton.addEventListener('click', onAddGroupButtonClick);
groupSearchForm.addEventListener('submit', doSearch);
