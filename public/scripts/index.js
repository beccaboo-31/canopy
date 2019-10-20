if ('serviceWorker' in navigator) {
  console.log('sw registered!!');
  navigator.serviceWorker.register('/sw.js')
  .then((abc) => {
      console.log('sw here!!');
  })
  .catch((err) => {
      console.log(err);
  });
}


// DOM elements
const eventList = document.querySelector('.events');
var eventUList=document.querySelector('#event-list');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const addButton = document.querySelector('.add-btn');
const eventForm=document.querySelector('#add-event-form');
const indexBanner=document.querySelector('#index-banner');
const landingContent=document.querySelector('#landing-content');

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
    indexBanner.style.display='none';
    landingContent.style.display='none';
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    addButton.style.display='none';
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    indexBanner.style.display='block';
    landingContent.style.display='block';
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

          db.collection(eventname).add({
            message:'Welcome to the group!'
          });

          db.collection('events').add({
            name: eventname,
            description: eventdesc,
            highlights: eventhighlights,
            schedule: eventschedule,
            address: eventaddress,
            host: eventhost,
            lat: lat,
            lon: lon,
            chatroom: eventname
          }); 
        });
      });

      const modal = document.querySelector('#modal-add-event');
      M.Modal.getInstance(modal).close();
      eventForm.reset();
}

// setup guides
const setupGuides = (data) => {
  while(eventUList.firstChild){
    eventUList.removeChild(eventUList.firstChild);
  }
  
  if (data.length) {
    data.forEach(doc => {
      const event = doc.data();
      // const li = `
      // <li>
      // <div class="card blue-grey darken-1">
      // <div class="card-content white-text">
      // <div class="row">
      //             <div class="col s10 m5">
      //                 <span class="card-title">${event.name}</span>
      //                 <p>${event.schedule}</p>
      //                 <p>${event.description}</p>
      //                 <p><em>${event.highlights}</em></p>
      //             </div>
      //             <div class="col s2 m1 delete-button"><i class="material-icons">delete</i> </div>
      //             </div>
      //             <div class="row">
      //             <div class="card-action col s12 m6">
      //             <a class="">Interested</a>
      //             <a class="">Go to Event</a>
      //             </div>
      //             <div class="row">
      //             <div class="card-action col s12 m6">
      //             <a class="">Go to Chatroom</a>
      //             </div>
      //         </div>
      //     </div>
      // </li>
      // `;
      var li = document.createElement('li');
      var card1=document.createElement('div');
        card1.className="card blue-grey darken-1";
      var card2=document.createElement('div');
        card2.className="card-content white-text";
      var row1=document.createElement('div');
        row1.className="row";
      var col1=document.createElement('div');
        col1.className="col s10 m5";
      var eventname=document.createElement('span');
        eventname.className="card-title";
        eventname.textContent=doc.data().name;
      var eventschedule=document.createElement('p');
        eventschedule.textContent=doc.data().schedule;
      var eventdescription=document.createElement('p');
        eventdescription.textContent=doc.data().description;
      var eventhighlights=document.createElement('p');
        eventhighlights.textContent=doc.data().highlights;
      var delbutton=document.createElement('div');
        delbutton.className="col s2 m3 delete-button btn tooltipped";
      var icon=document.createElement('i');
        icon.className="material-icons";
        icon.textContent="delete";
      var row2=document.createElement('div');
        row2.className="row";
      var card3=document.createElement('div');
        card3.className="card-action col s12 m12";
      var link1=document.createElement('a');
        link1.textContent="Interested";
        link1.className="btn tooltipped"
        link1.style="padding-right=20px;"
      var link2=document.createElement('a');
        link2.textContent="Go to Event";
        link2.className="btn tooltipped"
      var row3=document.createElement('div');
        row3.className="row";
      var card4=document.createElement('div');
        card4.className="card-action col s12 m12";
      var link3=document.createElement('a');
        link3.textContent="Go to Chatroom";
        link3.className="btn tooltipped"

      row1.setAttribute('data-id',doc.id);
      row3.setAttribute('data-id',doc.id);
      card3.setAttribute('data-id', doc.id);

      
      li.appendChild(card1);
        card1.appendChild(card2);
          card2.appendChild(row1);
          card2.appendChild(row2);
          card2.appendChild(row3);
            row1.appendChild(col1);
            row1.appendChild(delbutton);
              col1.appendChild(eventname);
              col1.appendChild(eventschedule);
              col1.appendChild(eventdescription);
              col1.appendChild(eventhighlights);
              delbutton.appendChild(icon);
            row2.appendChild(card3);
              card3.appendChild(link1);
              card3.appendChild(link2);
            row3.appendChild(card4);
              card4.appendChild(link3);
      if(li.firstChild.textContent !=null){
        eventUList.appendChild(li);
      }      

      //DELETING EVENT
      delbutton.addEventListener('click', (e)=>{
        e.stopPropagation();
        console.log(e);
        let document_id=e.target.parentElement.parentElement.getAttribute('data-id');
        console.log(document_id);
        db.collection('events').doc(document_id).delete();
        console.log("Deleted");
      })

      //OPEN CHATROOM
      link3.addEventListener('click',(e)=>{
        e.stopPropagation();
        console.log(e);
        console.log(e.target.parentElement.parentElement);
        let document_id=e.target.parentElement.parentElement.getAttribute('data-id');
        console.log(document_id);
        var chatroomname="";
        var url="";
        db.collection('events').doc(document_id).get().then(doc =>{
          if(doc.exists){
            console.log(doc.data().name);
            chatroomname=doc.data().name;
            url = './chat.html?chatroomname=' + encodeURIComponent(chatroomname);
            console.log(url);
            document.location.href = url;
          }
        });
        
      });

      //INTERESTED EVENTS
      link1.addEventListener('click', (e) =>{
        e.stopPropagation();
        console.log(e);
        console.log(e.target.parentElement);
        let event_id=e.target.parentElement.getAttribute('data-id');
        let user=auth.currentUser.uid;
        console.log(user);
        console.log(event_id);
        db.collection('events').doc(event_id).get().then(doc=>{
          if(doc.exists){
            var event_name=doc.data().name;
            console.log(db.collection('users').doc(user));
            db.collection('users').doc(user).update({
              interested: event_name
            });
          }
        });
        // console.log(event);
        // db.collection('users').doc(interested).add({
        //   interested: event
        // });
        // console.log("Interest added");
      });
    });
  //   eventList.innerHTML = html
  } else {
    eventList.innerHTML = '<h5 class="center-align"></h5>';
  }
};


// setup materialize components
document.addEventListener('DOMContentLoaded', (e)=>{
  // console.log("dom loaded")
  


  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});

});
