$('document').ready(function () {

    var IMDBids = ['tt1950186', 'tt6450804', 'tt7286456', 'tt1560220', 'tt7390646']

    async function makeArrayOfData(e) {
        let charData = [];
        for (let i = 0; i < e.length; i++) {
            let IMDBcode = e[i];
            let response = await fetch(`http://www.omdbapi.com/?apikey=b6e0271a&i=${IMDBcode}`, {});
            let json = await response.json();
            charData.push(json);
            console.log(json.Genre)
        };
        return charData;
    }

    function populate(filmovi, klasa) {
        let film = document.getElementById(klasa).childNodes[3].childNodes[1].childNodes[1];
        let newMatch = new RegExp(klasa, "gi")
        //console.log(film)
        filmovi.forEach((el) => {
            let genreMatch = el.Genre.match(newMatch);
            if (genreMatch) {
                let newHTML = film.cloneNode(true);
                newHTML.id = el.imdbID;
                newHTML.children[0].src = el.Poster;
                console.log()
                document.getElementById(klasa).childNodes[3].childNodes[1].appendChild(newHTML);
            }
        })
        console.log();
    }

    async function createCharacter(listaFilmova) {
        let filmoviJSON = await makeArrayOfData(listaFilmova);
        let genreList = document.getElementById('zanr').childNodes;
        for (let i = 1; i < genreList.length; i += 2) {
            let klasa = genreList[i].id;
            populate(filmoviJSON, klasa);
            $('#template-element').remove();
            console.log("ccc")
        }
    }

    createCharacter(IMDBids);
})
