$('document').ready(function () {

    var IMDBids = ['tt4520988', 'tt3224458', 'tt8688634', 'tt9071322', 'tt10703826',
    'tt8106572', 'tt9358256', 'tt8946378', 'tt8722346',
    'tt6924650', 'tt5033998', 'tt9134216', 'tt8623904', 'tt5606664',
    'tt5563334', 'tt7286456', 'tt4777008', 'tt4648786', 'tt7984766']

    async function makeArrayOfData(e) {
        let charData = [];
        for (let i = 0; i < e.length; i++) {
            let IMDBcode = e[i];
            let response = await fetch(`https://www.omdbapi.com/?apikey=b6e0271a&i=${IMDBcode}`, {});
            let json = await response.json();
            charData.push(json);
        };
        return charData;
    }

    function populate(filmovi, klasa) {
        let film = document.getElementById(klasa).childNodes[3].childNodes[1].childNodes[1];
        let newMatch = new RegExp(klasa, "gi")
        filmovi.forEach((el) => {
            let genreMatch = el.Genre.match(newMatch);
            if (genreMatch) {
                let newHTML = film.cloneNode(true);
                newHTML.id = el.imdbID;
                newHTML.children[0].src = el.Poster;
                document.getElementById(klasa).childNodes[3].childNodes[1].appendChild(newHTML);
            }
        })
    }

    async function createCharacter(listaFilmova) {
        let filmoviJSON = await makeArrayOfData(listaFilmova);
        let genreList = document.getElementById('zanr').childNodes;
        for (let i = 1; i < genreList.length; i += 2) {
            let klasa = genreList[i].id;
            populate(filmoviJSON, klasa);
            $('#template-element').remove();
        }
    }

    createCharacter(IMDBids);
})
