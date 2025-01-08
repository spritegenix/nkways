// Get the modal
var modal = document.getElementById('myModal');
let baseUrl = 'https://www.nkwayshome.co.za/admin_panel/website_management';
// Get the button that opens the modal
var btn = document.getElementById('addTestimonial');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// Form submission (for demonstration)
document.getElementById('testimonialForm').onsubmit = function (event) {
  event.preventDefault();

  // Get form values
  var username = document.getElementById('username').value;
  var designation = document.getElementById('designation').value;
  // var phone = document.getElementById('phone').value;
  var message = document.getElementById('message').value;

  // Prepare the data to send as JSON
  var formData = {
    profile_pic: 'img/testimonial/test_img01.png',
    user_name: username,
    designation: designation,
    ratings: '5',
    review: message,
  };

  // Send the form data as JSON using fetch API with updated URL
  fetch(`${baseUrl}/submit-testimonial`, {
    method: 'POST',
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Assuming the server responds with JSON
    })
    .then((data) => {
      // Handle the server response (you can display a success message, etc.)

      // Close the modal after successful submission
      modal.style.display = 'none';

      // Optionally, reset the form
      document.getElementById('testimonialForm').reset();
      window.location.reload();
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error:', error);
    });
};

window.onload = function () {
  const testimonialContainer = document.querySelector(
    '.slider.slider-for.testimonialInside'
  );

  if (!testimonialContainer) {
    console.error('Testimonial container not found!');
    return;
  }

  fetch(`${baseUrl}/all-reviews`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === 'success' && Array.isArray(data.data)) {
        // Clear existing content
        testimonialContainer.innerHTML = '';

        // Append each testimonial
        data.data.forEach((review) => {
          const testimonialHTML = `
            <div class="single-testimonial">
              <div class="com-icon">
                <img src="img/bg/Icon_comment.png" alt="Comment Icon" />
              </div>
              <p>${review.review.trim()}</p>
              <div class="testi-author d-flex gap-4 justify-content-center align-items-center">
                <img src="${review.profile_pic}" alt="${review.user_name}" />
                <div class="ta-info mt-0 ml-3 text-center">
                  <h6>${review.user_name}</h6>
              
                </div>
              </div>
            </div>`;
          testimonialContainer.innerHTML += testimonialHTML;
        });

        // Re-initialize Slick.js after content is added
        if (
          typeof $ !== 'undefined' &&
          typeof $('.testimonialInside').slick === 'function'
        ) {
          $('.testimonialInside').slick('unslick'); // Destroy existing instance if present
          $('.testimonialInside').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            // dots: true,
          });
        } else {
          console.warn(
            'Slick.js not initialized. Ensure the library is loaded.'
          );
        }
      } else {
        console.error('Unexpected response format:', data);
      }
    })
    .catch((error) => {
      console.error('Error fetching testimonials:', error);
    });

  // let posts = document.getElementById('blogPosts');
  // fetch('http://localhost/admin_panel/website_management/allposts')
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) =>
  //     data.data.forEach((blog) => {
  //       const postsHtml = `
  //     <div class="single-testimonial">

  //              <p>${blog.title}</p>
  //              <div class="testi-author d-flex gap-4 justify-content-center align-items-center">
  //                <img src="http://localhost/admin_panel/public/images/posts/small-size${blog.featured}" alt="${blog.title}" />
  //                <div class="ta-info mt-0 ml-3 text-center">
  //                  <h6>${blog.short_description}</h6>
  //              <p>${blog.description}</p>
  //                </div>
  //              </div>
  //            </div>
  //    `;
  //       posts.innerHTML += postsHtml;
  //     })
  //   );
};
