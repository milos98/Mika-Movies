function validateForm() {
    let provera = 0;
    let firstName = document.forms["newsletter"]["firstName"].value;
    let lastName = document.forms["newsletter"]["lastName"].value;
    let email = document.forms["newsletter"]["email"].value;
    let phone = document.forms["newsletter"]["phone"].value;
    let radio = document.forms["newsletter"]["period"];
    let cb = document.forms["newsletter"]["GDPR"].checked;
    radio.forEach(element => {if(element.checked)provera++;});
     if (firstName == "" || lastName == "" || email == "" || phone == "") {
        alert("Sva polja moraju biti popunjena");
        return false;
    }
    else if(provera<1){
        alert("Morate izabrati period obaveštavanja");
        return false;
    }
    else if(!cb){
        alert("Morate se složiti da se koriste vaši podaci u reklamne svrhe");
        return false;
    }
}