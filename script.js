const scenarios = [

    {
        sender: "security@account-alert",
        subject: "URGENT: Account verification required",
        text: "We detected unusual activity on your account. You must verify your information immediately or your account may be suspended.",
        phishing: true,
        explanation: "Warning signs: urgency, threats of account suspension, and a request to verify information."
    },

    {
        sender: "newsletter@school",
        subject: "Monthly School Newsletter",
        text: "Hello! This month's school newsletter is now available. You can read announcements and upcoming events on the school's official website.",
        phishing: false,
        explanation: "This message does not create unusual urgency or request sensitive information."
    },

    {
        sender: "no-reply@://instagram.com",
        subject: "Two-factor authentication code: 492 841",
        text: "Someone is trying to log into your account. If this was you, enter this code on your device. If this wasn't you, you can safely ignore this email.",
        phishing: false,
        explanation: "Sent from an official domain, includes no malicious links, and explicitly states it is safe to ignore if unauthorized."
    },

    {
        sender: "security-alert@netfIix-support.com",
        subject: "Account suspended due to suspicious activity",
        text: "We noticed a login attempt from a new device. Click here to verify your identity within 24 hours, or your account will be permanently closed.",
        phishing: true,
        explanation: "The message creates urgency by threatening to close your account and uses a fake-looking website address to try to steal your login information."
    },

    {
        sender: "support@security-check",
        subject: "Password Expiration Notice",
        text: "Your password expires today. Click here immediately to keep your account active.",
        phishing: true,
        explanation: "Warning signs: extreme urgency and a request to click immediately."
    },

    {
        sender: "events@community",
        subject: "Community Event Reminder",
        text: "Reminder: The community technology workshop will take place Saturday at 2 PM. Please check the official event page for details.",
        phishing: false,
        explanation: "The message provides normal event information without requesting sensitive information."
    },

    {
        sender: "prize@random-rewards",
        subject: "You have been selected!",
        text: "You were randomly chosen for a special reward. Send your account password to confirm your identity and receive your prize.",
        phishing: true,
        explanation: "Warning signs: unexpected rewards and a request for a password. Legitimate organizations should never ask you to send your password."
    },

    {
        sender: "updates@school",
        subject: "Schedule Update",
        text: "The school schedule has been updated. Please visit the official school website to view the latest schedule.",
        phishing: false,
        explanation: "This message provides information and directs users to an official website without requesting sensitive information."
    }

];


let currentQuestion = 0;
let score = 0;
let streak = 0;
let bestStreak = 0;


function startQuiz() {

    currentQuestion = 0;
    score = 0;
    streak = 0;
    bestStreak = 0;

    document.getElementById("start-screen").classList.add("hidden");

    document.getElementById("results-screen").classList.add("hidden");

    document.getElementById("quiz-screen").classList.remove("hidden");

    showQuestion();
}


function showQuestion() {

    const scenario = scenarios[currentQuestion];

    document.getElementById("question-number").textContent =
        `Scenario ${currentQuestion + 1} of ${scenarios.length}`;

    document.getElementById("score-display").textContent =
        `Score: ${score}`;

    document.getElementById("streak-display").textContent =
        streak;

    document.getElementById("email-sender").textContent =
        scenario.sender;

    document.getElementById("email-subject").textContent =
        scenario.subject;

    document.getElementById("email-text").textContent =
        scenario.text;


    const progress =
        (currentQuestion / scenarios.length) * 100;

    document.getElementById("progress-bar").style.width =
        `${progress}%`;


    const feedback =
        document.getElementById("feedback");

    feedback.classList.add("hidden");

    feedback.classList.remove(
        "correct-effect",
        "wrong-effect"
    );


    document.getElementById("next-button")
        .classList.add("hidden");
}


function checkAnswer(answer) {

    const scenario = scenarios[currentQuestion];

    const feedback =
        document.getElementById("feedback");


    feedback.classList.remove(
        "correct-effect",
        "wrong-effect"
    );

    void feedback.offsetWidth;


    if (answer === scenario.phishing) {

        score++;

        streak++;

        if (streak > bestStreak) {
            bestStreak = streak;
        }


        feedback.innerHTML =
            `<strong>✓ Correct!</strong><br>${scenario.explanation}`;

        feedback.classList.add("correct-effect");

    } else {

        streak = 0;

        feedback.innerHTML =
            `<strong>✕ Not quite.</strong><br>${scenario.explanation}`;

        feedback.classList.add("wrong-effect");
    }


    document.getElementById("score-display").textContent =
        `Score: ${score}`;

    document.getElementById("streak-display").textContent =
        streak;


    feedback.classList.remove("hidden");

    document.getElementById("next-button")
        .classList.remove("hidden");
}


function nextQuestion() {

    currentQuestion++;


    if (currentQuestion >= scenarios.length) {

        showResults();

    } else {

        showQuestion();

    }
}


function showResults() {

    document.getElementById("quiz-screen")
        .classList.add("hidden");

    document.getElementById("results-screen")
        .classList.remove("hidden");


    const percentage =
        Math.round((score / scenarios.length) * 100);


    document.getElementById("final-score").textContent =
        `${score} / ${scenarios.length} (${percentage}%)`;


    document.getElementById("correct-count").textContent =
        score;


    document.getElementById("best-streak").textContent =
        bestStreak;


    let message;


    if (percentage === 100) {

        message =
            "Perfect score! You identified every scenario correctly.";

    } else if (percentage >= 75) {

        message =
            "Great work! You spotted most of the phishing warning signs.";

    } else if (percentage >= 50) {

        message =
            "Good start! Review the warning signs and try again.";

    } else {

        message =
            "Keep practicing. Learning the common warning signs takes practice.";

    }


    document.getElementById("performance-message")
        .textContent = message;
}


function restartQuiz() {

    document.getElementById("results-screen")
        .classList.add("hidden");

    document.getElementById("start-screen")
        .classList.remove("hidden");
}