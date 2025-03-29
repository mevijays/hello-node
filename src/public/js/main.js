document.getElementById('greeting-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    const name = document.getElementById('name').value;
    const dob = new Date(document.getElementById('dob').value);
    const today = new Date();

    if (!name || isNaN(dob.getTime())) {
        alert('Please enter a valid name and date of birth.');
        return;
    }

    const ageInMilliseconds = today - dob;
    const ageDate = new Date(ageInMilliseconds);
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();

    const greetingMessage = `Hello ${name}, you are today ${years} years and ${months} months old.`;
    document.getElementById('greeting-message').innerText = greetingMessage;
});