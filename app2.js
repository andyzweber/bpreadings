let readings = JSON.parse(localStorage.getItem('mobreadings')) || [];

function addReading() {
  const systolicInput = document.getElementById("systolic");
  const diastolicInput = document.getElementById("diastolic");
  const heartRateInput = document.getElementById("heart-rate");
console.log(heartRateInput);
  const systolicValue = parseInt(systolicInput.value);
  const diastolicValue = parseInt(diastolicInput.value);
  const heartRateValue = parseInt(heartRateInput.value);
  console.log("systolicValue:", systolicValue);
  console.log("diastolicValue:", diastolicValue);
  console.log("heartRateValue:", heartRateValue);

  if (isNaN(systolicValue) || isNaN(diastolicValue) || isNaN(heartRateValue)) {
    alert("Please enter valid values for all fields.");
    return;
  }

  const reading = {
    date: getCurrentDate(),
    time: getCurrentTime(),
    systolic: systolicValue,
    diastolic: diastolicValue,
    heartRate: heartRateValue
  };
  
  console.log("New reading:", reading);

  readings = getReadings();
  readings.unshift(reading);
  localStorage.setItem("mobreadings", JSON.stringify(readings));

  displayReadings();
  systolicInput.value = "";
  diastolicInput.value = "";
  heartRateInput.value = "";
}

function displayReadings() {
  const readingsList = document.getElementById("readings");
  readingsList.innerHTML = "";

  let readings = getReadings();
  for (let i = 0; i < readings.length; i++) {
    const reading = readings[i];
    const listItem = document.createElement("li");
    listItem.innerHTML = `${reading.date} ${reading.time} - Systolic: ${reading.systolic}, Diastolic: ${reading.diastolic}, Heart Rate: ${reading.heartRate}`;
    readingsList.prepend(listItem);
  }
}

function getReadings() {
  let readings = localStorage.getItem("mobreadings");
  return readings ? JSON.parse(readings) : [];
}

function getCurrentDate() {
  const now = new Date();
  return now.toDateString();
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

displayReadings();

function displayReadings() {
    const readingsList = document.getElementById("readings");
    readingsList.innerHTML = "";
  
    let readings = getReadings();
    for (let i = 0; i < readings.length; i++) {
      const reading = readings[i];
      const readingHTML = `
        <li>${reading.date} ${reading.time} - Systolic: ${reading.systolic}, Diastolic: ${reading.diastolic}, Heart Rate: ${reading.heartRate}</li>
      `;
      readingsList.insertAdjacentHTML("afterbegin", readingHTML);
    }
  }
  
