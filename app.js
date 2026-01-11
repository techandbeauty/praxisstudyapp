// Firebase SDKs (v9 modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔥 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBzXznlD3EHo6O_PihIFIdnGB2cwCBmENA",
  authDomain: "praxis-a03f9.firebaseapp.com",
  projectId: "praxis-a03f9",
  storageBucket: "praxis-a03f9.firebasestorage.app",
  messagingSenderId: "990159265228",
  appId: "1:990159265228:web:fd5723e93978d1849a5169"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Launch date (SET THIS ONCE)
const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 4);

// Elements
const waitlistForm = document.getElementById("waitlist-form");
const downloadButtons = document.getElementById("download-buttons");

// Toggle on launch
if (new Date() >= launchDate) {
  waitlistForm.classList.add("hidden");
  downloadButtons.classList.remove("hidden");
}

// Waitlist submit
waitlistForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  if (!email) return;

  try {
    await addDoc(collection(db, "waitlist"), {
      email,
      createdAt: serverTimestamp()
    });

    alert("You're on the waitlist! 🎉");
    waitlistForm.reset();
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Try again.");
  }
});
