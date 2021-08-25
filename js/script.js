$(function(){
    let navbar = $(".navbar")
    let pageAll = $(navbar).nextAll(":not(script)")

    //Index como Link anterior ao atual
    let prevURL = document.referrer
    var path = window.location.pathname;
    var page = path.split("/").pop();
    console.log(page)
    console.log(prevURL)
    if (prevURL.endsWith("index.html") || page == "index.html") {
        setTimeout(function(){
            $(navbar).css({
                transition: "all calc(var(--transition-speed) * 2) ease-in-out",
                transform: "translateY(0)",
                opacity: "1"
            })
        }, 1900)
        setTimeout(()=> {
            $(pageAll).css({
                transition: "all var(--transition-speed) ease-in-out",
                transform: "translateX(0)",
                opacity: "1"
            })
        }, 200)
    }
    //Link anterior ao atual diferente do Index
    else {
        $(navbar).css({
            transform: "translateY(0)",
            opacity: "1"
        })
        $(navbar).prev().find("#logo-img > path").css({
            animation: "none",
            fill: "rgba(0, 0, 0, 1)",
            'stroke-dashoffset': "0"
        })
        setTimeout(()=> {
            $(pageAll).css({
                transition: "all var(--transition-speed) ease-in-out",
                transform: "translateX(0)",
                opacity: "1"
            })
        }, 200)
    }

    //Clique nos itens da Navbar
    let navs = $(navbar).find(".nav-link")
    navs.click(function(e){
        e.preventDefault()
        var href = $(this).attr("href")
        var casesURL = ["index", "projetos", "sobre"]
        let str = ''

        var current = $(navs).filter(".selected")
        current.removeClass("selected")
        $(this).addClass("selected pop")

        var rectNav = $(this)[0].getBoundingClientRect()
        $(".main-nav span").css({
            left: (rectNav.left - 75)
        })

        if ($(navs).parents(".navbar").hasClass("home") == false) {
            var navText = $(this).attr("data-text")
            document.styleSheets[0].deleteRule(0)
            document.styleSheets[0].insertRule('.main-nav span::after { content: "' + navText + '" !important }', 0)
        }


        for (let i = 0; i < casesURL.length; i++) {

            if (href.indexOf(casesURL[i]) > -1) {
                $(pageAll).css({
                    transform: "translateX(-8rem)",
                    opacity: "0"
                })
                setTimeout(()=> {
                    window.location.replace(href)
                }, 500)
            }
        }
        
    })

    $(window).on("resize", function(){
        var current = $(navs).filter(".selected")
        var rectNav = ''

        rectNav = $(current)[0].getBoundingClientRect()
        $(".main-nav span").css({
            left: (rectNav.left - 75)
        })
    })
    $(window).on("load", function(){
        var current = $(navs).filter(".selected")
        var rectNav = ''

        rectNav = $(current)[0].getBoundingClientRect()
        $(".main-nav span").css({
            left: (rectNav.left - 75)
        })

        if ($(navs).parents(".navbar").hasClass("home") == false) {
            var navText = $(current).attr("data-text")
            document.styleSheets[0].deleteRule(0)
            document.styleSheets[0].insertRule('.main-nav span::after { content: "' + navText + '" !important }', 0)
        }
    })
})