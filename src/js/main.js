import '../styles/main.less';
import {
	init,
	onGroupsContainerClick,
	onGroupAddButtonClick,
	doSearch,
	resetSearchResuts,
	onStudentAddButtonClick,
} from './controllers/controller';

/**
 * DOM elements
 */
export const mainContainer = document.getElementById('mainContainer');
export const groupsContainer = document.getElementById('groupsContainer');
export const studentsContainer = document.getElementById('studentsContainer');

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
groupSearchForm.addEventListener('submit', doSearch);
groupSearchInput.addEventListener('input', resetSearchResuts);
studentSearchForm.addEventListener('submit', doSearch);
studentSearchInput.addEventListener('input', resetSearchResuts);
studentAddButton.addEventListener('click', onStudentAddButtonClick);
