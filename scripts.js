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
      question: "What kind of work environment do you prefer?",
      options: [
        { text: "Laboratory or workshop", category: "Engineering" },
        { text: "Studio or stage", category: "Arts" },
        { text: "Hospital or clinic", category: "Health" },
        { text: "Office or corporate", category: "Business" },
        { text: "Tech company or startup", category: "Technology" },
        { text: "Courtroom or government office", category: "Law" },
        { text: "Community centers or schools", category: "Social Sciences" }
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
      question: "Which problem do you want to solve?",
      options: [
        { text: "Creating innovative products", category: "Engineering" },
        { text: "Expressing ideas and emotions", category: "Arts" },
        { text: "Improving people's health", category: "Health" },
        { text: "Boosting business success", category: "Business" },
        { text: "Advancing technology", category: "Technology" },
        { text: "Ensuring justice and fairness", category: "Law" },
        { text: "Understanding social behavior", category: "Social Sciences" }
      ]
    },
    {
      question: "What type of books do you prefer?",
      options: [
        { text: "Science and technology", category: "Engineering" },
        { text: "Novels and poetry", category: "Arts" },
        { text: "Medical and health", category: "Health" },
        { text: "Business and finance", category: "Business" },
        { text: "Computing and software", category: "Technology" },
        { text: "Law and politics", category: "Law" },
        { text: "Psychology and sociology", category: "Social Sciences" }
      ]
    },
    {
      question: "How do you prefer to work?",
      options: [
        { text: "With technical precision", category: "Engineering" },
        { text: "With imagination and flair", category: "Arts" },
        { text: "With care and responsibility", category: "Health" },
        { text: "With leadership and planning", category: "Business" },
        { text: "With innovation and experimentation", category: "Technology" },
        { text: "With argument and analysis", category: "Law" },
        { text: "With understanding and communication", category: "Social Sciences" }
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
    },
    {
      question: "Where do you see yourself in 5 years?",
      options: [
        { text: "Designing innovative systems", category: "Engineering" },
        { text: "Performing or exhibiting art", category: "Arts" },
        { text: "Practicing medicine or research", category: "Health" },
        { text: "Managing a company or startup", category: "Business" },
        { text: "Leading tech projects", category: "Technology" },
        { text: "Working in legal advocacy", category: "Law" },
        { text: "Researching human behavior", category: "Social Sciences" }
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
        </div>`;
    });

    updateProgressBar();
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

  function updateProgressBar() {
    const progressPercent = ((current) / quiz.length) * 100;
    document.querySelector("#progress-bar > div").style.width = progressPercent + "%";
  }

  function showResult() {
    document.getElementById("quiz-box").style.display = "none";

    // Final progress bar full
    document.querySelector("#progress-bar > div").style.width = "100%";

    const topCareer = Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[0];

    let scoreList = "<ul>";
    for (let key in scores) {
      scoreList += `<li><strong>${key}</strong>: ${scores[key]} points</li>`;
    }
    scoreList += "</ul>";

    document.getElementById("result").innerHTML = `
      <p>🧭 Your suggested career path is: <strong>${topCareer}</strong></p>
      <h4>📊 Score Breakdown:</h4>
      ${scoreList}
      <h4>📘 Why this choice?</h4>
      <p>${getExplanation(topCareer)}</p>
    `;

    document.getElementById("restartBtn").style.display = "block";
  }

  function getExplanation(career) {
    switch (career) {
      case "Engineering":
        return "You have strong analytical and problem-solving skills and enjoy working with technology and machinery. Careers in engineering might be a great fit for you.";
      case "Arts":
        return "You are creative, expressive, and enjoy artistic activities. Pursuing careers in the arts could bring you satisfaction and joy.";
      case "Health":
        return "You care deeply about others and are interested in medicine, wellness, and healthcare. Health-related professions may suit you well.";
      case "Business":
        return "You are organized, strategic, and interested in commerce and management. Careers in business and entrepreneurship might suit your strengths.";
      case "Technology":
        return "You are curious, innovative, and enjoy working with computers and digital tools. Technology-related careers will likely be fulfilling.";
      case "Law":
        return "You have a strong sense of justice, good communication skills, and an interest in legal matters. Law and social justice careers might be perfect.";
      case "Social Sciences":
        return "You are empathetic and observant with an interest in human behavior and society. Careers in social sciences, psychology, or community work could be rewarding.";
      default:
        return "This career fits your interests and strengths!";
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

  window.onload = showQuestion;