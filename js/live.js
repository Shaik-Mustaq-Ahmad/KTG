// Live Sessions Data
const liveSessionsData = [
    {
        id: 1,
        title: 'Bitcoin Market Analysis',
        description: 'Daily market analysis covering Bitcoin price movements, key support/resistance levels, and trading opportunities.',
        date: '2025-01-27',
        time: '09:00 AM',
        duration: '1 hour',
        participants: 1234,
        status: 'live',
        zoomLink: 'https://zoom.us/j/123456789',
        instructor: 'Krishna Guru',
        category: 'Market Analysis'
    },
    {
        id: 2,
        title: 'Altcoin Portfolio Review',
        description: 'Weekly altcoin portfolio review session covering top performing altcoins and investment strategies.',
        date: '2025-01-27',
        time: '02:00 PM',
        duration: '1.5 hours',
        participants: 876,
        status: 'upcoming',
        zoomLink: 'https://zoom.us/j/987654321',
        instructor: 'Krishna Guru',
        category: 'Portfolio Management'
    },
    {
        id: 3,
        title: 'DeFi Trading Masterclass',
        description: 'Deep dive into DeFi protocols, yield farming strategies, and risk management techniques.',
        date: '2025-01-27',
        time: '07:00 PM',
        duration: '2 hours',
        participants: 654,
        status: 'upcoming',
        zoomLink: 'https://zoom.us/j/456789123',
        instructor: 'Krishna Guru',
        category: 'DeFi'
    },
    {
        id: 4,
        title: 'Technical Analysis Workshop',
        description: 'Advanced chart pattern recognition and trading indicator analysis for cryptocurrency markets.',
        date: '2025-01-26',
        time: '09:00 AM',
        duration: '1 hour',
        participants: 1987,
        status: 'ended',
        zoomLink: 'https://zoom.us/j/789123456',
        instructor: 'Krishna Guru',
        category: 'Technical Analysis'
    },
    {
        id: 5,
        title: 'Crypto News & Market Updates',
        description: 'Latest cryptocurrency news, market updates, and their impact on trading strategies.',
        date: '2025-01-27',
        time: '11:00 AM',
        duration: '45 minutes',
        participants: 543,
        status: 'live',
        zoomLink: 'https://zoom.us/j/345678912',
        instructor: 'Krishna Guru',
        category: 'News & Updates'
    }
];

// Initialize Live Sessions
function initializeLiveSessions() {
    renderLiveSessions();
    updateLiveStats();
    startLiveUpdates();
}

// Render Live Sessions
function renderLiveSessions() {
    const liveSessions = document.getElementById('liveSessions');
    if (!liveSessions) return;
    
    liveSessions.innerHTML = '';
    
    liveSessionsData.forEach((session, index) => {
        const sessionCard = createSessionCard(session, index);
        liveSessions.appendChild(sessionCard);
    });
}

// Create Session Card
function createSessionCard(session, index) {
    const card = document.createElement('div');
    card.className = 'session-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const statusClass = getStatusClass(session.status);
    const statusText = getStatusText(session.status);
    const actionButton = getActionButton(session);
    
    card.innerHTML = `
        <div class="session-header">
            <span class="session-status ${statusClass}">${statusText}</span>
            ${session.status === 'live' ? '<div class="live-indicator"><div class="live-dot"></div>LIVE</div>' : ''}
        </div>
        
        <h3 class="session-title">${session.title}</h3>
        <p class="session-description">${session.description}</p>
        
        <div class="session-details">
            <div>📅 ${formatDate(session.date)}</div>
            <div>⏰ ${session.time}</div>
            <div>⏱️ ${session.duration}</div>
            <div>👥 ${session.participants.toLocaleString()}</div>
        </div>
        
        <div class="session-instructor">
            <div class="instructor-avatar">KG</div>
            <span>Instructor: ${session.instructor}</span>
        </div>
        
        <div class="session-actions">
            ${actionButton}
            ${session.status !== 'ended' ? `<button class="details-btn" onclick="showSessionDetails(${session.id})">Details</button>` : ''}
        </div>
    `;
    
    return card;
}

// Get Status Class
function getStatusClass(status) {
    switch (status) {
        case 'live': return 'live';
        case 'upcoming': return 'upcoming';
        case 'ended': return 'ended';
        default: return '';
    }
}

// Get Status Text
function getStatusText(status) {
    switch (status) {
        case 'live': return '🔴 LIVE';
        case 'upcoming': return '⏰ Upcoming';
        case 'ended': return '✅ Ended';
        default: return status;
    }
}

