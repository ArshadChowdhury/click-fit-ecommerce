$(document).ready(function () {
  // AJAX call to numbersapi
  console.log("Loaded");
  //   $.ajax({
  //     url: "http://numbersapi.com/1/30/date?json",
  //     type: "GET",
  //     dataType: "json",
  //     success: function (data) {
  //       $("#content").html(data.text);
  //       // You can write this information to some area in the page
  //       // e.g., $('#info-area').html(data.text);
  //       console.log(data);
  //     },
  //     error: function (error) {
  //       console.error("Error fetching data:", error);
  //     },
  //   });

  // Simulate an AJAX call to fetch image URLs
  const imageUrls = [
    "https://img.freepik.com/free-vector/hand-drawn-soccer-facebook-cover-template_23-2149323642.jpg?w=1380&t=st=1702321745~exp=1702322345~hmac=fb16925880b8cc6864423cb0546b7d6f48b5a01ad5f5c33fd816071c71133210",
    "https://img.freepik.com/premium-vector/sports-background-vector-international-sports-day-illustration-graphic-design-decoration-gift-certificates-banners-flyer_7888-966.jpg?w=1480",
    "https://img.freepik.com/premium-vector/national-sports-background-national-sports-day-celebration-dynamic-background-with-footballers_758894-1113.jpg?w=1380",
    "https://img.freepik.com/premium-vector/traditional-european-soccer-ball-dynamic-abstract-background-with-copy-space-soccer-banner-vector-template_236756-91.jpg?w=1380",
  ];

  // Generate Swiper slides dynamically
  const swiperContainer = $(".swiper-container");
  const swiperWrapper = $(".swiper-wrapper");

  for (var i = 0; i < imageUrls.length; i++) {
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
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    // // And if we need scrollbar
    // scrollbar: {
    //   el: ".swiper-scrollbar",
    // },
  });
});
