    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageInput })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        msgDiv.innerHTML = "<p style='color: green;'>Success! Email sent.</p>";
        document.getElementById('contactForm').reset(); // Clear the form
      } else {
        msgDiv.innerHTML = `<p style='color: red;'>Error: ${result.message}</p>`;
      }
    } catch (error) {
      msgDiv.innerHTML = "<p style='color: red;'>Connection failed. Is Flask running?</p>";
    } finally {
      btn.disabled = false;
      btn.innerText = "Send Email";
    }
  });