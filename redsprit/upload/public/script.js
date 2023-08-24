// public/script.js

const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const rsIdentityInput = document.getElementById('rsIdentityInput');
const uploadButton = document.getElementById('uploadButton');

// Impede que o navegador abra o arquivo quando solto na área
dropArea.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('highlight');
});

dropArea.addEventListener('drop', (event) => {
  event.preventDefault();
  dropArea.classList.remove('highlight');
  fileInput.files = event.dataTransfer.files;
  handleFileChange();
});

fileInput.addEventListener('change', () => {
  handleFileChange();
});

dropArea.addEventListener('click', () => {
  fileInput.click();
});

uploadButton.addEventListener('click', () => {
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  formData.append('rsIdentity', rsIdentityInput.value);

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(responseText => {
    dropArea.innerHTML = responseText;
  })
  .catch(error => {
    console.error('Erro ao fazer o upload:', error);
  });
});

function handleFileChange() {
  if (fileInput.files.length > 0 && rsIdentityInput.value !== '') {
    uploadButton.style.display = 'block';
  } else {
    uploadButton.style.display = 'none';
  }
}

