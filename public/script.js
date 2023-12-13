$(document).ready(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("animate-in", entry.isIntersecting);
    });
  });
  const animatedContainers = document.querySelectorAll(".other-container");

  animatedContainers.forEach((element) => observer.observe(element));

  // AJAX call to numbersapi to fetch data
  $.ajax({
    url: "http://numbersapi.com/1/30/date?json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      $("#content").html(data.text);
    },
    error: function (error) {
      console.error("Error fetching data:", error);
    },
  });

  // Simulate an AJAX call to fetch image URLs
  const imageUrls = [
    "https://img.freepik.com/free-vector/hand-drawn-soccer-facebook-cover-template_23-2149323642.jpg?w=1380&t=st=1702321745~exp=1702322345~hmac=fb16925880b8cc6864423cb0546b7d6f48b5a01ad5f5c33fd816071c71133210",
    "https://img.freepik.com/premium-vector/sports-background-vector-international-sports-day-illustration-graphic-design-decoration-gift-certificates-banners-flyer_7888-966.jpg?w=1480",
    "https://img.freepik.com/premium-vector/national-sports-background-national-sports-day-celebration-dynamic-background-with-footballers_758894-1113.jpg?w=1380",
    "https://img.freepik.com/premium-vector/traditional-european-soccer-ball-dynamic-abstract-background-with-copy-space-soccer-banner-vector-template_236756-91.jpg?w=1380",
  ];

  // Generate Swiper slides dynamically
  const swiperWrapper = $(".swiper-wrapper");

  for (let i = 0; i < imageUrls.length; i++) {
    const slide = $("<div>").addClass("swiper-slide");
    const img = $("<img>").attr("src", imageUrls[i]).attr("alt", "");
    slide.append(img);
    swiperWrapper.append(slide);
  }

  new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 4000, // Adjust the delay (in milliseconds) between slides
      disableOnInteraction: false, // Set to false to continue autoplay after user interaction (e.g., slide manually)
    },
    effect: "coverflow",
    speed: 2000,
    // Pagination for the images
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  const dropArea = $("#dropArea");
  const fileInput = $("#image");
  let haveFile = false;

  // Implementing the drag and drop and upload functionality here
  dropArea
    .on(
      "drag dragstart dragend dragover dragenter dragleave drop",
      function (e) {
        e.preventDefault();
        e.stopPropagation();
      }
    )
    // Adding and remove green borders to indicate if we're getting the image or not
    .on("dragover dragenter", function () {
      dropArea.addClass("dragover");
    })
    .on("dragleave dragend drop", function () {
      dropArea.removeClass("dragover");
    })
    // After dropping off we wanna get the file uploaded
    .on("drop", function (e) {
      const files = e.originalEvent.dataTransfer.files;
      handleFiles(files);
    })
    .on("click", function (e) {
      fileInput[0].click();
    });

  fileInput.change(function () {
    const files = $(this)[0].files;
    handleFiles(files);
  });

  function handleFiles(files) {
    // Handle uploaded files here
    if (files.length > 0) {
      // Setting variable to determine if we have an image uploaded or not
      haveFile = true;
      // Set the text when a file is selected
      dropArea.html(
        `<span>${files[0].name}</span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="x-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`
      );
      dropArea.css({
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      });
      $(".x-icon").click(function (e) {
        e.stopPropagation();
        // Clear the input value to allow selecting the same file again
        fileInput.val("");
        // Update the text and styles after removing the file
        handleFiles([]);
      });
    } else {
      haveFile = false;
      // Set the default text when no file is selected
      dropArea.text("Drag and drop a file here or click to select one.");
    }
  }

  $(".submit-btn").on("click", (e) => {
    e.preventDefault();
    if (haveFile) {
      alert("Got the file");
      fileInput.val("");
      handleFiles([]);
    } else {
      alert("Please select a file first.");
    }
  });

  const toggleButton = $(".navbar-toggler");
  const sidebar = $("#sidebar");
  const xIconSidebar = $(".x-icon-sidebar");

  toggleButton.click(function () {
    sidebar.addClass("active");
  });

  xIconSidebar.click(function () {
    sidebar.removeClass("active");
  });
});