// Get Action Button
function getActionButton(session) {
    const buttonClass = `join-btn ${session.status}`;
    const isDisabled = session.status === 'ended';
    const buttonText = session.status === 'live' ? '🔴 Join Live' : 
                      session.status === 'upcoming' ? '🔗 Join Session' : 
                      '❌ Session Ended';
    
    return `<button class="${buttonClass}" ${isDisabled ? 'disabled' : ''} onclick="joinSession(${session.id})">${buttonText}</button>`;
}

// Join Session
function joinSession(sessionId) {
    const session = liveSessionsData.find(s => s.id === sessionId);
    if (!session) return;
    
    if (session.status === 'ended') {
        showNotification('This session has already ended', 'error');
        return;
    }
    
    if (!isLoggedIn) {
        showNotification('Please login to join live sessions', 'error');
        showLogin();
        return;
    }
    
    // Show joining notification
    showNotification(`Joining ${session.title}...`, 'info');
    
    // Simulate joining delay
    setTimeout(() => {
        // Open Zoom link
        window.open(session.zoomLink, '_blank');
        showNotification('Redirecting to Zoom meeting...', 'success');
        
        // Update participant count (simulate)
        session.participants += 1;
        renderLiveSessions();
        updateLiveStats();
    }, 1000);
}

// Show Session Details
function showSessionDetails(sessionId) {
    const session = liveSessionsData.find(s => s.id === sessionId);
    if (!session) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'sessionDetailsModal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <span class="close" onclick="closeModal('sessionDetailsModal')">&times;</span>
            <div class="auth-header">
                <h2>${session.title}</h2>
                <span class="session-status ${getStatusClass(session.status)}" style="display: inline-block; margin-bottom: 1rem;">${getStatusText(session.status)}</span>
            </div>
            
            <div style="text-align: left; margin-bottom: 1.5rem;">
                <p style="margin-bottom: 1rem; line-height: 1.6;">${session.description}</p>
                
                <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <h4 style="margin-bottom: 0.5rem; color: #1e40af;">Session Details</h4>
                    <div style="display: grid; gap: 0.5rem; font-size: 0.9rem;">
                        <div><strong>Date:</strong> ${formatDate(session.date)}</div>
                        <div><strong>Time:</strong> ${session.time}</div>
                        <div><strong>Duration:</strong> ${session.duration}</div>
                        <div><strong>Instructor:</strong> ${session.instructor}</div>
                        <div><strong>Category:</strong> ${session.category}</div>
                        <div><strong>Participants:</strong> ${session.participants.toLocaleString()}</div>
                    </div>
                </div>
                
                ${session.status !== 'ended' ? `
                <div style="background: #ecfdf5; border: 1px solid #10b981; padding: 1rem; border-radius: 8px;">
                    <h4 style="margin-bottom: 0.5rem; color: #065f46;">What You'll Learn</h4>
                    <ul style="margin: 0; padding-left: 1.2rem; color: #065f46;">
                        <li>Real-time market analysis techniques</li>
                        <li>Live trading strategies and signals</li>
                        <li>Q&A session with expert trader</li>
                        <li>Interactive discussion with community</li>
                    </ul>
                </div>
                ` : ''}
            </div>
            
            <div style="display: flex; gap: 1rem;">
                ${session.status !== 'ended' ? `
                <button class="btn btn-primary" style="flex: 1;" onclick="joinSession(${session.id}); closeModal('sessionDetailsModal');">
                    ${session.status === 'live' ? '🔴 Join Live Now' : '🔗 Join Session'}
                </button>
                ` : ''}
                <button class="btn btn-secondary" onclick="closeModal('sessionDetailsModal')">
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Update Live Stats
function updateLiveStats() {
    const liveCount = liveSessionsData.filter(s => s.status === 'live').length;
    const upcomingCount = liveSessionsData.filter(s => s.status === 'upcoming').length;
    const totalParticipants = liveSessionsData.reduce((total, session) => total + session.participants, 0);
    
    // Update stat cards if they exist
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 3) {
        statCards[0].querySelector('.stat-number').textContent = liveCount;
        statCards[1].querySelector('.stat-number').textContent = upcomingCount;
        statCards[2].querySelector('.stat-number').textContent = totalParticipants.toLocaleString();
    }
}

// Start Live Updates
function startLiveUpdates() {
    // Update every 30 seconds
    setInterval(() => {
        // Simulate real-time updates
        updateParticipantCounts();
        updateSessionStatuses();
        renderLiveSessions();
        updateLiveStats();
    }, 30000);
}

