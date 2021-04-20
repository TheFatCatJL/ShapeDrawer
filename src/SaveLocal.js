import React from 'react';

const SaveLocal = jsonData => {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = jsonData.projectname;
    link.href = url;
    link.click();
}

export default SaveLocal;