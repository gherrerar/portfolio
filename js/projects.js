$(function(){
    let prevURL = document.referrer
    var path = window.location.pathname;
    var page = path.split("/").pop();

    //Imagens
    let folder = '../img/'
    let projects = ["Ciências da Natureza/Heredograma de Genealogia Familiar - Atividade 21_09-1.jpg", "Ciências da Natureza/Luz e Visão - Astigmatismo-1.jpg", "Ciências da Natureza/Luz e Visão - Astigmatismo-2.jpg",
                    "Ciências Humanas/Bandeira do Brasil Pós Independência - Aula 10_08-1.jpg", "Ciências Humanas/Interface do Aplicativo - Esgota Mais Floripa-1.jpg",
                    "Ensino Técnico/Capa A4 - Number's Adventure.jpg"]

    let slider = $(".prjt-slider")
    let singleImg = random(projects, projects.length)
    for (let i = 0; i < projects.length; i++) {
        let prjtPreview = document.createElement("article")
        $(prjtPreview).addClass("prjt-view")
        $(slider).append(prjtPreview)

        let prjtImg = document.createElement("img")
        $(prjtImg).attr("src", (folder + singleImg[i][0]))
        $(prjtPreview).append(prjtImg)
        $(prjtImg).css({
            opacity: 0
        })

        $(prjtImg).on("load", function() {
            $(this).css({
                opacity: 1
            })
        })
    }

    //Seleção randômica das imagens
    function random(array, count) {
        var newArr = []
        var copy = array.slice(0)
        var i = 0;

        while (i < count) {
            var index = Math.floor(Math.random() * copy.length)
            var ref = copy.splice(index, 1)
            newArr.push(ref)
            i++;
        }
        return newArr;
    }
    
    let prjtPreview = $(".prjt-view")
    let parent = $(prjtPreview).parent()


    //Física dos previews
    var currentScroll = $(window).scrollTop()
    function update() {
        const newScroll = $(window).scrollTop()
	    const diff = newScroll - currentScroll
	    const speed = Math.abs(diff) * 0.3
        
	    // $(parent).css("transform", `skewX(${ speed }deg)`)
        $(parent).css("filter", `blur(${ speed }px)`)

	    currentScroll = newScroll;
	    requestAnimationFrame(update);
    }

    //Movimento do slider com o scroll
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop(),
            docH = $(document).height(),
            windowH = $(this).height()

        var scrollPercent = (scrollTop / (docH - windowH))

        var translate = (scrollPercent * ($(document).width()/2 - parent.width()))
        $(parent).css({
            'transform': `translate3d(${translate/* + 30*/}px, 0, 0)`
        })
    })
    update()

    
    //Clique nas células das áreas
    let subjLinks = $(".subj-img > a")
    subjLinks.click(function(e){
        e.preventDefault()
        var href = $(this).attr("href")
        console.log(href)

        $("body").append("<div class='gooey-container'><div class='level-wave'></div></div>")
        let gooey = $(".gooey-container")
        let wave = $(gooey).find(".level-wave")
        $(wave).css('background-color', $(this).attr("data-color"))

        for (let i = 1; i <= 8; i++) {
            var bubble = document.createElement("span")
            $(bubble).addClass("bubble")
            $(bubble).css({
                'background-color': $(this).attr("data-color"),
                '--i': i
            })
            $(bubble).appendTo(wave)
        }

        setTimeout(()=> {
            window.location.replace(href)
        }, 1250)
    })

    var casesURL = ["ciencias-natureza", "ciencias-humanas", "linguagens", "matematica", "tecnico"]
    var str = page.split(".")
    for (let i = 0; i < casesURL.length; i++)
    if (prevURL.endsWith("projetos.html") || str[0] == casesURL[i]) {
        //Devem ser satisfeitas ambas as condições (&&)

        $("body").append("<div class='gooey-container'><div class='level-wave reverse'></div></div>")
        let gooey = $(".gooey-container")
        let wave = $(gooey).find(".level-wave")
        $(wave).css('background-color', $("section.hero h1").attr("data-color"))

        for (let i = 1; i <= 8; i++) {
            var bubble = document.createElement("span")
            $(bubble).addClass("bubble")
            $(bubble).css({
                'background-color': $("section.hero h1").attr("data-color"),
                '--i': i
            })
            $(bubble).appendTo(wave)
        }
        setTimeout(()=> {
            $(gooey).css('display', 'none')
            $(gooey).remove()
        }, 1200)
    }


    var txt = $("section.hero h1")
})