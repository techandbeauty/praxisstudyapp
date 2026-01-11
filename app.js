// WAITLIST SUBMIT (Firebase will plug in here)
document.getElementById("waitlist-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  if (!email) return;

  // 🔥 Firebase logic goes here
  console.log("Waitlist email:", email);

  alert("You're on the waitlist! 🚀");
  document.getElementById("email").value = "";
});

// LAUNCH SWITCH (Thursday)
const launchDate = new Date("2026-01-11"); // adjust if needed
const today = new Date();

if (today >= launchDate) {
  document.getElementById("download").classList.remove("hidden");
}
