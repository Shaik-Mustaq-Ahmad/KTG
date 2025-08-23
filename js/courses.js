// Courses Data
const coursesData = [
    {
        id: 1,
        title: 'Bitcoin Basics & Trading Fundamentals',
        description: 'Learn the complete fundamentals of Bitcoin and cryptocurrency trading from scratch.',
        price: 2999,
        originalPrice: 5999,
        rating: 4.8,
        students: 2543,
        duration: '8 weeks',
        image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600',
        level: 'beginner',
        instructor: 'Krishna Guru',
        lessons: 45,
        category: 'Trading'
    },
    {
        id: 2,
        title: 'Advanced Technical Analysis',
        description: 'Master advanced chart patterns, indicators, and technical analysis strategies.',
        price: 4999,
        originalPrice: 9999,
        rating: 4.9,
        students: 1876,
        duration: '12 weeks',
        image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=600',
        level: 'advanced',
        instructor: 'Krishna Guru',
        lessons: 72,
        category: 'Analysis'
    },
    {
        id: 3,
        title: 'DeFi & Yield Farming Strategies',
        description: 'Explore decentralized finance protocols and maximize your yield farming returns.',
        price: 3999,
        originalPrice: 7999,
        rating: 4.7,
        students: 1234,
        duration: '6 weeks',
        image: 'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=600',
        level: 'intermediate',
        instructor: 'Krishna Guru',
        lessons: 38,
        category: 'DeFi'
    },
    {
        id: 4,
        title: 'Crypto Options & Derivatives',
        description: 'Learn advanced derivatives trading strategies for professional trading.',
        price: 5999,
        originalPrice: 11999,
        rating: 4.6,
        students: 987,
        duration: '10 weeks',
        image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600',
        level: 'advanced',
        instructor: 'Krishna Guru',
        lessons: 56,
        category: 'Derivatives'
    },
    {
        id: 5,
        title: 'Algorithmic Trading with Python',
        description: 'Build automated trading systems using Python and machine learning.',
        price: 6999,
        originalPrice: 13999,
        rating: 4.8,
        students: 756,
        duration: '14 weeks',
        image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=600',
        level: 'advanced',
        instructor: 'Krishna Guru',
        lessons: 84,
        category: 'Programming'
    },
    {
        id: 6,
        title: 'NFT Trading & Investment',
        description: 'Discover the world of NFTs and learn profitable investment strategies.',
        price: 3499,
        originalPrice: 6999,
        rating: 4.5,
        students: 1543,
        duration: '5 weeks',
        image: 'https://images.pexels.com/photos/8370799/pexels-photo-8370799.jpeg?auto=compress&cs=tinysrgb&w=600',
        level: 'intermediate',
        instructor: 'Krishna Guru',
        lessons: 32,
        category: 'NFT'
    }
];

let currentFilter = 'all';

// Initialize Courses
function initializeCourses() {
    renderCourses(coursesData);
}

// Render Courses
function renderCourses(courses) {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;
    
    coursesGrid.innerHTML = '';
    
    courses.forEach((course, index) => {
        const courseCard = createCourseCard(course, index);
        coursesGrid.appendChild(courseCard);
    });
}

// Create Course Card
function createCourseCard(course, index) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
    const stars = generateStars(course.rating);
    
    card.innerHTML = `
        <div class="course-image">
            <img src="${course.image}" alt="${course.title}" loading="lazy">
            <div class="course-level">${course.level.charAt(0).toUpperCase() + course.level.slice(1)}</div>
            <div class="course-discount">${discount}% OFF</div>
        </div>
        <div class="course-content">
            <h3 class="course-title">${course.title}</h3>
            <p class="course-description">${course.description}</p>
            
            <div class="course-rating">
                <div class="stars">${stars}</div>
                <span class="rating-text">${course.rating} (${course.students.toLocaleString()})</span>
            </div>
            
            <div class="course-meta">
                <span>⏱️ ${course.duration}</span>
                <span>▶️ ${course.lessons} lessons</span>
                <span>👥 ${course.students.toLocaleString()}</span>
            </div>
            
            <div class="course-pricing">
                <span class="current-price">${formatCurrency(course.price)}</span>
                <span class="original-price">${formatCurrency(course.originalPrice)}</span>
            </div>
            
            <button class="enroll-btn" onclick="enrollInCourse(${course.id})">
                🛒 Enroll Now
            </button>
        </div>
    `;
    
    return card;
}

// Generate Stars
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    
    if (hasHalfStar) {
        stars += '⭐';
    }
    
    return stars;
}

// Filter Courses
function filterCourses(filter) {
    currentFilter = filter;
    
    // Update filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === filter || 
            (filter === 'all' && btn.textContent.toLowerCase() === 'all')) {
            btn.classList.add('active');
        }
    });
    
    // Filter and render courses
    let filteredCourses = coursesData;
    if (filter !== 'all') {
        filteredCourses = coursesData.filter(course => course.level === filter);
    }
    
    renderCourses(filteredCourses);
}

// Enroll in Course
function enrollInCourse(courseId) {
    if (!isLoggedIn) {
        showNotification('Please login to enroll in courses', 'error');
        showLogin();
        return;
    }
    
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    // Show payment modal or redirect to payment
    showPaymentModal(course);
}

