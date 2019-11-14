$('document').ready(function () {

  var charData = [];
  var nowInTheater = ['']
  var comingSoonIMDB = ['tt4520988', 'tt3224458', 'tt8688634', 'tt9071322', 'tt10703826',
    'tt8106572', 'tt9358256', 'tt8946378', 'tt8722346']

  function getInformation(listaIMDBkodova) {
    listaIMDBkodova.forEach(function (IMDBcode) {
      fetch(`http://www.omdbapi.com/?apikey=b6e0271a&i=${IMDBcode}`)
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
              slidesToShow: 5,
              appendArrows: $('.row'),
              responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
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
    var lik = $('.charElement').prop('outerHTML');
    console.log(el);
    let newHTML = lik.replace('template-element', el.imdbID);
    newHTML = newHTML.replace('%char-modal-id%', el.imdbID);
    newHTML = newHTML.replace('%char-img-scr%', el.Poster);
    $('#filmovi').append(newHTML);
    for (let el of $('#portfolio-item-caption')) {
      const randBoja = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.9)`;
      el.style.backgroundcolor = randBoja;
    }
  }

  getInformation(comingSoonIMDB);
})
