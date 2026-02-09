const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const form = document.getElementById('akanForm');
const resultDiv = document.getElementById('result');
const akanNameDisplay = document.getElementById('akanName');
const dayOfWeekDisplay = document.getElementById('dayOfWeek');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    
    if (!validateInput(day, month, year, gender)) {
        return; 
    }
    
    const dayIndex = calculateDayOfWeek(day, month, year);
    
    const akanName = getAkanName(dayIndex, gender);
    
    displayResult(akanName, daysOfWeek[dayIndex]);
});