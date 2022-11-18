'use strict';

import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
let formData = {
  email: '',
  message: '',
};

// saving form values
const saveCurrentFormValue = () => {
  formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  console.log(formData);

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

// submiting form values
const submitFormHandler = event => {
  event.preventDefault();

  if (form.elements.email.value === '' || form.elements.message.value === '') {
    const alertMessage = 'Proszę uzupełnić wszystkie pola formularza.';
    alert(alertMessage);
  } else {
    try {
      const submitedFormData = JSON.parse(
        localStorage.getItem('feedback-form-state')
      );
      console.log('Submited form data: ', submitedFormData);
      localStorage.removeItem('feedback-form-state');
      form.elements.email.value = '';
      form.elements.message.value = '';
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  }
};

// realoding page
const realodHandler = () => {
  try {
    const savedFormData = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );
    if (savedFormData === null) {
      return;
    }
    form.elements.email.value = savedFormData.email;
    form.elements.message.value = savedFormData.message;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
};

// event listeners
form.addEventListener('input', throttle(saveCurrentFormValue, 500));
form.addEventListener('submit', submitFormHandler);
window.addEventListener('load', realodHandler);
