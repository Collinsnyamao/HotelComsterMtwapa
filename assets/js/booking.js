const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const checkin = urlParams.get('checkin')
const checkout = urlParams.get('checkout')
const adults = urlParams.get('adults')
const children = urlParams.get('children')
document.getElementById('checkin').value = checkin;
document.getElementById('checkout').value = checkout;

document.getElementById('adults'+adults).selected = 'selected';
document.getElementById('children'+children).selected = 'selected';



var firebaseConfig = {
    apiKey: "AIzaSyC75xjGMriJU1viUZYgfgHYpthYybhAvmg",
    authDomain: "hotel-comster-mtwapa.firebaseapp.com",
    projectId: "hotel-comster-mtwapa",
    storageBucket: "hotel-comster-mtwapa.appspot.com",
    messagingSenderId: "643202371883",
    appId: "1:643202371883:web:5a63c7118adbd3b775f56e",
    measurementId: "G-LEP23JFDQJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();
var db = firebase.firestore();
//const bookingListRef = firebase.database.ref('bookings');

document.getElementById('form').onsubmit = function() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let checkinInput = document.getElementById('checkin').value;
    let checkoutInput = document.getElementById('checkout').value;
    let adults = document.getElementById('adults').value;
    let children = document.getElementById('children').value;
    let rooms = document.getElementById('room').value;
    let notes = document.getElementById('notes').value;
    let phone = document.getElementById('phone').value;

    name = filterXSS(name);
    phone = filterXSS(phone)
    email = filterXSS(email);
    notes = filterXSS(notes);
    console.log(name, email, children, checkoutInput, checkinInput, rooms, adults, notes);
    adults = +adults;
    children = +children;


    let data = {
        name: name,
        mail: email,
        children: children,
        checkout: checkoutInput,
        checkin: checkinInput,
        rooms: rooms,
        adults: adults,
        notes: notes,
        amount: 0,
        guests: adults + children,
        hotel: "Hotel Comster Mtwapa",
        phone
    }
    //console.log(bookingListRef);

    console.log("data", data );
    function writeBookingData(data) {
        /*database.ref('bookings/').push({
            name: data.name,
            mail: data.mail,
            children: data.children,
            checkout: data.checkout,
            checkin: data.checkin,
            rooms: data.rooms,
            adults: data.adults,
            notes: data.notes,
            amount: data.amount,
            guests: data.guests,
            hotel: data.hotel
        })
            .then(function (success) {

            console.log(success);
        }).catch(function (error) {
            console.log(error);
        });*/

        db.collection("bookings").add({
            name: data.name,
            mail: data.mail,
            children: data.children,
            checkout: data.checkout,
            checkin: data.checkin,
            rooms: data.rooms,
            adults: data.adults,
            notes: data.notes,
            amount: data.amount,
            guests: data.guests,
            hotel: data.hotel,
            status: false,
            phone: phone
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                document.getElementById('bookingSuccessAlert').hidden = false;
                document.getElementById('formDivMain').hidden = true;
                document.getElementById('formDiv').hidden = true;
                document.getElementById('spinner').hidden = false;
                var templateParams = {
                    to_name: data.name,
                    to_email: data.mail,
                    checkin: data.checkin,
                    checkout: data.checkout,
                    reply_to: 'reservations@hotelcomstermtwapa.co.ke'
                };

                emailjs.send('service_h38wuz1', 'template_ctekf5a', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    writeBookingData(data);

    /*$.post('http://localhost:3000/api/bookings', {
        name: name,
        mail: email,
        children: children,
        checkout: checkoutInput,
        checkin: checkinInput,
        rooms: rooms,
        adults: adults,
        notes: notes,
        amount: 0,
        guests: adults + children,
        hotel: "Hotel Comster Mtwapa"
    }, function (data, status) {
        console.log(data, status);
        document.getElementById('bookingSuccessAlert').hidden = false;
        document.getElementById('formDivMain').hidden = true;
    });

    document.getElementById('formDiv').hidden = true;
    document.getElementById('spinner').hidden = false;
*/
    return false;
}
