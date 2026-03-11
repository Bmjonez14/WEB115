    // JavaScript code for form validation
	// Prevent form from submitting
document.getElementById("myForm").addEventListener('submit', function(e) {if (inputField.value == ''){e.preventDefault();console.log('Form not submitted');}})
      // Retrieve the input field value
var myForm = document.forms.myForm; 
var inputField = myForm.elements.inputField;
      // Regular expression pattern for alphanumeric input
function validateInput() {
    let regex = /^[a-zA-Z0-9]+$/;
    myForm.addEventListener('submit', function(e) {let inputValue = myForm.elements.inputField.value;if (!regex.test(inputValue)){e.preventDefault();alert('Not Alphanumeric; Form not submitted');}
else {alert('Form submitted');}})}
      // Check if the input value matches the pattern
validateInput();
        // Valid input: display confirmation and submit the form

        // Invalid input: display error message