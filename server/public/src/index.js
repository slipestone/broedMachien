$(document).ready( () =>{

    //get temp async
    $.ajax({
        url: "/temperature",
        method: "GET",
        headers: {
            "accept":"application/json;odata=verbose",
        },
        success: function(data){            
            $('#temperature').text(data.value);
        },
        error: function (err){
            alert (err);
        }

    });

    $.ajax({
        url: "/humidity",
        method: "GET",
        headers: {
            "accept":"application/json;odata=verbose",
        },
        success: function(data){            
            $('#humidity').text(data.value);
        },
        error: function (err){
            alert (err);
        }

    });

    
})