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
