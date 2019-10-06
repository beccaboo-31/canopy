const message = document.querySelector('#message');
const chatroom = document.querySelector('#title');

//console.log(chatroom.innerHTML);


var urlString = window.location.href;
console.log(urlString);
urlParams = parseURLParams(urlString);
chatroom.innerHTML = urlParams["chatroomname"][0];
console.log(urlParams["chatroomname"][0]);

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


function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}



const chatroom_messages = document.querySelector('#chatroom-messages');

setupchats = (data) => {
        let html = '';
        var c=0;
        var li=``;
        data.forEach(doc => {
          c=c+1;
          console.log(c%2, c%2==0);
          const event = doc.data();
          if(c%2 === 0){
            li = `<li class="collection-item avatar active">
                <i class="material-icons circle">folder</i>
                <span class="title">${event.message}</span>
                <p>${event.user}</p>
              </li>`;
          }
          else{
            li = `<li class="collection-item avatar">
            <i class="material-icons circle">folder</i>
            <span class="title">${event.message}</span>
            <p>${event.user}</p>
          </li>`;
          }
          
          //Use backtick instead of quotations to generate a template string
          
          html += li;
        });
        chatroom_messages.innerHTML = html;
};