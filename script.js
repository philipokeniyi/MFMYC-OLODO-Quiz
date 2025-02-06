let timeLeft = 600; // 20 minutes in seconds
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById(
      "timer"
    ).textContent = `Time left: ${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}

function submitQuiz() {
  let name = document.getElementById("name").value;
  let examNumber = document.getElementById("examNumber").value;
  let mfmRegion = document.getElementById("region").value;
  let phone = document.getElementById("phone").value;
  let score = 0;

  // Correct answers
  let answers = {
    q1: "John the Baptist",
    q2: "5",
    q3: "Peter",
    q4: "Matthew",
    q5: "Paul",
    q6: "Tax collector",
    q7: "Stephen",
    q8: "Wine",
    q9: "Pilate",
    q10: "Revelation",
  };

  let formData = new FormData(document.getElementById("quizForm"));

  for (let key in answers) {
    if (formData.get(key) === answers[key]) {
      score++;
    }
  }

  // Display result
  let resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<h3>${name}, your score is: ${score}/10</h3>`;

  // Disable all inputs and submit button
  let inputs = document.querySelectorAll("input, button");
  inputs.forEach((input) => (input.disabled = true));

  // Send data to Google Apps Script
  fetch(
    "https://script.google.com/macros/s/AKfycby0SWFv6lmhHJ6VXJE72esZOtCeFyPZRP06nxodWhnUEj7UC-kr2ZO7tiUkHa5SNK0x/exec",
    {
      method: "POST",
      body: JSON.stringify({ name, examNumber, mfmRegion, phone, score }),
    }
  )
    .then((response) => response.json())
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
}

startTimer();

const modal = document.getElementById("customModal");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");

document
  .getElementById("quizForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting immediately

    // Show custom modal
    modal.style.display = "flex";
  });

confirmYes.addEventListener("click", () => {
  modal.style.display = "none"; // Hide the modal
  submitQuiz(); // Submit the quiz
});

confirmNo.addEventListener("click", () => {
  modal.style.display = "none"; // Hide the modal
  console.log("User chose to continue the quiz.");
});
