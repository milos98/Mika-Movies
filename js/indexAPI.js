$('document').ready(function () {

  var charData = [];
  var nowInTheater = ['']
  var comingSoonIMDB = ['tt4520988', 'tt3224458', 'tt8688634', 'tt9071322', 'tt10703826',
    'tt8106572', 'tt9358256', 'tt8946378', 'tt8722346']

  function getInformation(listaIMDBkodova) {
    listaIMDBkodova.forEach(function (IMDBcode) {
      fetch(`https://www.omdbapi.com/?apikey=b6e0271a&i=${IMDBcode}`)
        .then((resp) => resp.json())
        .then(function (el) {
          charData.push(el);
          createCharacter(el);
        })
        .then(function (el) {
          if (charData.length === comingSoonIMDB.length) {
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
    if (charData.length === comingSoonIMDB.length) {
      document.getElementById('template-element').children[0].src = el.Poster;
      document.getElementById('template-element').id = el.imdbID;
    }
    else if (charData.length <= (comingSoonIMDB.length - 1)) {
      newHTML = newHTML.replace('template-element', el.imdbID);
      newHTML = newHTML.replace('%char-img-scr%', el.Poster);
      $('#filmovi').append(newHTML);
    }
  }

  getInformation(comingSoonIMDB);  
})
