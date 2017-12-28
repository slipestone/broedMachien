$(document).ready( () =>{

    //get temp async
    $.ajax({
        url: "/temperature",
        method: "GET",
        headers: {
            "accept":"application/json;odata=verbose",
        },
        success: function(data){            
            $('#temperature').text(data);
        },
        error: function (err){
            alert (err);
        }

    });


    $('#humidity').text("boing");
    
})