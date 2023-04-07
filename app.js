// get the readings from local storage or initialize an empty array
let readings = JSON.parse(localStorage.getItem('mobreadings')) || [];

// function to add a new reading
function addReading() {
  const systolicInput = document.getElementById('systolic');
  const diastolicInput = document.getElementById('diastolic');
  const heartRateInput = document.getElementById('heartRate');
  
  const systolicValue = Number(systolicInput.value);
  const diastolicValue = Number(diastolicInput.value);
  const heartRateValue = Number(heartRateInput.value);
  
  if (systolicValue && diastolicValue && heartRateValue) {
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
    
    const reading = {
      date: dateString,
      time: timeString,
      systolic: systolicValue,
      diastolic: diastolicValue,
      heartRate: heartRateValue
    };
    
    readings.push(reading);
    
    localStorage.setItem('mobreadings', JSON.stringify(readings));
    
    systolicInput.value = '';
    diastolicInput.value = '';
    heartRateInput.value = '';
    
    renderReadings();
  }
}
function deleteReading(id) {
  // Find the index of the reading to be deleted
  const index = readings.findIndex((reading) => reading.id === id);
  
  // If the reading was found, remove it from the array and update local storage
  if (index !== -1) {
    readings.splice(index, 1);
    localStorage.setItem('mobreadings', JSON.stringify(readings));
    
    // Re-render the readings list
    renderReadings();
  }
}


// function to render the readings list
function renderReadings() {
  const readingsList = document.getElementById('readings');
  readingsList.innerHTML = '';
  
  for (const reading of readings) {
    const li = document.createElement('li');
    const dateSpan = document.createElement('span');
    const timeSpan = document.createElement('span');
    const systolicSpan = document.createElement('span');
    const diastolicSpan = document.createElement('span');
    const heartRateSpan = document.createElement('span');
    
    dateSpan.innerText = reading.date;
    timeSpan.innerText = reading.time;
    systolicSpan.innerText = reading.systolic;
    diastolicSpan.innerText = reading.diastolic;
    heartRateSpan.innerText = reading.heartRate;
    
    li.appendChild(dateSpan);
    li.appendChild(document.createTextNode(' '));
    li.appendChild(timeSpan);
    li.appendChild(document.createTextNode(': '));
    li.appendChild(systolicSpan);
    li.appendChild(document.createTextNode('/'));
    li.appendChild(diastolicSpan);
    li.appendChild(document.createTextNode(' HR: '));
    li.appendChild(heartRateSpan);
    
    // Add swipe-to-delete functionality to the reading element
    const hammer = new Hammer(li);
    hammer.on('swipeleft', (event) => {
      deleteReading(reading.id);
    });
    
    readingsList.appendChild(li);
  }
}


// initial rendering of readings list
renderReadings();
