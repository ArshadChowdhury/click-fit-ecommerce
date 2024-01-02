// Checking if the DOM is ready

$(document).ready(function () {
  $("#registrationForm").submit(function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Gather form data
    var formData = {
      name: $("#name").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
      password: $("#password").val(),
    };

    $.ajax({
      type: "POST",
      url: "/register",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(formData),
      success: function (response) {
        // console.log("Server response:", response);
        if (response.user) {
          location.assign("/dashboard");
        }
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  });

  // Function to add a new single product
  function addProduct(imageSrc, productName, price, rating) {
    const productHtml = `
      <div class="single-product">
        <img src="${imageSrc}" alt="" />
        <div class="single-product-container">
          <p>${productName}</p>
          <span>${price}</span>
          <span>${rating}</span>
        </div>
      </div>
    `;
    $(".products").append(productHtml);
  }

  // Use a loop to add the same product 15 times
  for (let i = 0; i < 15; i++) {
    addProduct(
      "https://rukminim2.flixcart.com/image/832/832/kvtuxe80/shirt/v/p/a/l-t-chc-dustygreen-kibit-original-imag8n5ymxbghcav.jpeg?q=70",
      "New Stylish Shirt",
      "$50",
      "5 Star rating"
    );
  }
  // Setting up intersection observer to know if user is intersecting with the section otherwies they'll be hidden
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // If they're intersecting I'll add animate in class which will animate in the section
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

  // Fetch image URLs to loop over them and display them
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
    // Parameters to configure swiper
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

  // Drag and drop area and image fileinput targeted here
  const dropArea = $("#dropArea");
  const fileInput = $("#image");
  let haveFile = false;
  let image = null;

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
    // After dropping off we wanna get the image uploaded
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
      image = files[0];
      // Set the text when a image is selected to upload
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
        // Clear the input value to allow selecting the same image again
        fileInput.val("");
        // Update the text and styles after removing the image
        handleFiles([]);
      });
    } else {
      haveFile = false;
      // Set the default text when no image is selected
      dropArea.text("Drag and drop an image here or click to select one.");
    }
  }

  $(".submit-btn").on("click", (e) => {
    e.preventDefault();

    if (haveFile) {
      // Create FormData object and append the image
      const formData = new FormData();
      formData.append("image", image);
      // Checking if the uploaded file is indeed an image
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const selectedFileType = image.type;

      if (allowedTypes.includes(selectedFileType)) {
        // If file is an image, proceed with the upload
        const formData = new FormData();
        formData.append("image", image);

        // Make an AJAX request to the server
        $.ajax({
          type: "POST",
          url: "/upload-image",
          data: formData,
          contentType: false,
          processData: false,
          success: function (data) {
            alert("Image uploaded successfully");
            // Clearing the file input and handleFiles([]) here after successful submission
            fileInput.value = "";
            handleFiles([]);
          },
          error: function (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image");
          },
        });
      } else {
        alert("Please upload a valid image file (JPEG, PNG, GIF).");
      }
    } else {
      alert("Please select an image first.");
    }
  });

  //Sidebar toggling for mobile responsive menu

  const toggleButton = $(".navbar-toggler-small");
  const sidebar = $("#sidebar");
  const xIconSidebar = $(".x-icon-sidebar");

  toggleButton.click(function () {
    sidebar.addClass("active");
  });

  xIconSidebar.click(function () {
    sidebar.removeClass("active");
  });
  // Close sidebar when clicking on mobile nav items
  $(".mobile-nav-item a").click(function () {
    sidebar.removeClass("active");
  });
});
