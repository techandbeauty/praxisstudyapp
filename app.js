document.getElementById("waitlist-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const email = e.target.querySelector("input").value;

    if (!email) return;

    console.log("Waitlist signup:", email);

    alert("You're on the waitlist! 🚀");
    e.target.reset();

    // 🔥 Firebase Firestore will go here
  });
