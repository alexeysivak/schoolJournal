import JournalData from '../data/JournalData';
import {
	groupNameError,
	groupNameNotUnique,
	nameError,
	marksError,
	studentNameIsNotUnique,
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
			this.invalidFields[key] = nameError;
			return;
		}

		if (this.invalidFields[key]) {
			delete this.invalidFields[key];
		}

		this.studentName = value.trim();
	};

	surname = (value, key) => {
		if (!value.trim()) {
			this.invalidFields[key] = nameError;
			return;
		}

		if (this.invalidFields[key]) {
			delete this.invalidFields[key];
		}

		this.studentSurname = value.trim();
	};

	marks = (value, key) => {
		const marks = value.split(',');

		const wrongToken = marks.filter((mark) => isNaN(+mark) || +mark === 0);

		if (wrongToken.length) {
			this.invalidFields[key] = marksError;
			return;
		}

		if (this.invalidFields[key]) {
			delete this.invalidFields[key];
		}
	};

	fullName = () => {
		const fullStudentName = `${this.studentName} ${this.studentSurname}`;

		const groupToMatch = JournalData.data.find(
			(group) => group.id === JournalData.renderedGroupId,
		);
		const isStudentNotUnique = groupToMatch.students.find(
			(student) =>
				`${student.name} ${student.surname}` === fullStudentName,
		);

		if (isStudentNotUnique) {
			const wrongFieldName = 'surname';

			this.invalidFields[wrongFieldName] = studentNameIsNotUnique;
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

	if (
		!Object.getOwnPropertyNames(studentDataValidation.invalidFields).length
	) {
		studentDataValidation.fullName();
	}

	return studentDataValidation.invalidFields;
}
