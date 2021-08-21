"use strict";
let login;

class Message {
  constructor(content, authorId, timestamp) {
    this.content = content;
    this.authorId = authorId;
    this.timestamp = timestamp;
  }
}

function genRandomMs() {
  // Returns a random number between 0 and 10 seconds, in milliseconds
  return Math.floor(Math.random() * 1e4);
}

function prettifyDate(timestamp) {
  // Returns the date in hh:mm am/pm format
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(Number(timestamp)).toLocaleTimeString("en-US", options);
}

function showMessage(msg) {
  const { content, authorId, timestamp } = msg;
  const $HtmlMsg = $(`
    <div class="message ${authorId === "user" ? "right" : "left"}">
      <div class="message-text">${content}</div>
      <div class="message-time">${prettifyDate(timestamp)}</div>
    </div>
  `);
  $(".messages-container").append($HtmlMsg);
}

function simulateIncomingMessages() {
  setTimeout(() => {
    $.get("https://cw-quotes.herokuapp.com/api/quotes/random", (data) => {
      const msg = new Message(data.result.text, "bot", Date.now());
      showMessage(msg);
      scrollToBottom();
      postToServer(msg);
      createUserScript(msg);
    });
  }, genRandomMs());
}

//built to check that database was sending something from server.
//function previously called in simulateIncomingMessages and ready function
// function getDatabase() {
//   let db = $.get('/message', function () {});
//   console.log('database');
//   console.log(db);
// }

function scrollToBottom() {
  const $messages = $(".messages-container");
  $messages.animate({
    scrollTop: $messages[0].scrollHeight,
  });
}

function postToServer(data) {
  //need to use ajax as $.post doesn't work.
  //need to ensure url is correct and data property recieves correct variable.
  //content type - need to specify that it is json
  $.ajax({
    url: `/messages/${login}`,
    method: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
  });
}

// function createUserScript(data) {
//   $.ajax({
//     url: "/user",
//     method: "POST",
//     data: JSON.stringify(data),
//     contentType: "application/json",
//   });
// }

$(() => {

  $('#login-form').on("submit", (e) => {
    e.preventDefault();
    login = $("#username").val()
    if (login) {
      $('.logInDiv').fadeOut("slow");
      $('#msg-form').css('display', 'flex')
      $.get(`/messages/${login}`).then((res) => res.forEach((msg) => showMessage(msg)));
      scrollToBottom();
    }
  })

  $("#msg-form").on("submit", (e) => {
    e.preventDefault();
    const content = $("#text").val();
    if (content) {
      $("#text").val("");
      const msg = new Message(content, "user", Date.now());
      showMessage(msg);
      scrollToBottom();
      simulateIncomingMessages();
      postToServer(msg);
      // createUserScript(msg);
    }
  });
});
