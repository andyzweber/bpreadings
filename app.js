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
  
    if (isNaN(systolicValue) || isNaN(diastolicValue) || isNaN(heartRateValue)) {
    alert("Please enter valid values for all fields.");
    return;
  }
  
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
    
    readingsList.appendChild(li);
  }
}

// initial rendering of readings list
renderReadings();


//prepend
function displayReadings() {
  const readingsList = document.getElementById("readings");
  readingsList.innerHTML = "";

  let readings = getReadings();
  for (let i = 0; i < readings.length; i++) {
    const reading = readings[i];
    const readingHtml = `<li>${reading.date} ${reading.time} - Systolic: ${reading.systolic}, Diastolic: ${reading.diastolic}, Heart Rate: ${reading.heartRate}</li>`;
    readingsList.insertAdjacentHTML("afterbegin", readingHtml);
  }
}
