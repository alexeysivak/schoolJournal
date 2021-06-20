export class JournalData {
	constructor() {
		this.data = [];
		this.chosenGroupId = '';
		this.chosenGroup = {};
	}

	setChosenGroupId(id) {
		this.chosenGroupId = id;
	}

	deleteGroup(groupId) {
		this.data = this.data.filter((group) => group.id !== groupId);
	}

	addGroup(student) {
		this.data.push(student);
	}

	getChosenGroup() {
		this.chosenGroup = this.data.find(
			(group) => group.id === this.chosenGroupId,
		);

		return this.chosenGroup;
	}

	addStudent(student) {
		this.getChosenGroup();
		this.chosenGroup.students.push(student);
	}

	getStudent(id) {
		return this.chosenGroup.students.find((student) => student.id === id);
	}

	changeStudent(id, changedStudent) {
		const studentToChange = this.getStudent(id);

		for (let key in studentToChange) {
			studentToChange[key] = changedStudent[key]
				? changedStudent[key]
				: studentToChange[key];
		}

		return studentToChange;
	}

	getStudentsIndex(student) {
		return this.chosenGroup.students.indexOf(student);
	}

	deleteStudent(id) {
		this.getChosenGroup();
		this.chosenGroup.students = this.chosenGroup.students.filter(
			(student) => student.id !== id,
		);
	}

	getGroupAveregeMark() {
		const groupsMarks = this.chosenGroup.students.reduce(
			(acc, student) => acc.concat(student.marks),
			[],
		);
		if (groupsMarks[0]) {
			const averageMark =
				groupsMarks.reduce((acc, mark) => (acc += +mark), 0) /
				groupsMarks.length;

			return Math.ceil(averageMark * 100) / 100;
		}

		return '';
	}
}

export default new JournalData();
