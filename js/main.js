// Buena suerte
/**Hi ha tres camps que s'han d'omplir amb un número. El primer, day ha de contenir un número de l'1 al 31 (excepte els mesos de febrer(de l'1 al 28 o 29 els anys de traspàs), el segon, month de l'1 al 12 si el year a partir del 100 fins a 2025).
 * Si el número introduït a algun o més dels inputs no és vàlid, s'ha de mostrar el missatge d'error al camp corresponent (.input.blok__text-error). El número no és vàlid quan no està en algun dels rangs escollits o si és una data futura, és a dir a partir del dia actual.
 * 
 * Hem d'utilitzar l'objecte Date creant-lo amb let date = Date.now() i comptar quants dies, mesos i anys han passat des de llavors.
 * 
 * Quan es faci click al botó amb la fletxa, el programa calcula quants anys fa, és a dir resta el número introduït per l'usuari de la data actual. Després a cadascun dels camps de sota es mostra el número corresponent a la data.
 * 
 * Per tant necessitem guardar els valors que introdueix l'usuari en variables i aquestes transformar-les en una data. És a dir, dins de l'objecte Date, s'han d'introduir els números de cada input. Podríem convertir-los en variables i crear el date dins de la funció onclick per poder operar amb ells.
 * 
 * Date(year, month, date, hours, minutes, seconds, ms). Només necessitem els 3 primers paràmetres.
 * 
 * 
 */

function validateDate() {
    let day = document.querySelector("#day").value;
    let month = document.querySelector("#month").value;
    let year = document.querySelector("#year").value;

    let today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    console.log(date);

    let inputDate = new Date(year, month, day);

    // Validem si els números introduïts són vàlids. Si el dia és inferior a 1, superior a 31 o el primer dia (0) del seu mes +1. Això és perquè el dia 0 retorna l'últim dia del mes anterior(que és el correcte).
    if (day < 1 || day > 31 || day > new Date(year, month + 1, 0).getDate()) {
        document.querySelector("#day-error").textContent = "Must be a valid day.";
    } else {
        document.querySelector("#day-error").textContent = "";
    } if (month < 1 || month > 11) {
        document.querySelector("#month-error").textContent = "Must be a valid month.";
    } else {
        document.querySelector("#month-error").textContent = "";
    } if (year < 100 || year > today.getFullYear()) {
        document.querySelector("#year-error").textContent = "Must be in the past.";
    } else {
        document.querySelector("#year-error").textContent = "";
    }
}





// btn.addEventListener("click", function () {
//     let inputDate = Date(year, month, day);
//     let subtractDate = date - inputDate;
//     console.log(subtractDate);
// })





// let date = new Date(2017, 4, 22);

// let randomDate = new Date(2017, 2, 19);

// console.log(date);
// console.log(randomDate);

// let subtractedDate = date - randomDate;

// // subtractedDate = Date(subtractedDate.getYear());
// console.log(subtractedDate);
// let a = 1222;
// let b = 2;
// let c = 3;
// let variableDate = new Date(a, b, c);
// console.log(variableDate);

// function dateDifference(date1, date2) {
//     let differenceMs = Math.abs(date2 - date1);

//     let days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
//     let years = Math.floor(days / 365);
//     let months = Math.floor((days % 365) / 30);
//     return {years, months, days};
// }

// console.log(dateDifference(date, randomDate));