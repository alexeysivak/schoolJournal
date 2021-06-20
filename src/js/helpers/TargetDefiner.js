class TargetDefiner {
	GROUP_CLASS = 'groups__group';
	ADD_GROUP_FORM_CLASS = 'group-form';
	GROUP_DELETE_BUTTON_CLASS = 'groups__delete-button';

	STUDENT_CLASS = 'student';
	ADD_STUDENT_FORM_CLASS = 'student-form';
	STUDENT_EDIT_BUTTON_CLASS = 'info-block__button';
	STUDENT_DELETE_BUTTON_CLASS = 'student__delete-button';

	GROUP_SEARCH_FORM_CLASS = 'groups__search-block';
	GROUP_SEARCH_INPUT_CLASS = 'groups__search-input';
	STUDENT_SEARCH_FORM_CLASS = 'group__search-block';
	STUDENT_SEARCH_INPUT_CLASS = 'group__search-input';
	FORM_CLOSE_BUTTON_CLASS = 'form__close-button';
	ADD_MARK_BUTTON_CLASS = 'student__add-button';
	DELETE_BUTTON_CLASS = 'form__delete-button';
	CANCEL_BUTTON_CLASS = 'form__cancel-button';

	constructor() {
		this.target = null;
	}

	isGroupEl(targertEl) {
		if (targertEl.classList.contains(this.GROUP_CLASS)) {
			return true;
		}

		return false;
	}

	isGroupDeleteBtn(targertEl) {
		if (targertEl.classList.contains(this.GROUP_DELETE_BUTTON_CLASS)) {
			return true;
		}

		return false;
	}

	isStudentEl(targertEl) {
		if (
			targertEl.classList.contains(this.STUDENT_CLASS) ||
			targertEl.parentNode.classList.contains(this.STUDENT_CLASS)
		) {
			return true;
		}

		return false;
	}

	isStudentEditBtn(targertEl) {
		if (targertEl.classList.contains(this.STUDENT_EDIT_BUTTON_CLASS)) {
			return true;
		}

		return false;
	}

	isStudentDeleteBtn(targertEl) {
		if (targertEl.classList.contains(this.STUDENT_DELETE_BUTTON_CLASS)) {
			return true;
		}

		return false;
	}

	isAddMarkBtn(targertEl) {
		if (targertEl.classList.contains(this.ADD_MARK_BUTTON_CLASS)) {
			return true;
		}

		return false;
	}

	isGroupSearchForm(targertEl) {
		if (targertEl.classList.contains(this.GROUP_SEARCH_FORM_CLASS)) {
			return true;
		}

		return false;
	}

	isGroupSearchInput(targertEl) {
		if (targertEl.classList.contains(this.GROUP_SEARCH_INPUT_CLASS)) {
			return true;
		}

		return false;
	}

	isStudentSearchForm(targertEl) {
		if (targertEl.classList.contains(this.STUDENT_SEARCH_FORM_CLASS)) {
			return true;
		}

		return false;
	}

	isStudentSearchInput(targertEl) {
		if (targertEl.classList.contains(this.STUDENT_SEARCH_INPUT_CLASS)) {
			return true;
		}

		return false;
	}

	isFormCloseBtn(targertEl) {
		if (targertEl.classList.contains(this.FORM_CLOSE_BUTTON_CLASS)) {
			return true;
		}

		return false;
	}

	isDeleteBtn(targertEl) {
		if (targertEl.classList.contains(this.DELETE_BUTTON_CLASS)) {
			return true;
		}

		return false;
	}

	isCancelBtn(targertEl) {
		if (targertEl.classList.contains(this.CANCEL_BUTTON_CLASS)) {
			return true;
		}

		return false;
	}

	isAddGroupBtn(targertEl) {
		if (targertEl.classList.contains(this.ADD_GROUP_FORM_CLASS)) {
			return true;
		}

		return false;
	}

	isAddStudentBtn(targertEl) {
		if (targertEl.classList.contains(this.ADD_STUDENT_FORM_CLASS)) {
			return true;
		}

		return false;
	}
}

export default TargetDefiner = new TargetDefiner();
