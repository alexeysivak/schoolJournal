import JournalData from './data/JournalData';

const BASE_URL = 'https://60bdf540ace4d50017aabe0c.mockapi.io/school_journal/groups';

class MockApi {
	constructor() {
		this.groups = this.getGroupsData();
	}

	getGroupsData() {
		return this.doFetch(BASE_URL);
	}

	getGroupData(groupId) {
		const url = `${BASE_URL}/${groupId}`;

		return this.doFetch(url);
	}

	deleteGroup(groupId) {
		const url = `${BASE_URL}/${groupId}`;
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		return this.doFetch(url, options);
	}

	createGroup(groupName) {
		const url = `${BASE_URL}`;
		const options = {
			method: 'POST',
			body: JSON.stringify({ name: groupName }),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		return this.doFetch(url, options);
	}

	async getStudentsData(groupId) {
		const url = `${BASE_URL}/${groupId}/students`;

		return this.doFetch(url);
	}

	createStudent(newStudent) {
		const CURRANT_GROUP_ID = JournalData.chosenGroupId;

		const url = `${BASE_URL}/${CURRANT_GROUP_ID}/students`;
		const options = {
			method: 'POST',
			body: JSON.stringify(newStudent),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		return this.doFetch(url, options);
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

		return this.doFetch(url, options);
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

		return this.doFetch(url, options);
	}

	async doFetch(url, options) {
		if (options) {
			return await fetch(url, options).then((response) => {
				if (!response.ok) {
					throw new Error('response is not ok');
				}

				return response.json();
			});
		}

		return await fetch(url).then((response) => {
			if (!response.ok) {
				throw new Error('response is not ok');
			}

			return response.json();
		});
	}
}

export default new MockApi();
