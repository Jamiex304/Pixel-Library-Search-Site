//Movie
$(document).ready(function(){
  $("#MSearchButton").click(function(){
    $("#tabs").hide();
  });
});
$(document).ready(function(){
  $("#MSearchButton").click(function(){
    $("#two").hide();
  });
});
//TV
$(document).ready(function(){
  $("#TSearchButton").click(function(){
    $("#tabs").hide();
  });
});
$(document).ready(function(){
  $("#TSearchButton").click(function(){
    $("#three").hide();
  });
});
//Game
$(document).ready(function(){
  $("#GSearchButton").click(function(){
    $("#tabs").hide();
  });
});
$(document).ready(function(){
  $("#GSearchButton").click(function(){
    $("#four").hide();
  });
});
//Everything
$(document).ready(function(){
  $("#ESearchButton").click(function(){
    $("#tabs").hide();
  });
});
$(document).ready(function(){
  $("#ESearchButton").click(function(){
    $("#one").hide();
  });
});
//Dropdown menus javascript hide selected resutls. 
    $(document).ready(function() {
        $(".preferenceSelect").change(function() {
            // Get the selected value
            var selected = $("option:selected", $(this)).val();
            // Get the ID of this element
            var thisID = $(this).attr("id");
            // Reset so all values are showing:
            $(".preferenceSelect option").each(function() {
                $(this).show();
            });
            $(".preferenceSelect").each(function() {
                if ($(this).attr("id") != thisID) {
                    $("option[value='" + selected + "']", $(this)).attr("disabled", true);
                }
            });

        });
    });