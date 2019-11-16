$('document').ready(function () {

    var charData = [];
    var nowInTheater = ['']
    var hororIMDB = ['tt10039344', 'tt1560220', 'tt1620981']
  
    function getInformation(listaIMDBkodova) {
      listaIMDBkodova.forEach(function (IMDBcode) {
        fetch(`http://www.omdbapi.com/?apikey=b6e0271a&i=${IMDBcode}`)
          .then((resp) => resp.json())
          .then(function (el) {
            charData.push(el);
            createCharacter(el);
            console.log(el);
          })
          .then(function (el) {
            if (charData.length === hororIMDB.length) {
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
      if (charData.length === hororIMDB.length) {
        document.getElementById('template-element').children[0].src = el.Poster;
        document.getElementById('template-element').id = el.imdbID;
      }
      else if (charData.length <= (hororIMDB.length - 1)) {
        newHTML = newHTML.replace('template-element', el.imdbID);
        newHTML = newHTML.replace('%char-img-scr%', el.Poster);
        $('#filmovi').append(newHTML);
      }
      console.log(charData.length === hororIMDB.length)
      for (let el of $('#portfolio-item-caption')) {
        const randBoja = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.9)`;
        el.style.backgroundcolor = randBoja;
      }
    }
  
    getInformation(hororIMDB);
  })
  