// DOM elements
const eventList = document.querySelector('.events');
var eventUList=document.querySelector('#event-list');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

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
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
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
    
      db.collection('events').add({
        name: eventname,
        description: eventdesc,
        highlights: eventhighlights,
        schedule: eventschedule,
        address: eventaddress,
        host: eventhost
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
        delbutton.className="col s2 m1 delete-button";
      var icon=document.createElement('i');
        icon.className="material-icons";
        icon.textContent="delete";
      var row2=document.createElement('div');
        row2.className="row";
      var card3=document.createElement('div');
        card3.className="card-action col s12 m6";
      var link1=document.createElement('a');
        link1.textContent="Interested";
      var link2=document.createElement('a');
        link2.textContent="Go to Event";

      row1.setAttribute('data-id',doc.id);

      li.appendChild(card1);
        card1.appendChild(card2);
          card2.appendChild(row1);
          card2.appendChild(row2);
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
    });
  //   eventList.innerHTML = html
  } else {
    eventList.innerHTML = '<h5 class="center-align">Login to view events</h5>';
  }
};

// document.addEventListener("click", function(e){
//   if(e.target && )
// })
// setup materialize components
document.addEventListener('DOMContentLoaded', (e)=>{
  // console.log("dom loaded")
  //deleteEvent();
  var trash = document.getElementsByClassName("delete-button");
  for (var i = 0; trash.length > i; i++) {
    console.log(trash[i]);
  }
  // trash.forEach( item => {
    // console.log("item is "+ item);
    // item.addEventListener("click", (e)=>{
    //   // e.stopPropagation();
    //   // let id=e.target.parentElement.parentElement.parentElement.parentElement.getAttribute(data-id);
    //   // db.collection('events').doc(document_id).delete();
    //   console.log(e);
    // });
  // });


  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});

});

function deleteEvent(){
  // Delete Event
  //var trash = document.getElementsByClassName("delete-button");
  //for (var i = 0; trash.length > i; i++) {
  //  console.log(trash[i]);
  //}

  //Array.prototype.forEach.call(trash, function(el) {
    // Do stuff here
  //  console.log(el);
  //});

  // console.log(trash);
  // console.log(trash.length);
  // for(let t of trash){
  //   console.log(t)
  // }
  // for(let i=0;i<trash.length;i++){
  //   console.log(trash);
  //   trash[i].addEventListener("click",(e)=>{
  //     // e.stopPropagation();
  //     // let id=e.target.parentElement.parentElement.parentElement.parentElement.getAttribute(data-id);
  //     // db.collection('events').doc(document_id).delete();
  //     console.log(e);
  //   });
  // }
}