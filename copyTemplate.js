import fs from 'fs-extra';

// Path to your template folder
const templateFolderPath = 'template';

// Path to the dist folder where you want to copy the template folder
const distFolderPath = 'dist/template';

// Copy the template folder to the dist folder
fs.copy(templateFolderPath, distFolderPath, err => {
  if (err) {
    console.error('Error copying template folder:', err);
  } else {
    console.log('Template folder copied successfully!');
  }
});
