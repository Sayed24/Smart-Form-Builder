const STORAGE_KEY = "smartform_form";

function getForm() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveFormData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
