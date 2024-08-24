// Initial theme setup
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('toggle-theme');
    const body = document.body;

    // Load saved theme from localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }

    // Toggle theme
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });
});

// Start speed test simulation
document.getElementById('start-test').addEventListener('click', function() {
    document.querySelector('.animation-circle').style.display = 'block';
    setTimeout(() => {
        // Simulated results
        document.getElementById('download-speed').textContent = '50 Mbps';
        document.getElementById('upload-speed').textContent = '20 Mbps';
        document.getElementById('ping').textContent = '15 ms';
        
        // Hide animation
        document.querySelector('.animation-circle').style.display = 'none';
        document.getElementById('results').classList.remove('hidden');
        
        // Update chart
        updateChart();
        
        // Update recommendations
        updateRecommendations();
    }, 3000); // Simulate 3 seconds test duration
});

// Update chart
function updateChart() {
    const ctx = document.getElementById('speedChart').getContext('2d');
    const color = document.getElementById('color-picker').value;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Download', 'Upload'],
            datasets: [{
                label: 'Speed',
                data: [50, 20],
                borderColor: color,
                backgroundColor: 'rgba(0, 170, 255, 0.2)',
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + ' Mbps';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Update recommendations
function updateRecommendations() {
    const recommendations = document.getElementById('recommendations-list');
    recommendations.innerHTML = `
        <li>Upgrade your internet plan for better speed.</li>
        <li>Check your router placement for optimal performance.</li>
        <li>Contact your ISP for support if issues persist.</li>
    `;
    document.getElementById('recommendations').classList.remove('hidden');
}

// Share results functionality
document.getElementById('share-results').addEventListener('click', function() {
    const resultText = `
        Download Speed: ${document.getElementById('download-speed').textContent}
        Upload Speed: ${document.getElementById('upload-speed').textContent}
        Ping: ${document.getElementById('ping').textContent}
    `;
    
    navigator.clipboard.writeText(resultText).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Results copied to clipboard!',
        });
    }).catch(err => {
        console.error('Failed to copy results: ', err);
    });
});

// View history functionality
document.getElementById('view-history').addEventListener('click', function() {
    document.getElementById('history').classList.toggle('hidden');
    document.getElementById('settings').classList.add('hidden');

    // Fetch and display history (simulated data here)
    const historyTableBody = document.querySelector('#history-table tbody');
    historyTableBody.innerHTML = `
        <tr>
            <td>${new Date().toLocaleDateString()}</td>
            <td>${document.getElementById('download-speed').textContent}</td>
            <td>${document.getElementById('upload-speed').textContent}</td>
            <td>${document.getElementById('ping').textContent}</td>
        </tr>
    `;
});

// Export CSV functionality (placeholder)
document.getElementById('export-csv').addEventListener('click', function() {
    Swal.fire({
        icon: 'info',
        title: 'Info',
        text: 'CSV Export functionality is not implemented yet.',
    });
});

// Export PDF functionality (placeholder)
document.getElementById('export-pdf').addEventListener('click', function() {
    Swal.fire({
        icon: 'info',
        title: 'Info',
        text: 'PDF Export functionality is not implemented yet.',
    });
});

// Update units for speed display
document.getElementById('unit-select').addEventListener('change', function(event) {
    const unit = event.target.value;
    document.getElementById('download-speed').textContent = document.getElementById('download-speed').textContent.replace(/Mbps|Gbps/, unit);
    document.getElementById('upload-speed').textContent = document.getElementById('upload-speed').textContent.replace(/Mbps|Gbps/, unit);
});
