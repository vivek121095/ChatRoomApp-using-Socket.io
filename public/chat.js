
$("#orange").click(function() {
  $("body").css({"background-color":"orange"});
});
$("#red").click(function() {
  $("body").css({"background-color":"red"});
});
$("#pink").click(function() {
  $("body").css({"background-color":"pink"});
});

var socket;
//Query DOM
var message = $("#message"), handle = $("#handle") ,
 btn = $("#send") , output = $("#output") ,feedback = $("#feedback"),
 form = $("#chat");

 //emit events
 form.submit(function(event) {
   event.preventDefault();
   socket.emit('chat',{
     message : message.val(),
     handle : handle.val(),
   });

   output.append('<div class="messagebox"><p class="msg">'+message.val()+"</p></div>");
   message.val('');
 });
//typing event broadcasting
message.keypress(function(event) {
   socket.emit('typing',{
     handle : handle.val()
   });
});

$("#login").click(function (e) {
  if(!handle.prop('disabled')&&handle.val()==''){
    alert('Please enter username');
  }
  else {
    $("#login").toggleClass('logout');
    if($("#login").html()==='Login'){
      $("#login").html('Logout');
      message.prop('disabled',false);
      btn.prop('disabled',false);
      handle.prop('disabled',true);
      socket = io.connect('http://localhost:4000');
      socket.emit('online',handle.val());

      socket.on('chat',function (data) {
        feedback.html('');
        output.append('<div class="messagebox1" ><p class="msg" style="background-color:orange"><strong>'+data.handle+' :  </strong>'+data.message+"</p></div>");
      });

      socket.on('typing',function (data) {
        feedback.html('<p><em>'+data.handle+' is typing is message ....</em></p>');

      });

      socket.on('offline',function (data) {
        output.append('<center><em>'+data+' is offline</em></center>');

      });

      socket.on('online',function (data) {
        output.append('<center><em>'+data+' is online</em></center>');

      });

    }
    else {
      $("#login").html('Login');
      message.prop('disabled',true);
      message.val('');
      output.html('');
      feedback.val('');
      btn.prop('disabled',true);
      handle.prop('disabled',false);
      socket.emit('offline',handle.val());
      handle.val('');
      socket.disconnect();
    }
  }

});
