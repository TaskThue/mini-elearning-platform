// ======== LOAD DATA FROM LOCALSTORAGE OR DEFAULT ========
let courses = JSON.parse(localStorage.getItem("coursesData")) || [
  {
    id: 1,
    title: "HTML Basics",
    description: "Learn the structure of web pages using HTML.",
    lessons: [
      "Introduction to HTML",
      "Tags and Elements",
      "Lists and Links",
      "Images and Media",
      "Forms and Inputs"
    ],
    completed: false
  },
  {
    id: 2,
    title: "CSS Fundamentals",
    description: "Style and design your web pages beautifully with CSS.",
    lessons: [
      "Selectors and Properties",
      "Colors and Fonts",
      "Box Model",
      "Flexbox and Grid",
      "Responsive Design"
    ],
    completed: false
  },
  {
    id: 3,
    title: "JavaScript Essentials",
    description: "Add interactivity and logic to your web apps.",
    lessons: [
      "Variables and Data Types",
      "Functions and Events",
      "DOM Manipulation",
      "Arrays and Objects",
      "Basic Projects"
    ],
    completed: false
  }
];

const main = document.getElementById("main-content");

// ======== SAVE TO LOCALSTORAGE ========
function saveData() {
  localStorage.setItem("coursesData", JSON.stringify(courses));
}

// ======== RENDER HOME PAGE ========
function renderHome() {
  main.innerHTML = `
    <h2>Available Courses</h2>
    <div class="course-list">
      ${courses.map(course => `
        <div class="course-card" onclick="viewCourse(${course.id})">
          <div class="course-title">${course.title}</div>
          <div class="course-desc">${course.description}</div>
          <p><strong>Status:</strong> ${course.completed ? "✅ Completed" : "🕓 In Progress"}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// ======== VIEW COURSE DETAILS ========
function viewCourse(id) {
  const course = courses.find(c => c.id === id);
  const totalLessons = course.lessons.length;
  const completedLessons = course.completed ? totalLessons : 0;
  const progress = Math.round((completedLessons / totalLessons) * 100);

  main.innerHTML = `
    <button class="back-btn" onclick="renderHome()">← Back to Courses</button>
    <h2>${course.title}</h2>
    <p>${course.description}</p>
    <div class="lesson-list">
      ${course.lessons.map((lesson, index) => `
        <div class="lesson-item">${index + 1}. ${lesson}</div>
      `).join('')}
    </div>
    <div class="progress">Progress: ${progress}%</div>
    <button class="${course.completed ? 'completed' : ''}" onclick="toggleComplete(${course.id})">
      ${course.completed ? 'Course Completed' : 'Mark as Completed'}
    </button>
  `;
}

// ======== TOGGLE COURSE COMPLETION ========
function toggleComplete(id) {
  const course = courses.find(c => c.id === id);
  course.completed = !course.completed;
  saveData(); // Save updated state
  viewCourse(id);
}

// ======== INITIAL LOAD ========
renderHome();
