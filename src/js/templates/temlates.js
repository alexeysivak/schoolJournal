export const creationFormTemplate = `
    <section class="form-section" id="formContainer"> 
        <form class="form" id="addingForm">
        <button type="button" class="form__close-button">&#10005;</button>
            <fieldset class="form-fieldset">
                <input
                    type="text"
                    class="form-input"
                    id="groupName"
                    placeholder="Enter group name"
                    name="groupName"
                />
 
            </fieldset>
            <button type="submit" class="form-button" id="creationSubmitBtn">
                Submit
            </button>
        </form>
    </section>`;

export function getStudentTemplate(
	{ id, name, surname, marks },
	studentsOrder,
) {
	return `
	<div class="student" data-id=${id}>
        <p class="student__order">${studentsOrder}</p>
        <p class="student__name">${name} ${surname}</p>
        <p class="student__marks">${marks}</p>
        <p class="student__average">3.9</p>
        <div class="student__controls-block">
            <input
            type="number"
            name="markInput"
            id="markInput"
            class="student__mark-input"
            />
            <button
            type="submit"
            class="student__add-button"
            >Add mark</button>
            <button type="button" class="student__delete-button" id="studentDeleteButton">
            &#10005;
        </button>
        </div>
    </div>`;
}
export function getGroupTemplate(group) {
	return `
    <div class="groups__group" data-id=${group.id}>
        <span>${group.name}</span>
        <button type="button" class="groups__delete-button" id="groupDeleteButton">
            &#10005;
        </button>
    </div>`;
}

export const groupNameError = `<p class="error-message">name should includes one capital letter and number whithout white space (A2, B238, ...)</p>`;

export const groupNameNotUnique = `<p class="error-message">entered name already used</p>`;

export const groupDeletionConfirmation = `
<section class="form-section" id="formContainer"> 
<form class="form" id="confirmationForm">  
        <p class="form__confrimation-question">Are you sure?</p> 
    <button type="button" class="form__delete-button" id="deleteGroup">
        Delete
    </button>
    <button type="button" class="form__cancel-button" id="cancelButton">
        Cancel
    </button>
</form>
</section>`;
