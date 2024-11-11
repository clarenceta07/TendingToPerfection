const minPeopleOfTable = 1;
const classNameDesk4People = ".desk-4";
const classNameDesk6People = ".desk-6";
const classNameDesk8People = ".desk-8";

function createPeople(counter) {
  const contPerson = document.createElement("div");
  contPerson.className = `cont-person person-${counter}`;

  const personElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  personElement.setAttributeNS(null, "viewBox", "0 0 42 40");
  personElement.innerHTML = `<g transform="rotate(180 21 20)" fill-rule="nonzero" fill="none">
          <path d="M14.673 39.246c1.647.173 3.917-1.113 4.09-2.76.173-1.648-1.797-3.206-3.445-3.38-1.648-.172-5.61.762-5.784 2.41-.173 1.647 3.49 3.557 5.139 3.73Zm14.399-1.111c-1.698.552-4.342-.183-4.854-1.759-.512-1.575 1.248-3.56 2.946-4.111 1.698-.552 6.053-.555 6.565 1.021.512 1.576-2.959 4.298-4.657 4.85v-.001Z" fill="#FBD9AD" />
          <path d="M21 22.087h10.278C29.308 27.27 28.55 30.304 29 31.19c1.507 2.959 4.97 5.274 5.69 4.7C39.17 32.317 42 27.117 42 21 42 9.402 32.598 0 21 0S0 9.402 0 21c0 5.288 6.23 11.583 9 15.463 0 0 4.195-.12 4.932-5.274.208-1.45-.103-4.484-.932-9.102h8Z" fill="#000" />
          <path d="M21 22.087h10.278C29.308 27.27 28.55 30.304 29 31.19c1.507 2.959 4.97 5.274 5.69 4.7C39.17 32.317 42 27.117 42 21 42 9.402 32.598 0 21 0S0 9.402 0 21c0 5.288 6.23 11.583 9 15.463 0 0 4.195-.12 4.932-5.274.208-1.45-.103-4.484-.932-9.102h8Z" fill="#EE8A7D" />
          <circle fill="#FBD9AD" cx="21" cy="10" r="8" />
          <path d="M20.977 13.478c4.418 0 8.023-4.249 8.023-5.324C29 3.736 25.418 0 21 0s-8 6.267-8 8.154c0 1.887 3.558 5.324 7.977 5.324Z" fill="#3A3A3A" />
        </g>`;

  contPerson.appendChild(personElement);
  return contPerson;
}

function upQuantity(classNameDesk, maxPeople) {
  const element = document.querySelector(classNameDesk).classList;
  const counterItem = +document.querySelector(`${classNameDesk}-text-counter`)
    .textContent;
  if (counterItem < maxPeople) {
    const resultCounterItem = counterItem + 1;
    element.remove("quantity-" + counterItem);
    element.add(`quantity-${resultCounterItem}`);
    document.querySelector(
      `${classNameDesk}-text-counter`
    ).innerHTML = resultCounterItem;
  }
}

function lowerQuantity(classNameDesk) {
  const element = document.querySelector(classNameDesk).classList;
  const counterItem = +document.querySelector(`${classNameDesk}-text-counter`)
    .textContent;
  if (counterItem > minPeopleOfTable) {
    const resultCounterItem = counterItem - 1;
    element.remove(`quantity-${counterItem}`);
    element.add(`quantity-${resultCounterItem}`);
    document.querySelector(
      `${classNameDesk}-text-counter`
    ).innerHTML = resultCounterItem;
  }
}

function init(classItem, quantity) {
  for (let i = 0; i < quantity; i++) {
    document.querySelector(`${classItem}`).appendChild(createPeople(i));
  }
}

window.onload = function () {
  init(classNameDesk8People, 8);
};


function populateTimeOptions() {
  var select = document.getElementById('reservationTime');
  // Start at 18:00 in 24-hour format, which is 6:00 PM in 12-hour format
  for (var hour = 18; hour <= 23; hour++) {
      for (var mins = 0; mins < 60; mins += 30) { // Use < 60 if you want to stop at 11:30 PM
          var hour12 = hour > 12 ? hour - 12 : hour; // Convert to 12-hour format
          var suffix = hour >= 12 ? 'PM' : 'AM';
          var time = hour12 + ":" + (mins === 0 ? "00" : "30") + " " + suffix;
          var option = document.createElement("option");
          option.value = time;
          option.text = time;
          select.appendChild(option);
      }
  }
}

// Initialize the form
document.addEventListener('DOMContentLoaded', function() {
  populateTimeOptions();
});


function goToStep(stepNumber) {
  var step1 = document.getElementById('step1');
  var step2 = document.getElementById('step2');

  if (stepNumber === 1) {
      step1.style.display = 'block';
      step2.style.display = 'none';
  } else if (stepNumber === 2) {
      step1.style.display = 'none';
      step2.style.display = 'block'; 
  }

  // Update progress bar if needed
  var progressBar = document.getElementById('progressBar');
  if (progressBar) {
      progressBar.style.width = stepNumber === 1 ? '50%' : '100%';
  }
}
 
//INPUT MASKING SECTION

const maskType = {
  y: '[0-9]', m: '[0-9]', d: '[0-9]',
  Y: '[0-9]', M: '[0-9]', D: '[0-9]',
  9: '[0-9]', 
  x: '[a-zA-Z]', X: '[a-zA-Z]'
};

