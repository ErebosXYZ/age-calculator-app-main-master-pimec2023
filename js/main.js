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

/**Primera iteració. Problemes:
 * La funció de validació i la de càlcul haurien d'anar per separat. La de validació s'activa en dos tipus d'events, en l'input si aquest és incorrecte i en el click del botó si 1 o més paràmetres són falsos. Per tant, podríem fer que la funció input vagi per una banda i apareguin els missatges corresponents. Al camp year només apareix el must be in the past si escrius un any futur. Si escrius un any fora de rang per sota (99 o menys), el missatge es el text error de day i només apareix onclick, per tant, aquest s'hauria de posar a la funció onclick.
 * 
 * També hem d'assignar correctament els ids i query selectors de cada número perquè ara mateix apareixen a on hauria de posar years months i days i no en el color lila (creació ids years/months/days-result)
 */
// Variable true que utilitzarem per comparar-la amb els valors a validar


// Funció de validació:
function validateDate(event) {
    const field = event.target.id;
    const value = parseInt(event.target.value, 10);
    // Convertim els elements en números enters de base decimal
    let day = parseInt(document.querySelector("#day").value, 10);
    // Javascript comença comptant des de 0
    let month = parseInt(document.querySelector("#month").value, 10) - 1;
    let year = parseInt(document.querySelector("#year").value, 10);
    let today = new Date();
    // Validem si els números introduïts són vàlids. Si el dia és inferior a 1, superior a 31 o el primer dia (0) del seu mes +1. Això és perquè el dia 0 retorna l'últim dia del mes anterior(que és el correcte).
    let isValid = true;
    if (field === "day") {
        const maxDays = new Date(year, month + 1, 0).getDate(); // Last day of month
        if (isNaN(value) || value < 1 || value > maxDays) {
            isValid = false;
            if (errorElement) {
                errorElement.textContent = "Must be a valid day.";
                errorElement.style.opacity = "100";
            }
        }
    } else if (field === "month") {
        if (isNaN(value) || value < 1 || value > 12) {
            isValid = false;
            if (errorElement) {
                errorElement.textContent = "Must be a valid month.";
                errorElement.style.opacity = "100";
            }
        }
    } else if (field === "year") {
        if (isNaN(value) || value < 100 || value > today.getFullYear()) {
            isValid = false;
            if (errorElement) {
                errorElement.textContent = value > today.getFullYear() ? "Must be in the past." : "Must be a valid year.";
                errorElement.style.opacity = "100";
            }
        }
    }
    return isValid;
}



function dateSubtract() {
    let day = parseInt(document.querySelector("#day").value, 10);
    let month = parseInt(document.querySelector("#month").value, 10) - 1;
    let year = parseInt(document.querySelector("#year").value, 10);

    let inputDate = new Date(year, month, day);
    let today = new Date();
    let currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Assegurem que l'input sigui vàlid
    let isValid = validateDate("day", day) &&
        validateDate("month", month + 1) &&
        validateDate("year", year);
    // Si l'input és valid però l'any és inferior a 100 mostrem el missatge d'error
    if (isValid) {
        if (year < 100) {
            document.querySelector("#day-error").textContent = "Must be a valid date.";
            document.querySelector("#day-error").style.opacity = "100";
            isValid = false;
        }
        else if (inputDate > currentDate) {  // Comprovem que la data no sigui futura
            document.querySelector("#year-error").textContent = "Must be in the past";
            document.querySelector("#year-error").style.opacity = "100";
            isValid = false;
        }
        else if (isNaN(inputDate.getTime())) {  // Check for invalid dates
            document.querySelector("#day-error").textContent = "Must be a valid date.";
            document.querySelector("#day-error").style.opacity = "100";
            isValid = false;
        }
    }

    if (isValid) {
        let diffYears = today.getFullYear() - year;
        let diffMonths = today.getMonth() - month;
        let diffDays = today.getDate() - day;

        if (diffDays < 0) {
            diffMonths--;
            //  Si el dia és negatiu restem el mes per situar-nos a l'anterior i li afegim el nombre de dies del mes anterior a diffDays, és a dir el més en dies
            diffDays += new Date(today.getFullYear(), today.getMonth() - 1, 0).getDate();
        }
        if (diffMonths < 0) {
            diffYears--;
            diffMonths += 12;
        }

        document.querySelector("#years-result").textContent = diffYears;
        document.querySelector("#months-result").textContent = diffMonths;
        document.querySelector("#days-result").textContent = diffDays;
    } else {
        document.querySelector("#years-result").textContent = "--";
        document.querySelector("#months-result").textContent = "--";
        document.querySelector("#days-result").textContent = "--";
    }
}
document.querySelector("#btn").addEventListener("click", function () {
    if (validateDate()) {
        dateSubtract();
    }
});

const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const btn = document.querySelector("#btn");

if (dayInput) dayInput.addEventListener("input", validateField);
if (monthInput) monthInput.addEventListener("input", validateField);
if (yearInput) yearInput.addEventListener("input", validateField);
if (btn) btn.addEventListener("click", dateSubtract);
// Validem si la data és futura
// if (inputDate >= currentDate) {
//     isValid = false;
//     document.querySelector("#year-error").textContent = "Must be in the past"
// }
// function subtractDate() {

//     if (isValid) {
//         let day = parseInt(document.querySelector("#day").value, 10);
//         // Javascript comença comptant des de 0
//         let month = parseInt(document.querySelector("#month").value, 10) - 1;
//         let year = parseInt(document.querySelector("#year").value, 10);

//         let today = new Date();
//         let currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

//         let inputDate = new Date(year, month, day);

//         let diffDays = today.getFullYear() - year;
//         let diffMonths = today.getMonth() - year;
//         let diffYears = today.getDate() - day;

//         // Si el dia és negatiu restem el mes per situar-nos a l'anterior i li afegim el nombre de dies del mes anterior a diffDays, és a dir el més en dies
//         if (diffDays < 0) {
//             diffMonths--;
//             diffDays += new Date(today.getFullYear(), today.getMonth, today.getDate());
//         }
//         // Si els mesos són negatius restem un any i li afegim en mesos (mateix procediment que l'anterior)
//         if (diffMonths < 0) {
//             diffYears--;
//             diffMonths += 12;
//         }
//         // Mostrem el resultat als camps corresponents
//         document.querySelector("#days-result").textContent = diffDays;
//         document.querySelector("#months-result").textContent = diffMonths;
//         document.querySelector("#years-result").textContent = diffYears;
//     }
// }

// document.querySelector("#btn").addEventListener("click", subtractDate);
// document.querySelector("#day").addEventListener("input", validateDate);
// document.querySelector("#month").addEventListener("input", validateDate);
// document.querySelector("#year").addEventListener("input", validateDate);


// btn.addEventListener("click", function () {
//     let inputDate = Date(year, month, day);
//     let subtractDate = date - inputDate;
//     console.log(subtractDate);
// })


