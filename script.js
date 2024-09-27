const notepad = document.getElementById('notepad');

const wordCountDisplay = document.getElementById('wordCount');

const savedNotesModal = document.getElementById('savedNotes');

const notesList = document.getElementById('notesList');

const closeBtn = document.querySelector('.close');

function updateWordCount() {

    const text = notepad.value.trim();

    const wordCount = text ? text.split(/\s+/).length : 0;

    wordCountDisplay.textContent = `Word Count: ${wordCount}`;

}

notepad.addEventListener('input', updateWordCount);

// Save notes

document.getElementById('saveBtn').addEventListener('click', function() {

    const text = notepad.value;

    const fileName = document.getElementById('fileName').value || 'notepad';

    const blob = new Blob([text], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);

    

    const a = document.createElement('a');

    a.href = url;

    a.download = `${fileName}.txt`;

    a.click();

    URL.revokeObjectURL(url);

});

// Clear notes

document.getElementById('clearBtn').addEventListener('click', function() {

    notepad.value = '';

    document.getElementById('fileName').value = '';

    updateWordCount();

});

// Show saved notes modal

document.getElementById('viewNotesBtn').addEventListener('click', function() {

    const savedNotes = localStorage.getItem('notepadContent');

    notesList.textContent = savedNotes ? savedNotes : 'No saved notes.';

    savedNotesModal.style.display = 'block';

});

// Close modal

closeBtn.addEventListener('click', function() {

    savedNotesModal.style.display = 'none';

});

// Close modal when clicking outside of it

window.addEventListener('click', function(event) {

    if (event.target === savedNotesModal) {

        savedNotesModal.style.display = 'none';

    }

});

// Save notes to local storage

notepad.addEventListener('input', function() {

    localStorage.setItem('notepadContent', notepad.value);

});