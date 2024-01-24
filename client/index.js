document.addEventListener("DOMContentLoaded", async () => {
    const cryptoDataDiv = document.getElementById("cryptoData");
    const cryptoSelect = document.getElementById("crypto");
    const checkbox = document.getElementById("darkModeToggle");
   
  
  
    let allData = [];
  
    try {
      const response = await fetch("http://localhost:8080/data/cryptoData");
      if (response.ok) {
        const cryptoData = await response.json();
        
        const CryptoDataWithIndexing = Object.values(cryptoData)
                  .map((item, index) => ({
                      name: item.name,
                      last: item.last,
                      buy: item.buy,
                      sell: item.sell,
                      volume: item.volume,
                      base_unit: item.base_unit,
                      index: index + 1
                  }));
                  allData=CryptoDataWithIndexing;
        // display only top 10 data
        const top10Data=allData.slice(0,10);
        const table = createCryptoTable(top10Data);
        cryptoDataDiv.innerHTML = "";
        cryptoDataDiv.appendChild(table);
      } else {
        cryptoDataDiv.textContent = "Error fetching data.";
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      cryptoDataDiv.textContent = "An error occurred.";
    }
  
    const filterAndDisplayData = () => {
      const crypto = cryptoSelect.value;
      console.log(crypto);
      const filteredCryptoData = allData.filter(
        (item) => item.base_unit === crypto
      );
      const table = createCryptoTable(filteredCryptoData);
      cryptoDataDiv.innerHTML = "";
      cryptoDataDiv.appendChild(table);
    };
  
  
    cryptoSelect.addEventListener("change", filterAndDisplayData);

   
// The DOM element that displays the time
const timerLabel = document.getElementById("base-timer-label");

// The DOM element that displays the animated border
const timerPath = document.getElementById("base-timer-path-remaining");

// The color of the animated border
const COLOR = "green";

// The width of the animated border
const PATH_WIDTH = 7;

// The radius of the circle
const RADIUS = 15;

// The circumference of the circle
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;



// The timer interval
let timerInterval = null;

// Start the timer
startTimer();

// Update the timer every second
let timePassed = 60;
function startTimer() {
  timerInterval = setInterval(() => {
    timePassed -= 1;
    
  
    if (timePassed <= 0) {
      timePassed=60;
    }
    timerLabel.innerHTML = formatTime(timePassed);
    setPath(timePassed);
  }, 1000);
}

// Format the time in MM:SS
function formatTime(time) {
  
  let seconds = time % 60;
  
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  
  return `${seconds}`;
}

// Set the path according to the time left
function setPath(timeLeft) {
  // The dasharray value
  const dasharray = `${(timeLeft / 60) * CIRCUMFERENCE} ${CIRCUMFERENCE}`;
  // Set the dasharray and color of the path
  timerPath.setAttribute("stroke-dasharray", dasharray);
  timerPath.setAttribute("stroke", red);
  timerPath.setAttribute("stroke-width", PATH_WIDTH);
}

// Reset the timer to the initial value


    
  //for toogle the dark mode
    checkbox.addEventListener("change", () => {
      document.body.classList.toggle("dark");
    });
    
  });
  
  
  
  //Displaying the data in table format
  const createCryptoTable = (data) => {
    const table = document.createElement("table");
    const headerRow = table.insertRow();
    const headers = ["#", "Name", "Last", "Buy", "Sell", "Volume", "Base Unit"];
  
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
  
    data.forEach((item) => {
      const row = table.insertRow();
      const values = [
        item.index,
        item.name,
        '₹'+item.last,
        '₹'+item.buy,
        '₹'+item.sell,
        item.volume,
        item.base_unit,
      ];
  
      values.forEach((value) => {
        const cell = row.insertCell();
        cell.textContent = value;
      });
    });
  
    return table;
  };
  
  