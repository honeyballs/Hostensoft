let droparea = document.getElementById('drag-box');

// Prevent all default events
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    console.log("default prevent");
    droparea.addEventListener(eventName, preventDefaults, false);
});

// Highlight the area when files are dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    droparea.addEventListener(eventName, highlightArea, false);
});

// Remove the highlight
['dragleave', 'drop'].forEach(eventName => {
    droparea.addEventListener(eventName, unhighlightArea, false);
});

// Handle the actual upload
droparea.addEventListener('drop', handleDrop, false);

/* Event handlers */

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlightArea(e) {
    droparea.classList.add('highlight');
}

function unhighlightArea(e) {
    droparea.classList.remove('highlight');
}

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    console.log(dt);
    console.log('++++++++++++++++++++++++++++');
    console.log(files);
    handleFiles(files);
}

function handleFiles(files) {
    
}