// In the existing sendToN8n function, I'll replace the placeholder with your actual webhook URL

// ... existing code ...

// Submit applications button
submitApplicationsBtn.addEventListener('click', function() {
    reviewView.classList.remove('active');
    statusView.classList.add('active');
    
    // Update total jobs count
    document.getElementById('total-jobs').textContent = mockJobs.length;
    
    // Collect form data to send to n8n
    const formData = {
        jobTitle: document.getElementById('job-title').value,
        location: document.getElementById('location').value,
        applicationCount: document.getElementById('application-count').value,
        resumeFileName: fileInput.files[0] ? fileInput.files[0].name : '',
        // In a real implementation, you would also send the file content
        // This would require using FileReader to read the file
        selectedJobs: mockJobs
    };
    
    // Send data to n8n webhook
    sendToN8n(formData);
    
    // Start processing applications
    processApplications(mockJobs);
});

// Function to send data to n8n webhook
function sendToN8n(data) {
    console.log('Sending data to n8n webhook:', data);
    
    // Add status update about sending data
    addStatusItem('Sending data to automation workflow...', 'processing');
    
    // Using the provided webhook URL
    fetch('https://ashuproductspacec2.app.n8n.cloud/webhook-test/bff21333-10ce-4e5b-a7f0-5fd3bbf1cf6e', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Add status update about successful webhook call
        addStatusItem('Successfully connected to automation workflow!', 'success');
    })
    .catch(error => {
        console.error('Error:', error);
        // Add status update about failed webhook call
        addStatusItem('Error connecting to automation workflow. Please try again.', 'error');
    });
}
// ... existing code ...
