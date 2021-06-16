export function showFormError(fieldName, errorTemplate) {
	clearErrors();

	const wrongEl = document.querySelector(`[name="${fieldName}"]`);

	wrongEl.insertAdjacentHTML('afterend', errorTemplate);
}

function clearErrors() {
	const ERROR_MESSAGE_CLASS = '.error-message';

	const errorsElements = document.querySelectorAll(ERROR_MESSAGE_CLASS);

	for (let i = 0; i < errorsElements.length; i++) {
		errorsElements[0].remove();
	}
}

export function closeForm() {
	const formContainer = document.getElementById('formContainer');

	formContainer.remove();
}

