  const quiz = [
      {
        question: "Which subject do you enjoy the most?",
        options: [
          { text: "Mathematics & Physics", category: "Engineering" },
          { text: "Visual Arts & Design", category: "Arts" },
          { text: "Biology & Health Sciences", category: "Health" },
          { text: "Economics & Business Studies", category: "Business" },
          { text: "Computer Science & IT", category: "Technology" },
          { text: "Law & Social Justice", category: "Law" },
          { text: "Psychology & Human Behavior", category: "Social Sciences" }
        ]
      },
      {
        question: "Which activity sounds most appealing?",
        options: [
          { text: "Building or repairing machines", category: "Engineering" },
          { text: "Painting, writing or performing", category: "Arts" },
          { text: "Helping people stay healthy", category: "Health" },
          { text: "Running a business or managing teams", category: "Business" },
          { text: "Developing software or apps", category: "Technology" },
          { text: "Defending rights or debating laws", category: "Law" },
          { text: "Counseling or understanding people", category: "Social Sciences" }
        ]
      },
      {
        question: "What describes your personality best?",
        options: [
          { text: "Analytical and problem solver", category: "Engineering" },
          { text: "Creative and expressive", category: "Arts" },
          { text: "Compassionate and patient", category: "Health" },
          { text: "Organized and strategic", category: "Business" },
          { text: "Curious and tech-savvy", category: "Technology" },
          { text: "Persuasive and principled", category: "Law" },
          { text: "Empathetic and observant", category: "Social Sciences" }
        ]
      },
      {
        question: "Which tool would you rather work with?",
        options: [
          { text: "Machines and tools", category: "Engineering" },
          { text: "Paintbrush or camera", category: "Arts" },
          { text: "Medical instruments", category: "Health" },
          { text: "Business software", category: "Business" },
          { text: "Computers and code editors", category: "Technology" },
          { text: "Legal documents", category: "Law" },
          { text: "Books and surveys", category: "Social Sciences" }
        ]
      },
      {
        question: "What motivates you the most?",
        options: [
          { text: "Building things that last", category: "Engineering" },
          { text: "Touching people's hearts", category: "Arts" },
          { text: "Saving lives and wellness", category: "Health" },
          { text: "Growing a successful enterprise", category: "Business" },
          { text: "Creating cutting-edge tech", category: "Technology" },
          { text: "Protecting rights and laws", category: "Law" },
          { text: "Helping communities and society", category: "Social Sciences" }
        ]
      }
    ];

    let current = 0;
    let scores = {
      Engineering: 0,
      Arts: 0,
      Health: 0,
      Business: 0,
      Technology: 0,
      Law: 0,
      "Social Sciences": 0
    };

    function showQuestion() {
      const q = quiz[current];
      document.getElementById("question").innerText = `Q${current + 1}. ${q.question}`;
      const optionsDiv = document.getElementById("options");
      optionsDiv.innerHTML = "";

      q.options.forEach((opt, index) => {
        optionsDiv.innerHTML += `
          <div class="option">
            <input type="radio" name="option" value="${opt.category}" id="opt${index}">
            <label for="opt${index}">${opt.text}</label>
          </div>
        `;
      });

      document.querySelector("#progress-bar > div").style.width = ((current / quiz.length) * 100) + "%";
    }

    function nextQuestion() {
      const selected = document.querySelector('input[name="option"]:checked');
      if (!selected) {
        alert("Please select an option.");
        return;
      }

      const category = selected.value;
      scores[category]++;
      current++;

      if (current < quiz.length) {
        showQuestion();
      } else {
        showResult();
      }
    }

    function showResult() {
      document.getElementById("quiz-box").style.display = "none";
      const topCareer = Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[0];

      let scoreList = "<ul>";
      for (let key in scores) {
        scoreList += `<li><strong>${key}</strong>: ${scores[key]} points</li>`;
      }
      scoreList += "</ul>";

      document.getElementById("result").innerHTML = `
        <h2>Your suggested career path is: <span style="color:#3366cc;">${topCareer}</span></h2>
        <h3>Score Breakdown:</h3>
        ${scoreList}
        <h3>Why this choice?</h3>
        <p>${getExplanation(topCareer)}</p>
      `;

      document.getElementById("restartBtn").style.display = "block";
    }

    function getExplanation(career) {
      switch (career) {
        case "Engineering":
          return "You enjoy problem-solving and technical tasks. Engineering is a great fit.";
        case "Arts":
          return "You’re expressive and creative. Arts could be your path.";
        case "Health":
          return "You care for others. A health-related career suits you.";
        case "Business":
          return "You’re strategic and driven. Business and leadership roles are ideal.";
        case "Technology":
          return "You love innovation and digital tools. Tech careers await you!";
        case "Law":
          return "You value justice and logic. Law and legal services could be your field.";
        case "Social Sciences":
          return "You understand people and society. Social science careers are perfect.";
        default:
          return "This career suits your strengths and interests.";
      }
    }

    function restartQuiz() {
      current = 0;
      scores = {
        Engineering: 0,
        Arts: 0,
        Health: 0,
        Business: 0,
        Technology: 0,
        Law: 0,
        "Social Sciences": 0
      };
      document.getElementById("quiz-box").style.display = "block";
      document.getElementById("result").innerHTML = "";
      document.getElementById("restartBtn").style.display = "none";
      showQuestion();
    }

    function toggleTheme() {
      const isDark = document.body.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      document.getElementById("themeToggle").textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    }

    // Load saved theme and start quiz on window load
    window.onload = function () {
      if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        document.getElementById("themeToggle").textContent = "☀️ Light Mode";
      }
      showQuestion();
    };