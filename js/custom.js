// BURGER-MENU
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
$(".wrapper-slider ").each(function () {
  var $slider = $(this);
  var numberOfSlides = $slider.find(".panel").length;

  $slider.find(".panel:eq(0)").addClass("_active");
  $slider.find(".nav-dot:eq(0)").addClass("active");

  var $activeSlide = $slider.find(".panel._active");
  var $nextBtn = $slider.find(".next-btn");
  var $prevBtn = $slider.find(".prev-btn");

  $(".nav-dot").on("click", function () {
    var slideToGo = $(this).data("slide");
    goToSlide(slideToGo);
  });

  $slider.on("slide.changed", function () {
    console.log("slide changed !");
    $(".nav-dot").removeClass("active");
    var $activeDot = $(
      '.nav-dot[data-slide="' + $(".panel._active").data("slide") + '"]'
    );
    console.log();
    $activeDot.addClass("active");
  });

  $nextBtn.on("click", function (event) {
    nextSlide();
  });

  $prevBtn.on("click", function (event) {
    prevSlide();
  });

  function nextSlide() {
    $activeSlide = $slider.find(".panel._active");
    var $nextSlide = $activeSlide.next(".panel");
    $activeSlide.removeClass("_active");
    $nextSlide.addClass("_active");

    //$activeSlide = $nextSlide;

    var slideIndex = $slider.find(".panel._active").index(".panel");
    console.log(slideIndex);

    if (slideIndex >= numberOfSlides || slideIndex <= -1) {
      firstSlide();
      $slider.trigger("slide.changed");
    } else {
      $slider.trigger("slide.changed");
    }
  }

  function prevSlide() {
    $activeSlide = $slider.find(".panel._active");

    var $prevSlide = $activeSlide.prev(".panel");

    $activeSlide.removeClass("_active");
    $prevSlide.addClass("_active");

    var slideIndex = $slider.find(".panel._active").index();
    console.log(slideIndex);

    if (
      typeof $prevSlide === "undefined" ||
      $prevSlide === null ||
      $prevSlide.length == -1 ||
      slideIndex <= -1
    ) {
      lastSlide();
      $slider.trigger("slide.changed");
    } else {
      $slider.trigger("slide.changed");
    }
  }

  function firstSlide() {
    $(".panel._active").removeClass("_active");
    $slider.find(".panel:eq(0)").addClass("_active");
    $activeSlide = $slider.find(".panel:eq(0)");
  }

  function lastSlide() {
    $(".panel._active").removeClass("_active");
    $slider
      .find(".panel")
      .eq(numberOfSlides - 1)
      .addClass("_active");
  }

  function goToSlide(slideToGo) {
    $(".panel._active").removeClass("_active");
    $slider
      .find(".panel")
      .eq(slideToGo - 1)
      .addClass("_active");
    $activeSlide = $slider
      .find(".panel")
      .eq(slideToGo - 1)
      .addClass("_active");
    $slider.trigger("slide.changed");
  }
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

// Input
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
