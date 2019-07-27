// questions that will be asked with choices and asnwers
(function() {
  const quizQuestions = [
    {
      question:
        "What type of IDR plan does Consolidated Parent Plus Loans qualify for?",
      answers: {
        a: "ICR",
        b: "IBR",
        c: "REPAYE/PAYE",
        d: "All of the above"
      },
      correctAnswer: "a"
    },
    {
      question:
        "How many years is the Standard plan if all payments are made on time?",
      answers: {
        a: "15",
        b: "20",
        c: "12",
        d: "10"
      },
      correctAnswer: "d"
    },
    {
      question: "How many months of forbearance do borrowers start with?",
      answers: {
        a: "72",
        b: "24",
        c: "36",
        d: "Unlimited"
      },
      correctAnswer: "c"
    },
    {
      question:
        "How many qualifying payments need to be made before a PSLF qaulified member can earn forgiveness within the REPAYE plan?",
      answers: {
        a: "240",
        b: "200",
        c: "300",
        d: "120"
      },
      correctAnswer: "d"
    },
    {
      question:
        "How much do Americans currently owe combined in Federal Student Loans?",
      answers: {
        a: "$1.34 Trillion",
        b: "$200 Million",
        c: "1.5 Billion",
        d: "$50 Billion"
      },
      correctAnswer: "a"
    },
    {
      question:
        "How many days late can you be before considered late on a payment?",
      answers: {
        a: "30",
        b: "5",
        c: "15",
        d: "10"
      },
      correctAnswer: "c"
    },
    {
      question:
        "How long is it taking FedLoan to comfirm PSLF payment on loans transferred from navient?",
      answers: {
        a: "12+ months",
        b: "5 months",
        c: "2 months",
        d: "10 to 15 business days when loans transfer"
      },
      correctAnswer: "a"
    },
    {
      question: "What is the average student loan debt in America?",
      answers: {
        a: "$10,000",
        b: "$27,000",
        c: "$33,000",
        d: "$57,000"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the most common repayment plan in America?",
      answers: {
        a: "IBR",
        b: "REPAYE",
        c: "Standard",
        d: "Extended Graduate"
      },
      correctAnswer: "c"
    },
    {
      question: "Why was Navient sued recently?",
      answers: {
        a: "Misallocated payments",
        b:
          "Steered struggling borrowers toward multiple forbearances instead of income-driven repayment plans",
        c:
          "Provided unclear information about how to re-enroll in income-driven repayment plans and how to qualify for a co-signer release",
        d: "All of the above"
      },
      correctAnswer: "d"
    }
  ];

  function buildQuiz() {
    // store the HTML output
    const output = [];
    quizQuestions.forEach((questionsAsked, orderNumber) => {
      // store list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in questionsAsked.answers) {
        // HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${orderNumber}" value="${letter}">
              ${letter} :
              ${questionsAsked.answers[letter]}
           </label>`
        );
      }

      // linking questions to answers
      output.push(
        `<div class="slide">
           <div class="question"> ${questionsAsked.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // stringing JS to HTML
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    quizQuestions.forEach((questionsAsked, orderNumber) => {
      // find suser input
      const answerContainer = answerContainers[orderNumber];
      const selector = `input[name=question${orderNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {})
        .value;

      // if answer is correct
      if (userAnswer === questionsAsked.correctAnswer) {
        // add correct total
        numCorrect++;

        // cif correct green green
        answerContainers[orderNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong red
        answerContainers[orderNumber].style.color = "red";
      }
    });

    // show number of correct answers
    resultsContainer.innerHTML = numCorrect + ' out of ' + quizQuestions.length;
  }

  // side functuion
  
  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz on start up
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // click function for going through quiz
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();