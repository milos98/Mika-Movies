$('document').ready(function () {

    var charData = [];
    var nowInTheater = ['']
    var actionIMDB = ['tt1950186', 'tt6450804', 'tt7286456', 'tt1560220', 'tt7390646']

    function getInformation(listaIMDBkodova) {
        listaIMDBkodova.forEach(function (IMDBcode) {
            fetch(`http://www.omdbapi.com/?apikey=b6e0271a&i=${IMDBcode}`)
                .then((resp) => resp.json())
                .then(function (el) {
                    charData.push(el);
                    createCharacter(el);
                })
                .then(function (el) {
                    if (charData.length === actionIMDB.length) {
                        $('.row').slick({
                            centerMode: true,
                            dots: true,
                            centerPadding: '60px',
                            slidesToShow: 3,
                            swipeToSlide: true,
                            appendArrows: $('.row'),
                            mobileFirst: true,
                            variableWidth: true,
                            responsive: [
                                {
                                    breakpoint: 768,
                                    settings: {
                                        arrows: true,
                                        centerMode: true,
                                        centerPadding: '40px',
                                        swipeToSlide: true,
                                        variableWidth: true,
                                        slidesToShow: 3
                                    }
                                },
                                {
                                    breakpoint: 480,
                                    settings: {
                                        arrows: false,
                                        centerMode: true,
                                        centerPadding: '40px',
                                        swipeToSlide: true,
                                        variableWidth: true,
                                        slidesToShow: 1
                                    }
                                }
                            ]
                        })
                    }
                })
        });
    }

    function createCharacter(el) {
        var film = $('.charElement').prop('outerHTML');
        let newHTML = film.replace('template-element', el.imdbID);
        if (charData.length === (actionIMDB.length - 1)) {
            document.getElementById('template-element').children[0].src = el.Poster;
            document.getElementById('template-element').id = el.imdbID;
        }
        else if (charData.length <= (actionIMDB.length - 1)) {
            newHTML = newHTML.replace('template-element', el.imdbID);
            newHTML = newHTML.replace('%char-img-scr%', el.Poster);
            $('#akcija').append(newHTML);
        }
        console.log(charData.length === actionIMDB.length)
        for (let el of $('#portfolio-item-caption')) {
            const randBoja = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.9)`;
            el.style.backgroundcolor = randBoja;
        }
    }

    getInformation(actionIMDB);
})