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

function validateInput(day, month, year, gender) {
    // Check if gender is selected
    if (!gender) {
        alert('Please select a gender.');
        return false;
    }
    
    // Check if month is valid (1-12)
    if (month < 1 || month > 12) {
        alert('Invalid month! Please enter a month between 1 and 12.');
        return false;
    }
    
    // Check if day is valid (1-31)
    if (day < 1 || day > 31) {
        alert('Invalid day! Please enter a day between 1 and 31.');
        return false;
    }
    
    // Check for months with only 30 days
    if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) {
        alert('This month only has 30 days!');
        return false;
    }
    
    // Check for February (considering leap years)
    if (month === 2) {
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        const maxDays = isLeapYear ? 29 : 28;
        
        if (day > maxDays) {
            alert(`February ${year} only has ${maxDays} days!`);
            return false;
        }
    }
        
    if (year < 1900 || year > new Date().getFullYear()) {
        alert('Please enter a valid year.');
        return false;
    }
    
    return true; // if validations ni correct
}
function calculateDayOfWeek(day, month, year) {
    const CC = Math.floor(year / 100); 
    const YY = year % 100;              
    const MM = month;
    const DD = day;
    
    const part1 = Math.floor(CC / 4) - 2 * CC - 1;
    const part2 = Math.floor((5 * YY) / 4);
    const part3 = Math.floor((26 * (MM + 1)) / 10);
    const part4 = DD;
    
    let dayIndex = (part1 + part2 + part3 + part4) % 7;
    
    if (dayIndex < 0) {
        dayIndex += 7;
    }
    
    return dayIndex;
}
function getAkanName(dayIndex, gender) {
    if (gender === 'male') {
        return maleNames[dayIndex];
    } else {
        return femaleNames[dayIndex];
    }
}