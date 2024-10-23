function openTab(evt, tabName) {
  var i, tabContent, tabLinks;

  // Hide all tab contents
  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
    tabContent[i].classList.remove("active");
  }

  // Remove the active class from all tab links
  tabLinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("active");
  }

  // Show the current tab and add active class to the clicked tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

// Show the first tab by default
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".tab-content").style.display = "block";
});

//Update screen resolution
document.getElementById("resolution").addEventListener("input", function () {
  const value = this.value;
  document.getElementById("resolution-value").textContent = value;
});
//remove programs
function removeProgram(button) {
  const program = button.parentElement;
  program.style.display = "none";
}

//dail up sound
let isConnected = false; // Keep track of connection status

function playDialUpSound() {
  const button = document.querySelector(".connect-btn");

  if (!isConnected) {
    // If not connected, play dial-up sound and connect
    const dialUpSound = new Audio("dialup.mp3");
    dialUpSound.play();

    button.textContent = "Connecting...";
    button.disabled = true; // Disable button during connection process

    // Simulate connection after 20 seconds
    setTimeout(() => {
      button.textContent = "Connected";
      button.style.backgroundColor = "#90EE90"; // Change to green when connected
      button.disabled = false;
      isConnected = true; // Mark as connected
    }, 20000);
  } else {
    // If connected, allow user to "disconnect"
    button.textContent = "Not Connected";
    button.style.backgroundColor = ""; // Reset background color
    isConnected = false; // Mark as disconnected
  }
}

function editUser(userName) {
  const modal = document.getElementById("user-modal");
  modal.style.display = "block";

  // Set user name in modal title
  document.getElementById("modal-user-name").textContent = userName;

  // Pre-fill account type based on the user
  const accountTypeSelect = document.getElementById("account-type");
  if (userName === "Admin") {
    accountTypeSelect.value = "admin";
  } else {
    accountTypeSelect.value = "standard";
  }

  // Save changes event
  document.querySelector(".save-btn").onclick = function () {
    saveChanges(userName);
  };

  // Delete account event
  document.querySelector(".delete-btn").onclick = function () {
    deleteAccount(userName);
  };
}

function closeModal() {
  document.getElementById("user-modal").style.display = "none";
}

function saveChanges(userName) {
  // Get the selected account type from the dropdown
  const accountType = document.getElementById("account-type").value;

  // Find the corresponding user in the user list and update account type
  const userList = document.querySelectorAll(".user");
  userList.forEach((user) => {
    const name = user.querySelector(".user-name").textContent;
    if (name === userName) {
      user.querySelector(".user-type").textContent =
        accountType === "admin" ? "Administrator" : "Standard User";
    }
  });

  alert("Changes saved for " + userName + "!");
  closeModal(); // Close the modal after saving
}

function deleteAccount(userName) {
  if (userName === "Admin") {
    alert("You cannot delete the Admin account!");
    return;
  }

  // Find the corresponding user in the user list and remove the element
  const userList = document.querySelectorAll(".user");
  userList.forEach((user) => {
    const name = user.querySelector(".user-name").textContent;
    if (name === userName) {
      user.remove(); // Remove the user from the list
    }
  });

  alert(userName + " account deleted.");
  closeModal(); // Close the modal after deleting
}

// Function to update the time display with the current time from the existing clock
function updateCurrentTime() {
  const clockElement = document.getElementById("existing-clock"); // Replace with your actual clock element's ID
  const currentTimeDisplay = document.getElementById("current-time-display");

  if (clockElement) {
    currentTimeDisplay.textContent = clockElement.textContent; // Tap into the existing clock's time
  }
}

function startDefrag() {
  // Show progress bar and set initial state
  const progressBar = document.getElementById("defrag-progress");
  const selectedDrive = document.getElementById("drive-select").value;
  const progressText = document.getElementById("status");
  const progressElement = document.getElementById("progress");
  const driveDisplay = document.getElementById("selected-drive");

  driveDisplay.textContent = selectedDrive;
  progressBar.style.display = "block";
  progressElement.style.width = "0%";
  progressText.textContent = "0% completed";

  // Fake progress simulation
  let progress = 0;
  const interval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(interval);
      progressText.textContent = "Defragmentation completed!";
      progressElement.style.backgroundColor = "blue";
    } else {
      progress += 5; // Increase progress by 5%
      progressElement.style.width = progress + "%";
      progressText.textContent = progress + "% completed";
    }
  }, 500); // Update every 500 milliseconds
}

// Call this function when the Date/Time tab is opened to show the current time
document
  .getElementById("DateTime")
  .addEventListener("click", updateCurrentTime);

// Function to "set" a new time (purely visual)
function setTime() {
  const newTime = document.getElementById("new-time").value;
  const resultMessage = document.getElementById("result-message");

  if (newTime) {
    resultMessage.textContent = "Time set to: " + newTime;
  } else {
    resultMessage.textContent = "Please select a valid time.";
  }
}

// Function to "set" a new date (purely visual)
function setDate() {
  const newDate = document.getElementById("new-date").value;
  const resultMessage = document.getElementById("result-message");

  if (newDate) {
    resultMessage.textContent = "Date set to: " + newDate;
  } else {
    resultMessage.textContent = "Please select a valid date.";
  }
}
