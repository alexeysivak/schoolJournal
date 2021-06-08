import JournalData from '../data/JournalData';
import { groupNameError, groupNameNotUnique } from '../templates/temlates';

export function validateAddGroupData(formGroupName) {
	const re = /^[A-Z]{1}\d*$/;

	if (!re.test(formGroupName)) {
		return groupNameError;
	}

	const isNameUnique = JournalData.data.find(
		(group) => group.name === formGroupName,
	);

	if (isNameUnique) {
		return groupNameNotUnique;
	}

	return false;
}