// Update Participant Counts (simulate real-time changes)
function updateParticipantCounts() {
    liveSessionsData.forEach(session => {
        if (session.status === 'live') {
            // Randomly increase/decrease participants for live sessions
            const change = Math.floor(Math.random() * 10) - 5;
            session.participants = Math.max(0, session.participants + change);
        }
    });
}

// Update Session Statuses (simulate session lifecycle)
function updateSessionStatuses() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    liveSessionsData.forEach(session => {
        // This is a simplified simulation
        // In a real app, you'd check actual time against session schedule
        if (session.date < today && session.status !== 'ended') {
            session.status = 'ended';
        }
    });
}

// Schedule Notification
function scheduleSessionNotification(sessionId) {
    const session = liveSessionsData.find(s => s.id === sessionId);
    if (!session || session.status === 'ended') return;
    
    showNotification(`Reminder set for ${session.title}`, 'success');
    
    // In a real app, you'd use the Notification API or push notifications
    // For demo, we'll just show a notification after a short delay
    setTimeout(() => {
        if (Notification.permission === 'granted') {
            new Notification(`${session.title} is starting soon!`, {
                body: `Join the live session in 5 minutes`,
                icon: '/favicon.ico'
            });
        }
    }, 5000); // Demo: 5 seconds instead of actual time
}

// Request Notification Permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showNotification('Notifications enabled for live sessions!', 'success');
            }
        });
    }
}

// Get User's Timezone
function getUserTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Convert Time to User's Timezone
function convertToUserTimezone(time, date) {
    // This is a simplified version
    // In a real app, you'd properly handle timezone conversions
    return `${time} (${getUserTimezone()})`;
}

// Filter Sessions by Status
function filterSessionsByStatus(status) {
    const filteredSessions = status === 'all' ? 
        liveSessionsData : 
        liveSessionsData.filter(session => session.status === status);
    
    const liveSessions = document.getElementById('liveSessions');
    if (!liveSessions) return;
    
    liveSessions.innerHTML = '';
    
    filteredSessions.forEach((session, index) => {
        const sessionCard = createSessionCard(session, index);
        liveSessions.appendChild(sessionCard);
    });
}

// Export Calendar Event
function exportToCalendar(sessionId) {
    const session = liveSessionsData.find(s => s.id === sessionId);
    if (!session) return;
    
    // Create calendar event data
    const startDate = new Date(`${session.date}T${convertTimeToISO(session.time)}`);
    const endDate = new Date(startDate.getTime() + (parseDuration(session.duration) * 60000));
    
    const calendarData = {
        title: session.title,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        description: session.description,
        location: session.zoomLink
    };
    
    // Generate calendar file (simplified)
    const icsContent = generateICSContent(calendarData);
    downloadFile('session.ics', icsContent);
    
    showNotification('Calendar event downloaded!', 'success');
}

// Helper Functions
function convertTimeToISO(timeString) {
    // Convert "09:00 AM" to "09:00:00"
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
    let hour24 = parseInt(hours);
    
    if (period === 'PM' && hour24 !== 12) {
        hour24 += 12;
    } else if (period === 'AM' && hour24 === 12) {
        hour24 = 0;
    }
    
    return `${hour24.toString().padStart(2, '0')}:${minutes}:00`;
}

function parseDuration(duration) {
    // Convert "1 hour", "1.5 hours", "45 minutes" to minutes
    const match = duration.match(/(\d+(?:\.\d+)?)\s*(hour|minute)s?/);
    if (!match) return 60; // default 1 hour
    
    const value = parseFloat(match[1]);
    const unit = match[2];
    
    return unit === 'hour' ? value * 60 : value;
}

function generateICSContent(event) {
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Krishna Tech Guru//Live Session//EN
BEGIN:VEVENT
UID:${Date.now()}@krishnatechguru.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.start.replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${event.end.replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
}

function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Initialize notification permission request on page load
document.addEventListener('DOMContentLoaded', () => {
    // Request notification permission after a short delay
    setTimeout(requestNotificationPermission, 3000);
});

// Clean up session details modal
document.addEventListener('click', function(event) {
    const sessionDetailsModal = document.getElementById('sessionDetailsModal');
    
    if (event.target === sessionDetailsModal) {
        closeModal('sessionDetailsModal');
    }
});

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Remove dynamically created modals
        if (modalId === 'sessionDetailsModal') {
            modal.remove();
        }
    }
}