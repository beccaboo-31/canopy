// DOM elements
const eventList = document.querySelector('.events');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const addButton = document.querySelector('.add-btn');
const eventForm=document.querySelector('#add-event-form');

const setupUI = (user) => {
  if (user) {
    // account info
    const html = `
      <div>Logged in as ${user.email}</div>
    `;
    accountDetails.innerHTML = html;

    eventForm.addEventListener('submit', (e) => {
      addevent(e);
    });

    // toggle user UI elements
    addButton.style.display='center';
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    addButton.style.display='none';
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// Add event function
const addevent= (e) => {
  e.preventDefault();
      
      // get user info
      const eventname = eventForm['event-name'].value;
      const eventdesc = eventForm['event-description'].value;
      const eventhighlights = eventForm['event-highlights'].value;
      const eventschedule = eventForm['event-schedule'].value;
      const eventhost = eventForm['event-host'].value;
      const eventaddress = eventForm['event-address'].value;
    
      var url="https://us1.locationiq.com/v1/search.php?key=3340ae6a77d85c&q=";
      var lat=0.0, lon=0.0;
      //Retreive address from the page
      url=url+eventaddress+"&format=json";

      const fetchPromise = fetch(url);
      fetchPromise.then((response) => {  //Add the lat lng obtained from the response to the database
        response.json().then(data => {
          lat=data[0]["lat"];
          lon=data[0]["lon"];
          console.log("LAT: "+lat+"LON: "+lon);

          db.collection('events').add({
            name: eventname,
            description: eventdesc,
            highlights: eventhighlights,
            schedule: eventschedule,
            address: eventaddress,
            host: eventhost,
            lat: lat,
            lon: lon
          }); 
        });
      });

      const modal = document.querySelector('#modal-add-event');
      M.Modal.getInstance(modal).close();
      eventForm.reset();
}

// setup guides
const setupGuides = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const event = doc.data();
      //Use backtick instead of quotations to generate a template string
      const li = `       
        <li>
          <div class="row">
            <div class="col s12 m6">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title">${event.name}</span>
                  <p>${event.schedule}</p>
                  <p>${event.description}</p>
                  <p><em>${event.highlights}</em></p>
                </div>
                <div class="card-action">
                  <a class="" data-target="add-wishlist">Interested</a>
                  <a class="" data-target="add-guest">Go to Event</a>
                </div>
              </div>
            </div>
          </div>
        </li>
      `;
      html += li;
    });
    eventList.innerHTML = html
  } else {
    eventList.innerHTML = '<h5 class="center-align">Login to view events</h5>';
  }
  

};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});

});