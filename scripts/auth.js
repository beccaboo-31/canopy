// listen for auth status changes

auth.onAuthStateChanged(user => {
  if (user) {
    db.collection('events').onSnapshot(snapshot => {
      //console.log(snapshot.docs[4].data.name);
      // setupGuides(snapshot.docs);
      setupGuides(obj_events);             //Getting only those events within 4km. Called from map.js
      // do_something(userLat,userLon);
      setupUI(user);
      
    }, err => console.log(err.message));
  } else {
    setupUI();
    setupGuides([]);
  }
});

// create new guide
// const createForm = document.querySelector('#create-form');
// createForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   db.collection('guides').add({
//     title: createForm.title.value,
//     content: createForm.content.value
//   }).then(() => {
//     // close the create modal & reset form
//     const modal = document.querySelector('#modal-create');
//     M.Modal.getInstance(modal).close();
//     createForm.reset();
//   }).catch(err => {
//     console.log(err.message);
//   });
// });

// chatroom
const message = document.querySelector('#message');
const chatroom = document.querySelector('#title');

db.collection(chatroom.innerHTML()).onSnapshot(snapshot => {
  console.log("reached here");
  //setupchats(snapshot.docs);
}, err => console.log(err.message));

message.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = message['content'].value;
  console.log('here now');
  db.collection(chatroom.innerHTML()).add({
    message:msg,
    user:auth.currentUser
  });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();    //Prevents page from refreshing 
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(()=>{
    console.log("User signed out");
  });
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});