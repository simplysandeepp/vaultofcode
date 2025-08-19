// Select elements
const bookingForm = document.getElementById("bookingForm");
const bookingsList = document.getElementById("bookings");

// Load saved bookings from LocalStorage
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// Function to display all bookings
function renderBookings() {
  bookingsList.innerHTML = ""; // clear old list
  bookings.forEach((booking, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${booking.name}</strong> (${booking.email}, ${booking.phone}) <br>
      Date: ${booking.date} | Time: ${booking.time}
      <button onclick="deleteBooking(${index})" class="delete-btn">Cancel</button>
    `;
    bookingsList.appendChild(li);
  });
}

// Function to add new booking
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!name || !email || !phone || !date || !time) {
    alert("⚠️ Please fill all fields!");
    return;
  }

  const newBooking = { name, email, phone, date, time };
  bookings.push(newBooking);

  // Save to LocalStorage
  localStorage.setItem("bookings", JSON.stringify(bookings));

  // Reset form
  bookingForm.reset();

  // Show success
  alert("✅ Booking confirmed!");

  // Re-render
  renderBookings();
});

// Function to delete booking
function deleteBooking(index) {
  if (confirm("Are you sure you want to cancel this booking?")) {
    bookings.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    renderBookings();
  }
}

// First render
renderBookings();
