const message = document.querySelector('#message');
const chatroom = document.querySelector('#title');

//console.log(chatroom.innerHTML);

db.collection(chatroom.innerHTML).onSnapshot(snapshot => {
  console.log("reached here");
  setupchats(snapshot.docs);
}, err => console.log(err.message));

message.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = message['content'].value;
  console.log('here now');
  db.collection(chatroom.innerHTML).add({
    message:msg,
    user:auth.currentUser.email
  });
});

const chatroom_messages = document.querySelector('#chatroom-messages');

setupchats = (data) => {
        let html = '';
        data.forEach(doc => {
          const event = doc.data();
          //Use backtick instead of quotations to generate a template string
          const li = `       
            <li>
            ${event.message} <br>  ${event.user}
            </li>
          `;
          html += li;
        });
        chatroom_messages.innerHTML = html;
};