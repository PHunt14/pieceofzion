document.addEventListener("DOMContentLoaded", function() {
    // code for toggle sections
    const toggleButtons = document.querySelectorAll(".toggle-section");

    toggleButtons.forEach(button => {
        const content = button.nextElementSibling;

        button.addEventListener("click", function() {
            const isVisible = content.style.display === "block";
            content.style.display = isVisible ? "none" : "block";
        });
    });

    // New code for contact form
    emailjs.init("_ds9K-Q5FnLJdIWlC");

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = {
            name: event.target.name.value,
            email: event.target.email.value,
            message: event.target.message.value
        };
        sendEmail(formData);
    });

    function sendEmail(formData) {
        emailjs.send("service_0j5giav", "template_3iw8vty", {
            from_name: formData.name,
            message: formData.message,
            email: formData.email
        })
        .then(function(response) {
            alert('Email sent successfully!');
        }, function(error) {
            alert('Failed to send email: ' + error.text);
        });
    }
});
