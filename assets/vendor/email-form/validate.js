// Contact for email validation

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission

  const formData = new FormData(this); // Collect form data
  const loadingMessage = document.querySelector('.loading');
  const errorMessage = document.querySelector('.error-message');
  const sentMessage = document.querySelector('.sent-message');

  // Show loading message
  loadingMessage.style.display = 'block';

  // Clear previous messages
  errorMessage.style.display = 'none';
  sentMessage.style.display = 'none';

  // Send form data to the Web3forms API
  fetch(this.action, {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      loadingMessage.style.display = 'none'; // Hide loading message

      if (data.success) {
          sentMessage.style.display = 'block'; // Show success message
          this.reset(); // Reset form fields
      } else {
          // Only show the error message if success is false
          errorMessage.textContent = data.message || 'An error occurred. Please try again later.'; // Show error message
          errorMessage.style.display = 'block';
      }
  })
  .catch(error => {
      loadingMessage.style.display = 'none'; // Hide loading message
      errorMessage.textContent = 'An error occurred. Please try again later.'; // Show error message
      errorMessage.style.display = 'block';
      console.error('Error:', error);
  });
});
