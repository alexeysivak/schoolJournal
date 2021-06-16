import JournalData from '../data/JournalData';
import {
	groupNameError,
	groupNameNotUnique,
	emptyInputError,
	marksError,
} from '../templates/temlates';

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

class StudentDataValidation {
	constructor() {
		this.invalidFields = {};
		this.studentName = '';
		this.studentSurname = '';
	}

	name = (value, key) => {
		if (!value.trim()) {
			this.invalidFields[key] = emptyInputError;
			return;
		}

		if (this.invalidFields[key]) {
			delete this.invalidFields[key];
		}

		this.studentName = value.trim();
	};

	surname = (value, key) => {
		if (!value.trim()) {
			this.invalidFields[key] = emptyInputError;
			return;
		}

		if (this.invalidFields[key]) {
			delete this.invalidFields[key];
		}

		this.studentSurname = value.trim();
	};

	marks = (value, key) => {
		const firstMark = value[0];

		if (!firstMark.trim()) {
			this.invalidFields[key] = emptyInputError;
			return;
		}

		const wrongToken = value.filter(
			(mark) => isNaN(+mark) || +mark === 0 || +mark > 12,
		);

		if (wrongToken.length) {
			this.invalidFields[key] = marksError;
			return;
		}

		if (this.invalidFields[key]) {
			delete this.invalidFields[key];
		}
	};
}

const studentDataValidation = new StudentDataValidation();

export function validateStudentObject(newStudent) {
	for (let key in newStudent) {
		if (studentDataValidation[key]) {
			const validationMethod = studentDataValidation[key];

			const valueToValidate = newStudent[key];

			validationMethod(valueToValidate, key);
		}
	}

	return studentDataValidation.invalidFields;
}
