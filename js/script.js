let navbar = $(".navbar")

setTimeout(function(){
    $(navbar).css({
        transition: "all calc(var(--transition-speed) * 2) ease-in-out",
        transform: "translateY(0)",
        opacity: "1"
    })
}, 1900)

let activeNav = $(navbar).find(".nav-link.selected")
var rectNav = $(activeNav)[0].getBoundingClientRect()
$(".main-nav span").css({
    left: (rectNav.left - 75)
})

$(window).on("resize", function(){
    rectNav = ''

    var rectNav = $(activeNav)[0].getBoundingClientRect()
    $(".main-nav span").css({
        left: (rectNav.left - 75)
    })
})