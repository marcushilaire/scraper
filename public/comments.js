console.log("   COMMENTS ARE LINKED")
var postComment= function(ID){
$.ajax({
    method: "POST",
    url: "/hardware/" + ID,
    data: {
      // Value taken from title input
      title: $("#title").val(),
      // Value taken from note textarea
      body: $("#userComment").val()
  
    }
  }).then(function(){
    location.reload()
  })
}
var deleteComment =function(ID){
  $.ajax({
    method: "POST",
    url:"/delete/"+ID,
  }).then(function(){
    window.location.replace("/")
  })
}
$("#postComment").on("click",function(){
    postComment($(this).attr("data-hardwareid"))})
$(".deleteComment").on("click",function(){
  deleteComment($(this).attr("data-id"))})