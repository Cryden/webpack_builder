function menu_display() {
    var display_menu = true;
    console.log('menu display init');
    $('.open_btn, .close_btn, .overlay').click(function() {
        if (display_menu === false) {
            $("header").animate({
                left: "-=320",
            }, 500);
            $(".overlay").css("display", "none");
            $(".open_btn").show();
            $(".close_btn").css("display", "none");
            display_menu = true;
        } else {
            $("header").animate({
                left: "+=320",
            }, 500);
            $(".overlay").css("display", "block");
            $(".close_btn").show();
            $(".open_btn").css("display", "none");
            display_menu = false;
        }
    });

    $('.shadow').click(function() {
        console.log('click');
        if (display_menu === false) {
            $("header").animate({
                left: "-=320",
            }, 500);
            $(".shadow").css("display", "none");
            $(".open_btn").show(500);
            $(".close_btn").css("display", "none");
            display_menu = true;
    }});
}

$(document).ready(function() {
    menu_display();
});
