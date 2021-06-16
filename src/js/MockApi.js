import JournalData from './data/JournalData';

const BASE_URL =
	'https://60bdf540ace4d50017aabe0c.mockapi.io/school_journal/groups';

class MockApi {
	constructor() {
		this.groups = this.getGroupsData();
	}

	async getGroupsData() {
		const groupsData = await fetch(BASE_URL).then((response) =>
			response.json(),
		);

		return groupsData;
	}

	async getGroupData(groupId) {
		const groupData = await fetch(`${BASE_URL}/${groupId}`).then(
			(response) => response.json(),
		);

		return groupData;
	}

	async getStudentsData(groupId) {
		const GROUP_STUDENTS = `${BASE_URL}/${groupId}/students`;

		const groupData = await fetch(GROUP_STUDENTS).then((response) =>
			response.json(),
		);

		return groupData;
	}

	deleteGroup(groupId) {
		const url = `${BASE_URL}/${groupId}`;
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		fetch(url, options);
	}

	async createGroup(groupName) {
		const url = `${BASE_URL}`;
		const options = {
			method: 'POST',
			body: JSON.stringify({ name: groupName }),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch(url, options).then((data) => data.json());

		return response;
	}

	async createStudent(newStudent) {
		const CURRANT_GROUP_ID = JournalData.chosenGroupId;

		const url = `${BASE_URL}/${CURRANT_GROUP_ID}/students`;
		const options = {
			method: 'POST',
			body: JSON.stringify(newStudent),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch(url, options).then((data) => data.json());

		return response;
	}

	deleteStudent(id) {
		const CURRANT_GROUP_ID = JournalData.chosenGroupId;

		const url = `${BASE_URL}/${CURRANT_GROUP_ID}/students/${id}`;

		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		fetch(url, options);
	}

	changeStudent(student) {
		const CURRANT_GROUP_ID = JournalData.chosenGroupId;

		const url = `${BASE_URL}/${CURRANT_GROUP_ID}/students/${student.id}`;

		const options = {
			method: 'PUT',
			body: JSON.stringify(student),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const response = fetch(url, options).then((data) => data.json());
	}
}

export default new MockApi();
