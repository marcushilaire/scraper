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
  })
}
$("#postComment").on("click",function(){
    postComment($(this).attr("data-hardwareid"))})