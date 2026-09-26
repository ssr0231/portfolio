const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];


/* =========================
   MOBILE NAVIGATION
========================= */

const navLinks = $("#navLinks");
const menuBtn = $("#menuBtn");

menuBtn.addEventListener("click", () => {

  navLinks.classList.toggle("open");

});


$$(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

  });

});


/* =========================
   THEME
========================= */

const savedTheme =
  localStorage.getItem("shubham-theme");

if (savedTheme) {

  document.documentElement.dataset.theme =
    savedTheme;

}


const themeToggle =
  $("#themeToggle");


themeToggle.textContent =
  savedTheme === "dark"
    ? "☾"
    : "☼";


themeToggle.addEventListener("click", () => {

  const next =
    document.documentElement.dataset.theme === "dark"
      ? ""
      : "dark";


  document.documentElement.dataset.theme =
    next;


  localStorage.setItem(
    "shubham-theme",
    next
  );


  themeToggle.textContent =
    next === "dark"
      ? "☾"
      : "☼";

});


/* =========================
   CURSOR GLOW
========================= */

const glow =
  $(".cursor-glow");


window.addEventListener(
  "pointermove",
  event => {

    glow.style.left =
      event.clientX + "px";

    glow.style.top =
      event.clientY + "px";

  }
);


/* =========================
   SCROLL REVEAL
========================= */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: .12
    }
  );


$$(".reveal").forEach(element => {

  observer.observe(element);

});


/* =========================
   SKILL FILTERS
========================= */

const filters =
  $$(".filter");

const skills =
  $$(".skill-item");


filters.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      filters.forEach(btn => {

        btn.classList.remove(
          "active"
        );

      });


      button.classList.add(
        "active"
      );


      const filter =
        button.dataset.filter;


      skills.forEach(skill => {

        const show =
          filter === "all" ||
          skill.dataset.cat === filter;


        skill.style.display =
          show
            ? "grid"
            : "none";

      });

    }
  );

});


/* =========================
   PROJECT DATA
========================= */

const projectData = {


  orbitwatcher: {

    kicker:
      "SOFTWARE / AI · MAR 2026 — AUG 2026",

    title:
      "OrbitWatcher",

    description:
      "A Satellite Collision Risk Intelligence Platform designed to monitor conjunction risks across large satellite constellations.",

    details:
      "OrbitWatcher processes TLE data for 10,000+ Starlink satellites, propagates orbital positions using SGP4, screens candidate conjunctions using SciPy KDTree, calculates collision risk, provides maneuver recommendations and visualizes satellite data through a 3D interface.",

    tags: [
      "Python",
      "FastAPI",
      "SGP4",
      "SciPy KDTree",
      "SQLite",
      "Three.js",
      "Docker"
    ]

  },


  safar: {

    kicker:
      "SMART INDIA HACKATHON 2025 · TEAM LEADER",

    title:
      "Safar Sathi",

    description:
      "A full-stack smart tourism platform designed to improve travel planning and connect tourists with local guides.",

    details:
      "Safar Sathi was developed using React.js, Node.js, Express.js and MongoDB. The platform includes OTP-based authentication, accommodation cost estimation, destination recommendations and an AI-powered chatbot for travel-related queries.",

    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AI Chatbot"
    ]

  },


  lexora: {

    kicker:
      "ONGOING · AI / RAG / REGULATORY RESEARCH",

    title:
      "Lexora",

    description:
      "An AI-powered regulatory research assistant being developed for CA professionals, combining a React frontend with a Python backend and retrieval-augmented generation.",

    details:
      "Lexora is being designed to help Compliance Executives research regulatory information using available rules and documents. The system supports general and client-specific questions, evidence-backed answers, source citations, follow-up research, uncertainty handling and research history. Planned role-based workflows also include Senior CA review and feedback, administrator user/client management and regulatory document management.",

    tags: [
      "Python",
      "React",
      "RAG",
      "AI",
      "Regulatory Research"
    ]

  }

};


/* =========================
   PROJECT MODAL
========================= */

const modal =
  $("#projectModal");


function openProject(key) {

  const project =
    projectData[key];


  if (!project) {
    return;
  }


  $("#modalKicker").textContent =
    project.kicker;


  $("#modalTitle").textContent =
    project.title;


  $("#modalDescription").textContent =
    project.description;


  $("#modalDetails").innerHTML = `

    <p>
      ${project.details}
    </p>

  `;


  $("#modalTags").innerHTML =
    project.tags
      .map(
        tag =>
          `<span>${tag}</span>`
      )
      .join("");


  modal.classList.add("open");


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


/* =========================
   CASE STUDY BUTTONS
========================= */

$$(".case-study-btn").forEach(button => {

  button.addEventListener(
    "click",
    event => {

      event.stopPropagation();


      const card =
        button.closest(".project-card");


      openProject(
        card.dataset.project
      );

    }
  );

});


/* =========================
   CLOSE MODAL
========================= */

const modalClose =
  $("#modalClose");


function closeModal() {

  modal.classList.remove(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


modalClose.addEventListener(
  "click",
  closeModal
);


$(".modal-backdrop")
  .addEventListener(
    "click",
    closeModal
  );


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      modal.classList.contains("open")
    ) {

      closeModal();

    }

  }
);