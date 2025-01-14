// BURGER-MENU AND MENU
function openNav() {
  document.getElementById("mySidenav").style.width = "100%";

  document.addEventListener("click", closeOnClickOutside);
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";

  document.removeEventListener("click", closeOnClickOutside);
}

function navigateAndClose(event) {
  event.preventDefault();

  const targetId = event.target.getAttribute("href");
  const targetElement = document.querySelector(targetId);

  window.scrollTo({
    top: targetElement.offsetTop,
    behavior: "smooth",
  });

  setTimeout(() => {
    closeNav();
  }, 500);
}

function closeOnClickOutside(event) {
  const sidenav = document.getElementById("mySidenav");
  const menuSub = document.querySelector(".bg-menu-sub");

  if (
    sidenav.style.width === "100%" &&
    !menuSub.contains(event.target) &&
    !event.target.closest(".hamburger-1")
  ) {
    closeNav();
  }
}

const menuItems = document.querySelectorAll(".navigation-right-item");

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuItems.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");
  });
});

// STICKY
const nav = document.querySelector(".navigation");

window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    nav.classList.add("bg-scrolled");
  } else {
    nav.classList.remove("bg-scrolled");
  }
});

// SLIDER
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
let list = [].slice.call(document.querySelector(".slider-container").children);

function findActiveList() {
  let activeList = list.findIndex((e) => {
    return e.classList.contains("active");
  });

  list[activeList].classList.remove(
    "active",
    "fadeInRight",
    "fadeInLext",
    "animated"
  );

  return activeList;
}

function slideShow() {
  let activeList = findActiveList();

  activeList++;
  activeList = activeList === list.length ? 0 : activeList;

  list[activeList].classList.add("active", "fadeInRight", "animated");
}

nextButton.addEventListener("click", slideShow);

prevButton.addEventListener("click", () => {
  let activeList = findActiveList();

  activeList--;
  activeList = activeList === -1 ? list.length - 1 : activeList;

  list[activeList].classList.add("active", "fadeInLeft", "animated");
});

const buttons = document.querySelectorAll(".button img");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// CHAT-WIDGET
document.addEventListener("DOMContentLoaded", function () {
  const chatButton = document.querySelector(".chat-button");
  const chatBox = document.querySelector(".chat-box");
  const closeChat = document.querySelector(".close-chat");
  const chatInput = document.getElementById("chat-input-field");
  const sendMessageButton = document.getElementById("send-message");
  const chatMessages = document.querySelector(".chat-messages");
  const emojiPicker = document.querySelector(".emoji-picker");
  const emojiButton = document.getElementById("emoji-button");
  const fileInput = document.getElementById("file-input");
  const uploadFileButton = document.getElementById("upload-file-button");

  // Toggle chat box
  chatButton.addEventListener("click", () => {
    chatBox.style.display = "block";
  });

  closeChat.addEventListener("click", () => {
    chatBox.style.display = "none";
  });

  // Send message
  sendMessageButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);

    // Clear input field
    chatInput.value = "";

    // Simulate bot reply
    setTimeout(() => {
      const botMessage = document.createElement("div");
      botMessage.classList.add("message", "bot-message");
      botMessage.textContent = "Thanks for your message!";
      chatMessages.appendChild(botMessage);

      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
  }

  // Show emoji picker
  emojiButton.addEventListener("click", () => {
    emojiPicker.style.display =
      emojiPicker.style.display === "none" ? "flex" : "none";
  });

  // Add emoji to input
  emojiPicker.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      chatInput.value += e.target.textContent;
      emojiPicker.style.display = "none";
    }
  });

  // File upload
  uploadFileButton.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileMessage = document.createElement("div");
      fileMessage.classList.add("message", "user-message");
      fileMessage.textContent = `📎 ${file.name}`;
      chatMessages.appendChild(fileMessage);

      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });
});

// INPUT
document.getElementById("phone").addEventListener("input", function (e) {
  var x = e.target.value
    .replace(/\D/g, "")
    .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  e.target.value = !x[2]
    ? x[1]
    : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
});

// BACK TO TOP
$(function () {
  $(window).on("scroll", function () {
    toggleBackToTopBtn();
  });

  function toggleBackToTopBtn() {
    const $backToTopBtn = $("#backToTopBtn");
    if ($(window).scrollTop() > 200) {
      $backToTopBtn.fadeIn();
    } else {
      $backToTopBtn.fadeOut();
    }
  }

  $("#backToTopBtn").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, "smooth");
  });
});

// FORM Formspree

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        const confirmationMessage = document.getElementById("confirmation");

        confirmationMessage.style.display = "block";

        setTimeout(() => {
          confirmationMessage.classList.add("visible");
        }, 10);

        form.reset();

        setTimeout(() => {
          confirmationMessage.classList.remove("visible");
          confirmationMessage.classList.add("hidden");
          setTimeout(() => {
            confirmationMessage.style.display = "none";
            confirmationMessage.classList.remove("hidden");
          }, 2000);
        }, 5000);
      } else {
        alert("Помилка! Спробуйте ще раз.");
      }
    })
    .catch(() => {
      alert("Помилка при відправленні форми.");
    });
});
