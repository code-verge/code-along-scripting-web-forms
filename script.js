// Create the form element
const form = document.createElement("form");
form.id = "feedbackForm";
form.name = "feedbackForm";
form.method = "post";
form.action = "#";

const unorderedList = document.createElement("ul");
form.appendChild(unorderedList);

// Append the form to the body
document.body.appendChild(form);

// Function to create a list item with label and input
function createListItem({ labelText, inputType, inputId, inputName }) {
    const li = document.createElement('li');
    const label = document.createElement('label');
    label.htmlFor = inputId;
    label.textContent = labelText;

    const input = document.createElement('input');
    input.type = inputType;
    input.id = inputId;
    input.name = inputName;

    li.appendChild(label);
    li.appendChild(input);
    return li;
}

const nameListItem = createListItem({
	labelText: "Name:",
	inputType: "text",
	inputId: "name",
	inputName: "user_name"
})

unorderedList.appendChild(nameListItem)

const emailListItem = createListItem({
	inputName: "user_email",
	labelText: "Email:",
	inputType: "email",
	inputId: "email" 
})

unorderedList.appendChild(emailListItem)

// Create Request Type fieldset
const requestTypeListItem = document.createElement("li");
const fieldset = document.createElement("fieldset");
const legend = document.createElement("legend");
legend.textContent = "Request Type:";
fieldset.appendChild(legend);

const requestTypes = [
	{ id: "question", value: "Question", label: "Question" },
	{ id: "bug", value: "Bug", label: "Bug" },
	{ id: "feature", value: "Feature", label: "Feature" }
]

// Iterate over requestTypes and create an input and label respectively
requestTypes.forEach((type) => {
	const input = document.createElement("input");
  input.type = "radio";
  input.id = type.id;
  input.name = "request_type";
  input.value = type.value;

  const label = document.createElement("label");
  label.htmlFor = type.id;
  label.textContent = type.label;

  fieldset.appendChild(input);
  fieldset.appendChild(label);
  fieldset.appendChild(document.createElement("br"));
})

requestTypeListItem.appendChild(fieldset);
unorderedList.appendChild(requestTypeListItem);

const messageListItem = document.createElement("li");
const messageLabel = document.createElement("label");
messageLabel.htmlfor = "msg";
messageLabel.textContent = "Message:";

const textarea = document.createElement("textarea");
textarea.id = "msg";
textarea.name = "user_message";

messageListItem.appendChild(messageLabel);
messageListItem.appendChild(textarea);

unorderedList.appendChild(messageListItem);

// Create a Submit Button
const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Submit";
form.appendChild(submitButton);

function validateForm(event) {
	event.preventDefault();
	let isValid = true;
	
	const errorMessages = [];
	
	// Validate Name
	const name = form.elements["name"].value.trim();
  if (name === "") {
      isValid = false;
      errorMessages.push("Name is required");
  }
  
  // Validate email
  const email = form.elements["email"].value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      isValid = false;
      errorMessages.push("Valid email is required");
  }
  
  // Validate message
  const message = form.elements["message"].value.trim();
  if (message === "") {
	  isValid = false;
	  errorMessages.push("Please provide a message");
  }
  
  // Display error messages or submit the form
  const existingErrors = document.getElementById("errorMessages");
  if (existingErrors) {
      existingErrors.remove();
  }
  
  if (!isValid) {
      const errorDiv = document.createElement('div');
      errorDiv.id = 'errorMessages';
      errorDiv.style.color = 'red';
      errorDiv.innerHTML = errorMessages.join('<br>');
      form.insertBefore(errorDiv, form.firstChild);
  } else {
      console.log('Form submitted successfully');
      // Here you would typically send the form data to a server
  }
}

form.addEventListener('submit', validateForm)