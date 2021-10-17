$(function(){
    let img = $(".img-box")
    img.on("mousemove", function(e){

        var x = e.clientX - $(this).offset().left + $(window).scrollLeft()
        var y = e.clientY - $(this).offset().top + $(window).scrollTop();

        var rY = map(x, 0, $(this).width(), -17, 17)
        var rX = map(y, 0, $(this).height(), -17, 17)

        $(this).children("div").css("transform", "rotateY(" + rY + "deg)" + " " + "rotateX(" + -rX + "deg)")
    })

    img.on("mouseenter", function(){
        $(this).children("div").css({
            transition: "all calc(var(--transition-speed) * 1)"
        })
    })
    img.on("mouseleave", function(){
        $(this).children("div").css({
            transition: "all var(--transition-speed)"
        })
        $(this).children("div").css("transform", "rotateY(" + 0 + "deg)" + " " + "rotateX(" + 0 + "deg)")
    })

    function map(x, in_max, in_min, out_min, out_max){
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    }


    let expdBtns = $("div").filter(".expand-btn")
    expdBtns.click(function(){

        /*Mostrar overlay*/
        var overlay = document.createElement("div")
        $(overlay).addClass("img-overlay")
        $("body").append(overlay)
        $(overlay).css("opacity")
        $(overlay).css({
            transition: "opacity var(--transition-speed) ease-in-out",
            opacity: 1
        })

        /*Criar img correspondente*/
        var overlayImg = document.createElement("img")
        var targetImg = $(this).prev()
        var src = $(targetImg).attr("src")
        $(overlayImg).attr("src", src)

        /*Clonar a img para a tomada de um referencial fullscreen*/
        var clone = $(overlayImg).clone().appendTo($(overlay))
        $(clone).css({
            width: "auto",
            'max-width': "calc(100% - 4rem)",
            'max-height': "calc(100% - 4rem)",
            visibility: "hidden"
        })
        $(overlay).append(overlayImg)

        /*Estado antes do zoom*/
        var rectBefore = $(targetImg)[0].getBoundingClientRect()
        $(overlayImg).css({
            top: rectBefore.top,
            left: rectBefore.left,
            width: rectBefore.width
        })

        /*Estado após o zoom*/
        clone.on("load", function(){
            var rectAfter = $(clone)[0].getBoundingClientRect()
            setTimeout(function(){
                $(overlayImg).css({
                    top: rectAfter.top,
                    left: rectAfter.left,
                    width: rectAfter.width,
                    'max-width': "calc(100% - 4rem)",
                    'max-height': "calc(100% - 4rem)",
                    opacity: 1,
                    'filter': "drop-shadow(0 0 32px rgba(0, 0, 0, 0.7))"
                })
            }, 300)
        })
        
        var closeBtn = document.createElement("div")
        var closeIcon = "<img src='../img/x.svg' alt=''>"
        $(closeBtn).addClass("close-btn")
        $(closeBtn).append(closeIcon)
        $(closeBtn).css("opacity")
        $(closeBtn).css({
            transition: "opacity var(--transition-speed) ease-in-out",
            opacity: 1
        })
        $(overlay).append(closeBtn)


        $(window).on("resize", function(){
            rectBefore = ''
            rectAfter = ''

            rectBefore = $(targetImg)[0].getBoundingClientRect()
            $(overlayImg).css({
                top: rectBefore.top,
                left: rectBefore.left,
                width: rectBefore.width
            })

            rectAfter = $(clone)[0].getBoundingClientRect()
            setTimeout(function(){
                $(overlayImg).css({
                    top: rectAfter.top,
                    left: rectAfter.left,
                    width: rectAfter.width,
                    'max-width': "calc(100% - 4rem)",
                    'max-height': "calc(100% - 4rem)",
                    opacity: 1,
                    'filter': "drop-shadow(0 0 32px rgba(0, 0, 0, 0.7))"
                })
            }, 300)
        })
    })

    $(document).on("click", ".close-btn", ".img-overlay", function(){

        $(".img-overlay").children("img:nth-child(2)").css({
            transition: "all calc(var(--transition-speed) / 2)",
            transform: "scale(0.7)",
            opacity: 0
        })
        setTimeout(function(){
            $(".img-overlay").css({
                opacity: 0
            })
            setTimeout(function(){
                $(".img-overlay").css({
                    display: "none"
                })
                $(".img-overlay").remove()
            }, 200)
        }, 200)
        
    })
    $(document).on("click", ".img-overlay", function(e){
        if (e.target == this) {

            $(".img-overlay").children("img:nth-child(2)").css({
                transition: "all calc(var(--transition-speed) / 2)",
                transform: "scale(0.7)",
                opacity: 0
            })
            setTimeout(function(){
                $(".img-overlay").css({
                    opacity: 0
                })
                setTimeout(function(){
                    $(".img-overlay").css({
                        display: "none"
                    })
                    $(".img-overlay").remove()
                }, 200)
            }, 200)
        }
    })
})