const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const checkin = urlParams.get('checkin')
const checkout = urlParams.get('checkout')
document.getElementById('checkin').value = checkin;
document.getElementById('checkout').value = checkout;

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

function sendmail (data) {
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "mail.hotelcomstermtwapa.co.ke",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "reservations@hotelcomstermtwapa.co.ke", // generated ethereal user
                pass: "hotelcomstermtwapa@2021", // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Hotel Comster Mtwapa 🌴" <reservations@hotelcomstermtwapa.co.ke>', // sender address
            to: data.mail, // list of receivers
            subject: "Booking confirmation for " + data.name, // Subject line
            text: 'Your booking has been confirmed', // plain text body
            html: "<p>Your booking at " + data.hotel + " has been confirmed from " + data.checkin + " To " + data.checkout + " .</p> <br><p>Your reservation is for "+ data.adults +" adults and "+ data.children +" children. </p> <br> We hope you enjoy your stay!", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);
}

document.getElementById('form').onsubmit = function() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let checkinInput = document.getElementById('checkin').value;
    let checkoutInput = document.getElementById('checkout').value;
    let adults = document.getElementById('adults').value;
    let children = document.getElementById('children').value;
    let rooms = document.getElementById('room').value;
    let notes = document.getElementById('notes').value;

    name = filterXSS(name);
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
        hotel: "Hotel Comster Mtwapa"
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
            hotel: data.hotel
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                document.getElementById('bookingSuccessAlert').hidden = false;
                document.getElementById('formDivMain').hidden = true;
                document.getElementById('formDiv').hidden = true;
                document.getElementById('spinner').hidden = false;
                sendmail(data)
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