// Show Payment Modal
function showPaymentModal(course) {
    // Create payment modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'paymentModal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <span class="close" onclick="closeModal('paymentModal')">&times;</span>
            <div class="auth-header">
                <h2>Complete Your Purchase</h2>
                <p>You're about to enroll in: <strong>${course.title}</strong></p>
            </div>
            
            <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Course Price:</span>
                    <span style="text-decoration: line-through; color: #6b7280;">${formatCurrency(course.originalPrice)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Discounted Price:</span>
                    <span style="color: #10b981; font-weight: 600;">${formatCurrency(course.price)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 1.1rem; border-top: 1px solid #e5e7eb; padding-top: 0.5rem;">
                    <span>Total Amount:</span>
                    <span style="color: #1e40af;">${formatCurrency(course.price)}</span>
                </div>
            </div>
            
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <p style="margin: 0; color: #92400e; font-weight: 500;">
                    🚧 Payment Gateway Integration Coming Soon!
                </p>
                <p style="margin: 0.5rem 0 0 0; color: #92400e; font-size: 0.9rem;">
                    This is a demo version. In production, this would integrate with Stripe, Razorpay, or other payment gateways.
                </p>
            </div>
            
            <div style="display: flex; gap: 1rem;">
                <button class="btn btn-primary" style="flex: 1;" onclick="processPayment(${course.id})">
                    💳 Proceed to Payment
                </button>
                <button class="btn btn-secondary" onclick="closeModal('paymentModal')">
                    Cancel
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Process Payment
function processPayment(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    // Simulate payment processing
    showNotification('Processing payment...', 'info');
    
    setTimeout(() => {
        // Simulate successful payment
        closeModal('paymentModal');
        showNotification(`Successfully enrolled in ${course.title}!`, 'success');
        
        // Add course to user's enrolled courses (in real app, this would be saved to backend)
        const enrolledCourses = JSON.parse(localStorage.getItem('ktg_enrolled_courses') || '[]');
        enrolledCourses.push({
            courseId: course.id,
            enrolledAt: new Date().toISOString(),
            progress: 0
        });
        localStorage.setItem('ktg_enrolled_courses', JSON.stringify(enrolledCourses));
        
        // Show course access information
        setTimeout(() => {
            showCourseAccessModal(course);
        }, 1000);
        
    }, 2000);
}

// Show Course Access Modal
function showCourseAccessModal(course) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'courseAccessModal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal('courseAccessModal')">&times;</span>
            <div class="auth-header">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
                <h2>Welcome to the Course!</h2>
                <p>You now have access to <strong>${course.title}</strong></p>
            </div>
            
            <div style="text-align: left; margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 1rem;">What's Next?</h4>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 0.5rem;">✅ Access to ${course.lessons} video lessons</li>
                    <li style="margin-bottom: 0.5rem;">✅ Downloadable resources and materials</li>
                    <li style="margin-bottom: 0.5rem;">✅ Certificate upon completion</li>
                    <li style="margin-bottom: 0.5rem;">✅ Lifetime access to course content</li>
                    <li style="margin-bottom: 0.5rem;">✅ Join our exclusive Telegram group</li>
                </ul>
            </div>
            
            <div style="display: flex; gap: 1rem;">
                <button class="btn btn-primary" style="flex: 1;" onclick="startCourse(${course.id})">
                    🚀 Start Learning
                </button>
                <button class="btn btn-secondary" onclick="closeModal('courseAccessModal')">
                    Later
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Start Course
function startCourse(courseId) {
    closeModal('courseAccessModal');
    showNotification('Course content will be available in the learning dashboard!', 'info');
    
    // In a real application, this would redirect to the course content
    // window.location.href = `/course/${courseId}`;
}

// Search Courses
function searchCourses(query) {
    const filteredCourses = coursesData.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase())
    );
    
    renderCourses(filteredCourses);
}

// Sort Courses
function sortCourses(sortBy) {
    let sortedCourses = [...coursesData];
    
    switch (sortBy) {
        case 'price-low':
            sortedCourses.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedCourses.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedCourses.sort((a, b) => b.rating - a.rating);
            break;
        case 'students':
            sortedCourses.sort((a, b) => b.students - a.students);
            break;
        case 'newest':
            // In real app, this would sort by creation date
            sortedCourses.reverse();
            break;
        default:
            break;
    }
    
    renderCourses(sortedCourses);
}

// Get Enrolled Courses
function getEnrolledCourses() {
    const enrolledCourses = JSON.parse(localStorage.getItem('ktg_enrolled_courses') || '[]');
    return enrolledCourses.map(enrolled => {
        const course = coursesData.find(c => c.id === enrolled.courseId);
        return {
            ...course,
            ...enrolled
        };
    });
}

// Check if user is enrolled in course
function isEnrolledInCourse(courseId) {
    const enrolledCourses = JSON.parse(localStorage.getItem('ktg_enrolled_courses') || '[]');
    return enrolledCourses.some(enrolled => enrolled.courseId === courseId);
}

// Close payment modal when clicking outside
document.addEventListener('click', function(event) {
    const paymentModal = document.getElementById('paymentModal');
    const courseAccessModal = document.getElementById('courseAccessModal');
    
    if (event.target === paymentModal) {
        closeModal('paymentModal');
    }
    
    if (event.target === courseAccessModal) {
        closeModal('courseAccessModal');
    }
});

// Clean up modals
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Remove dynamically created modals
        if (modalId === 'paymentModal' || modalId === 'courseAccessModal') {
            modal.remove();
        }
    }
}