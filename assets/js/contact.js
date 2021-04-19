document.getElementById('contact_form').onsubmit = function() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    name = filterXSS(name);
    email = filterXSS(email);
    message = filterXSS(message);
    console.log(name, email, message);

    return false;
}
