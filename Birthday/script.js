// 🍰 CAKE
function eatBite() {
  document.getElementById("cake").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  loadQuestion();
}

// QUIZ
const quizData = [
  {
    question: "Do you remember our first day when I meet you? 🌟",
    options: ["Yes 😊", "No 😢"]
  },
  {
    question: "Are you ready for the surprise? 🎉",
    options: ["Yes! 🎈", "No 🤔"]
  },
  {
    question: "Do you cherish our friendship? 💖",
    options: ["Absolutely! ❤️", "Of course! 💕"]
  }
];

let currentQ = 0;

function loadQuestion() {
  const q = quizData[currentQ];
  document.getElementById("question").innerText = q.question;

  const ansDiv = document.getElementById("answers");
  ansDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = nextQuestion;
    ansDiv.appendChild(btn);
  });
}

function nextQuestion() {
  currentQ++;
  if (currentQ < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("waiting").style.display = "block";
    setTimeout(() => {
      document.getElementById("waiting").style.display = "none";
      document.getElementById("gallery").style.display = "block";
      startSlider();
    }, 3000);
  }
}

// 🎥 SLIDER LOGIC
let current = 0;
let interval;

const slides = document.querySelectorAll(".slide");

function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
}

function startSlider() {
  interval = setInterval(() => {
    const next = current + 1;

    if (slides[next] && !slides[next].classList.contains("video")) {
      current = next;
      showSlide(current);
    } else {
      clearInterval(interval);
      playVideos(next);
    }
  }, 3000);
}

// 🎬 PLAY VIDEOS ONE BY ONE
function playVideos(startIndex) {
  let i = startIndex;

  function playNextVideo() {
    if (i >= slides.length) {
      document.getElementById("wishes").style.display = "block";
      return;
    }

    showSlide(i);

    const video = slides[i].querySelector("video");
    if (video) {
      video.play();

      if (i === slides.length - 1) {
        video.requestFullscreen().catch(err => console.log(err));
      }

      video.onended = () => {
        if (i === slides.length - 1) {
          document.exitFullscreen().catch(err => console.log(err));
        }
        i++;
        playNextVideo();
      };
    } else {
      setTimeout(() => {
        i++;
        playNextVideo();
      }, 3000);
    }
  }

  playNextVideo();
}