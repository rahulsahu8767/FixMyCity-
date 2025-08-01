// CivicWatch - Main JavaScript File

// Global App State
window.CivicWatch = {
  currentUser: null,
  reports: [],
  leaderboard: [],
  likes: new Set(),
  init: function() {
    this.setupNavigation();
    this.loadMockData();
    this.setupEventListeners();
  },

  // Navigation Setup
  setupNavigation: function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },

  // Mock Data Loading
  loadMockData: function() {
    // Mock Reports Data
    this.reports = [
      {
        id: "CR-001234",
        title: "Pothole on Main Street causing traffic issues",
        description: "Large pothole near the intersection of Main Street and Park Avenue. Cars are swerving to avoid it, creating potential safety hazards.",
        category: "Road & Infrastructure",
        location: "Main Street & Park Avenue",
        reportedBy: "Priya Sharma",
        reportedAt: "2024-01-15",
        status: "resolved",
        beforeImage: "🕳️",
        afterImage: "✅",
        likes: 24,
        comments: 8,
        resolution: "Road surface repaired and resurfaced. Thank you for reporting!"
      },
      {
        id: "CR-001235",
        title: "Overflowing garbage bin in residential area",
        description: "The garbage bin near Building A has been overflowing for several days. Waste is scattered around creating unsanitary conditions.",
        category: "Waste Management",
        location: "Residential Complex, Block A",
        reportedBy: "Rajesh Kumar",
        reportedAt: "2024-01-16",
        status: "in-progress",
        beforeImage: "🗑️",
        likes: 15,
        comments: 5
      },
      {
        id: "CR-001236",
        title: "Street light not working - safety concern",
        description: "Street light pole #47 has been non-functional for over a week. The area becomes very dark at night, posing safety risks for pedestrians.",
        category: "Street Lighting",
        location: "Elm Street, Pole #47",
        reportedBy: "Anita Desai",
        reportedAt: "2024-01-17",
        status: "reported",
        beforeImage: "💡",
        likes: 18,
        comments: 12
      }
    ];

    // Mock Leaderboard Data
    this.leaderboard = [
      {
        rank: 1,
        name: "Priya Sharma",
        points: 2847,
        reports: 47,
        resolved: 38,
        streak: 15,
        level: "Civic Champion",
        badges: ["Report Master", "Photo Pro", "Speed Demon"]
      },
      {
        rank: 2,
        name: "Rajesh Kumar",
        points: 2156,
        reports: 35,
        resolved: 29,
        streak: 8,
        level: "Community Hero",
        badges: ["Detail Expert", "Consistent Reporter"]
      },
      {
        rank: 3,
        name: "Anita Desai",
        points: 1934,
        reports: 32,
        resolved: 25,
        streak: 12,
        level: "Civic Warrior",
        badges: ["Issue Hunter", "Quality Reporter"]
      },
      {
        rank: 4,
        name: "Vikram Singh",
        points: 1567,
        reports: 28,
        resolved: 22,
        streak: 5,
        level: "Civic Guardian",
        badges: ["First Timer", "Local Hero"]
      },
      {
        rank: 5,
        name: "Meera Patel",
        points: 1342,
        reports: 24,
        resolved: 19,
        streak: 7,
        level: "Active Citizen",
        badges: ["Newcomer", "Rising Star"]
      }
    ];
  },

  // Event Listeners
  setupEventListeners: function() {
    // Image upload handling
    this.setupImageUpload();
    
    // Form submissions
    this.setupForms();
    
    // Tab switching
    this.setupTabs();
    
    // Like buttons
    this.setupLikeButtons();
  },

  // Image Upload Functionality
  setupImageUpload: function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('imageInput');
    const previewContainer = document.getElementById('imagePreview');

    if (!uploadArea || !fileInput) return;

    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = 'var(--civic-blue)';
      uploadArea.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
    });

    uploadArea.addEventListener('dragleave', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = '';
      uploadArea.style.backgroundColor = '';
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = '';
      uploadArea.style.backgroundColor = '';
      
      const files = Array.from(e.dataTransfer.files);
      this.handleFiles(files.slice(0, 3)); // Limit to 3 files
    });

    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      this.handleFiles(files.slice(0, 3)); // Limit to 3 files
    });
  },

  handleFiles: function(files) {
    const previewContainer = document.getElementById('imagePreview');
    if (!previewContainer) return;

    previewContainer.innerHTML = '';
    
    files.forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const preview = this.createImagePreview(e.target.result, index);
          previewContainer.appendChild(preview);
        };
        reader.readAsDataURL(file);
      }
    });
  },

  createImagePreview: function(src, index) {
    const container = document.createElement('div');
    container.className = 'image-preview';
    
    container.innerHTML = `
      <img src="${src}" alt="Preview ${index + 1}">
      <button type="button" class="image-remove" onclick="CivicWatch.removeImage(this)">×</button>
    `;
    
    return container;
  },

  removeImage: function(button) {
    button.parentElement.remove();
  },

  // Form Handling
  setupForms: function() {
    // Issue Report Form
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
      reportForm.addEventListener('submit', this.handleReportSubmission.bind(this));
    }

    // Login Forms
    const userLoginForm = document.getElementById('userLoginForm');
    const adminLoginForm = document.getElementById('adminLoginForm');
    
    if (userLoginForm) {
      userLoginForm.addEventListener('submit', this.handleUserLogin.bind(this));
    }
    
    if (adminLoginForm) {
      adminLoginForm.addEventListener('submit', this.handleAdminLogin.bind(this));
    }

    // AI Generate Description
    const aiButton = document.getElementById('aiGenerate');
    if (aiButton) {
      aiButton.addEventListener('click', this.generateAIDescription.bind(this));
    }
  },

  handleReportSubmission: function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validate DIGIPIN
    if (!data.digiPin) {
      this.showAlert('DIGIPIN is mandatory for submission', 'warning');
      return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Submitting Report...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', data);
      this.showSuccessMessage();
      e.target.reset();
      document.getElementById('imagePreview').innerHTML = '';
      
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  },

  handleUserLogin: function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log('User login:', data);
    this.showAlert('User login functionality will be connected to your backend API', 'info');
  },

  handleAdminLogin: function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Admin login:', data);
    this.showAlert('Admin login functionality will be connected to your backend API', 'info');
  },

  generateAIDescription: function() {
    const categorySelect = document.getElementById('category');
    const descriptionTextarea = document.getElementById('description');
    const aiButton = document.getElementById('aiGenerate');
    
    if (!categorySelect.value) {
      this.showAlert('Please select a category first to generate description', 'warning');
      return;
    }

    const images = document.querySelectorAll('#imagePreview .image-preview');
    if (images.length === 0) {
      this.showAlert('Please upload at least one image to generate description', 'warning');
      return;
    }

    // Show loading state
    aiButton.innerHTML = '<span class="loading"></span> Generating...';
    aiButton.disabled = true;

    // Mock AI description generation
    const descriptions = {
      "Road & Infrastructure": "Pothole observed on main road causing traffic disruption. The damaged asphalt surface poses safety risks for vehicles and pedestrians. Immediate repair required to prevent further deterioration.",
      "Waste Management": "Overflowing garbage bin in residential area creating unsanitary conditions. Waste spillage attracting pests and causing foul odor. Regular collection schedule needs to be maintained.",
      "Water Supply": "Water leakage detected in the pipeline causing wastage and potential structural damage. Immediate attention required to prevent further water loss and property damage.",
      "Street Lighting": "Non-functional street light creating safety hazard during nighttime. Poor visibility affecting pedestrian and vehicle safety. Replacement or repair needed urgently.",
      "Public Safety": "Safety concern identified requiring immediate attention from relevant authorities. Proper measures needed to ensure public welfare and security.",
      "default": "Issue requiring civic attention and proper resolution. The situation needs assessment and appropriate action from relevant municipal authorities."
    };

    setTimeout(() => {
      const generatedDesc = descriptions[categorySelect.value] || descriptions.default;
      descriptionTextarea.value = generatedDesc;
      
      aiButton.innerHTML = '✨ AI Generate';
      aiButton.disabled = false;
    }, 2000);
  },

  showSuccessMessage: function() {
    const container = document.querySelector('.main-content .container');
    const successCard = document.createElement('div');
    successCard.className = 'card';
    successCard.style.cssText = 'border-color: var(--civic-green); background-color: rgba(16, 185, 129, 0.05);';
    
    successCard.innerHTML = `
      <div class="card-content text-center">
        <div style="font-size: 4rem; color: var(--civic-green); margin-bottom: 1rem;">✅</div>
        <h2 style="color: var(--civic-green); margin-bottom: 0.5rem;">Issue Reported Successfully!</h2>
        <p class="text-muted mb-4">Your civic issue has been submitted and will be reviewed by the authorities.</p>
        <div class="badge badge-success">Report ID: CR-${Date.now().toString().slice(-6)}</div>
      </div>
    `;
    
    container.insertBefore(successCard, container.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
      successCard.remove();
    }, 5000);
  },

  showAlert: function(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    const container = document.querySelector('.main-content .container');
    container.insertBefore(alert, container.firstChild);
    
    setTimeout(() => {
      alert.remove();
    }, 5000);
  },

  // Tab Functionality
  setupTabs: function() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(target).classList.add('active');
      });
    });
  },

  // Like Button Functionality
  setupLikeButtons: function() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const reportId = button.dataset.reportId;
        const countSpan = button.querySelector('.like-count');
        const icon = button.querySelector('.like-icon');
        
        if (this.likes.has(reportId)) {
          this.likes.delete(reportId);
          button.classList.remove('liked');
          countSpan.textContent = parseInt(countSpan.textContent) - 1;
          icon.textContent = '🤍';
        } else {
          this.likes.add(reportId);
          button.classList.add('liked');
          countSpan.textContent = parseInt(countSpan.textContent) + 1;
          icon.textContent = '❤️';
        }
      });
    });
  },

  // Utility Functions
  formatDate: function(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  getInitials: function(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  },

  getRankIcon: function(rank) {
    switch (rank) {
      case 1: return '🏆';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  },

  getStatusIcon: function(status) {
    switch (status) {
      case 'resolved': return '✅';
      case 'in-progress': return '⏳';
      case 'reported': return '🔔';
      default: return '⏰';
    }
  },

  getStatusClass: function(status) {
    switch (status) {
      case 'resolved': return 'status-resolved';
      case 'in-progress': return 'status-progress';
      case 'reported': return 'status-reported';
      default: return 'status-reported';
    }
  },

  getLevelBadgeClass: function(level) {
    const levelColors = {
      "Civic Champion": "badge-warning",
      "Community Hero": "badge-primary", 
      "Civic Warrior": "badge-success",
      "Civic Guardian": "badge-warning",
      "Active Citizen": "badge-primary"
    };
    return levelColors[level] || "badge-outline";
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.CivicWatch.init();
});

// Filter functionality for social page
function filterReports(status) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const reports = document.querySelectorAll('.feed-item');
  
  // Update active filter button
  filterBtns.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Show/hide reports based on filter
  reports.forEach(report => {
    const reportStatus = report.dataset.status;
    if (status === 'all' || reportStatus === status) {
      report.style.display = 'block';
    } else {
      report.style.display = 'none';
    }
  });
}

// Leaderboard timeframe switching
function switchTimeframe(timeframe) {
  const timeframeBtns = document.querySelectorAll('.timeframe-btn');
  
  // Update active timeframe button
  timeframeBtns.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Here you would typically reload leaderboard data
  console.log('Switched to timeframe:', timeframe);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('mobile-open');
}
