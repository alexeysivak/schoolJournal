export class JournalData {
	constructor() {
		this.data = [];
		this.renderedGroupId = '';
	}

	deleteGroup(groupId) {
		this.data = this.data.filter((group) => group.id !== groupId);
	}
}

export default new JournalData();
