$(document).ready(function() {
    
    $("#scegli-vittima").change(function () {
        var str = "";
        $("#scegli-vittima option:selected").each(function() {
            str = $(this).val();
        });
        if(str == '') {
            $(".foto-vittima h1").text("Seleziona lo schifoso da insultare!");
            $(".foto-vittima img").attr("style","display:none");
        } else {
            $(".foto-vittima h1").text("Insulta " + str + "!");
            $(".foto-vittima img").attr({
                src:"images/characters/"+str+".jpg",
                style: "display:block"
            });
        }
    });
    
    $(".button-insulto").click(function(){
        var s = $("#scegli-vittima option:selected").val();
        if(s != '') {
            var insulto = $(this).attr("name");
        
            var db = new Firebase("https://resplendent-inferno-410.firebaseio.com/personaggio/" + s);
            db.transaction(function (current_value) {
                return (current_value || 0) + 1;
            });

        }
        else {
            alert("Ma che fai? Ti insulti da solo? Seleziona un cretino da insultare!");
        }
    });


    var scoresRef = new Firebase("https://resplendent-inferno-410.firebaseio.com/personaggio");
        scoresRef.orderByValue().on("value", function(snapshot) {
            var arr = [];
            snapshot.forEach(function(data) {
                arr.push(data.val());
                arr.push(data.key());
            });
            arr = arr.reverse();
            var l = arr.length;
            var rankBody = $(".rank-body");
            var j= 1;
            for(var i = 0; i < l; i = i+2) {
                rankBody.append('<tr><th>'+j+'</th><th>' + arr[i] + '</th><th>' + arr[i+1] + '</th></tr>');
                j++;
            }
        });

});