// analyze mask-related data from keydown event
function getMaskData(event) {
  const inputEl = event.target;
  const maskArr = inputEl.getAttribute('placeholder').split('');
  const length = inputEl.value.length;
  const inputChar = event.key; // last input character. e.g. for 'yy/', '1'
  const matchingMask = maskArr[length]; // matching mask character e.g. for 'yy/', 'y'

  return {inputEl, inputChar, maskArr, matchingMask};
}

// if next chars is/are help char(s), append those. e.g., '/' at '99/99'
function addNextMask(inputEl, maskArr) {
  setTimeout( function() {
    const inputValLen =  inputEl.value.length;
    for (var i = inputValLen; i < maskArr.length; i++) {
      const nextMask = maskArr[i];
      if (nextMask && !maskType[nextMask]) {
        inputEl.value += nextMask;
      } else {
        break;
      }
    }
  });
}

// check if input char is acceptable or not by checking with mask character
function isInputAcceptable(inputChar, maskChar) {
  const reExpStr = maskType[maskChar];
  if (reExpStr) {
    const reStr = `^${reExpStr}$`
    const re = new RegExp(reExpStr);
    return !!inputChar.match(re);
  }
}

// when mask starts with help char, append the help char before processing
// e.g. (999) 999-9999
function appendStartMaskChar(inputEl, maskArr) {
  const firstMaskChar = maskArr[0];
  if (inputEl.value.length === 0 && !maskType[firstMaskChar]) {
    inputEl.value = firstMaskChar;
    return true;
  }
}

function checkInput(event) {
  const {inputEl, inputChar, maskArr, matchingMask} = getMaskData(event);
  const isCharInput = inputChar.match(/^\S$/);

  if (isCharInput && appendStartMaskChar(inputEl, maskArr)) {
    checkInput(event);
    return false;
  }

  if (isCharInput && !matchingMask) { 
    event.preventDefault(); // when too many input, ignore input
  } else if (isCharInput) { // character input
    if (!isInputAcceptable(inputChar, matchingMask)) {
      event.preventDefault(); // if not match to mask char, ignore input
    }
    addNextMask(inputEl, maskArr);
  } else { // for special char.
    // console.log('yes space char', inputEl.value, inputChar, event.key, event.keyCode);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Attach the click event listener to the next button
  document.getElementById('nextButton').addEventListener('click', validateAndGoToStep2);
});

function validateAndGoToStep2() {
  var isValid = true;
  var inputs = document.querySelectorAll('#step1 .form-item input');
  
  inputs.forEach(function(input) {
    var label = input.nextElementSibling; // Get the label immediately following the input

    // Reset the label color
    label.style.color = '#999';

    // Check if the input is valid
    if (!input.checkValidity()) {
      label.style.color = 'red'; // Change label color to red
      isValid = false;
    }
  });

  // If all inputs are valid, go to step 2
  if (isValid) {
    goToStep(2);
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  var today = new Date().toISOString().split('T')[0];
  document.getElementById("reservationDate").setAttribute('min', today);
});

//JQUERY DATEPICKER UI
$(document).ready(function() {
  $("#reservationDate").datepicker({
    minDate: 0, // Ensures the user can only select today's date or later
    dateFormat: "mm/dd/yy" // Set the format you need for the date
  });
});

$(document).ready(function() {
  $("#submitReservation").click(function(event) {
      event.preventDefault(); // This prevents the default form submission

      var firstName = $("#firstname").val();
        var lastName = $("#lastname").val();
        var selectedDate = $("#reservationDate").val();
        var selectedTime = $("#reservationTime").val();
        var partySize = $(".desk-8-text-counter").text(); // Assuming this span holds the party size

        if (selectedDate) {
            // Construct the message with each detail on a new line
            var reservationDetails = `Name: ${firstName} ${lastName}\n` +
                                     `Date: ${selectedDate}\n` +
                                     `Time: ${selectedTime}\n` +
                                     `Party Size: ${partySize}`;

            // Show the SweetAlert modal with the reservation details
            Swal.fire({
              title: 'Reservation Submitted!',
              html: 'Your table reservation details:<br><br>' + reservationDetails.replace(/\n/g, '<br>'), // Using HTML and replacing newlines with <br> tags
              icon: 'success'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "../index.html";
              }
            });
        } else {
            // If no date is selected, show a warning message
            Swal.fire({
              title: 'Incomplete Reservation',
              text: 'Please select a date for your reservation.',
              icon: 'error'
            });
        }
    });
});

$('.initbutton').on('click', toggleBtn);


function toggleBtn() {
  btn = this;
  btn.classList.add('is-active');
  


  setTimeout(function () {
    btn.classList.remove('is-active');
    btn.style.display = 'none'; // Hide the button

    // Display the new divs
   // document.getElementById('lololol').style.display = 'block';
   // document.getElementById('newDiv1').style.display = 'block';
   // document.getElementById('newDiv2').style.display = 'block';

    document.getElementById("leftside").style.width = "40%";
    
    var secondDiv = document.getElementById("rightside");
    secondDiv.style.display = "block";
    secondDiv.style.width = "50%";

   // var script = document.createElement('script');
   // script.type = 'text/javascript';
   // script.src = 'form.js'; // Replace with the path to your script
//
   // document.getElementById('rightside').appendChild(script);

}, 2100);
}