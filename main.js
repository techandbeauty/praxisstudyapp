// Firebase SDKs (v9 modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzXznlD3EHo6O_PihIFIdnGB2cwCBmENA",
  authDomain: "praxis-a03f9.firebaseapp.com",
  projectId: "praxis-a03f9",
  storageBucket: "praxis-a03f9.firebasestorage.app",
  messagingSenderId: "990159265228",
  appId: "1:990159265228:web:fd5723e93978d1849a5169"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Launch Date - SET THIS TO YOUR LAUNCH DATE
const launchDate = new Date("2026-01-16"); // Thursday, January 16, 2026

// Check if we've launched
const hasLaunched = new Date() >= launchDate;

// Modal Functions
window.openWaitlist = function() {
  const modal = document.getElementById("waitlist-modal");
  modal.classList.add("active");
  
  // Show correct content based on launch status
  if (hasLaunched) {
    document.getElementById("waitlist-form").classList.add("hidden");
    document.querySelector(".launch-note").classList.add("hidden");
    document.getElementById("download-buttons").classList.remove("hidden");
  }
};

window.closeWaitlist = function() {
  const modal = document.getElementById("waitlist-modal");
  modal.classList.remove("active");
  
  // Reset success message
  document.getElementById("success-message").classList.add("hidden");
};

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    window.closeWaitlist();
  }
});

// Waitlist Form Submission
const waitlistForm = document.getElementById("waitlist-form");

waitlistForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const emailInput = document.getElementById("email");
  const email = emailInput.value.trim();
  
  if (!email) {
    alert("Please enter a valid email address.");
    return;
  }
  
  // Disable submit button
  const submitBtn = waitlistForm.querySelector("button");
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Adding you...";
  
  try {
    // Add to Firestore waitlist collection
    await addDoc(collection(db, "waitlist"), {
      email: email,
      source: "website",
      createdAt: serverTimestamp()
    });
    
    // Show success message
    waitlistForm.classList.add("hidden");
    document.querySelector(".launch-note").classList.add("hidden");
    document.getElementById("success-message").classList.remove("hidden");
    
    // Reset form
    waitlistForm.reset();
    
    // Log success
    console.log("✅ Email added to waitlist:", email);
    
    // Close modal after 3 seconds
    setTimeout(() => {
      window.closeWaitlist();
      // Reset UI for next time
      setTimeout(() => {
        waitlistForm.classList.remove("hidden");
        document.querySelector(".launch-note").classList.remove("hidden");
        document.getElementById("success-message").classList.add("hidden");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 500);
    }, 3000);
    
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    alert("Oops! Something went wrong. Please try again.");
    
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

// Auto-switch to download buttons on launch day
if (hasLaunched) {
  console.log("🚀 Praxis AI has launched!");
  // Could add automatic redirect or special launch day effects here
} else {
  const daysUntilLaunch = Math.ceil((launchDate - new Date()) / (1000 * 60 * 60 * 24));
  console.log(`⏰ ${daysUntilLaunch} days until launch!`);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎯 Praxis AI website loaded!");
  console.log("📅 Launch date:", launchDate.toLocaleDateString());
  console.log("✨ Firebase connected!");
});
