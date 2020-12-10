function beginChar(text) {   
    return (/[a-zA-Z]/).test(text.charAt(0));
}

function threeAlpha(text) {
    var count = 0;
    var i;
    for (i = 0; i < text.length; i++) {
        if ((/[a-zA-Z]/).test(text.charAt(i)) == true) {
            count++;
        }
    }
    if (count >= 3) {
        return true;
    }
    else {
        return false;
    }
}

function charLength(text) {
    if (text.length >= 8) {
        return true;
    }
    else {
        return false;
    }
}

function containsUpper(text) {
    return (/[A-Z]/).test(text);
}

function containsNumber(text) {
    return (/\d/).test(text);
}

function containsSpecial(text) {
    return (/[/*-+!@#$^&*]/).test(text);
} 

function passwordMatch(pass, cpass) {
    if (pass == cpass) {
        return true;
    }
    else {
        return false;
    }
}

function errorMessage() {
    var validated = true;
    var error = document.getElementById("regerror");
    var username = document.registerform.uname.value;
    var password = document.registerform.pword.value;
    var cpassword = document.registerform.cpword.value;

    if (beginChar(username) != true) {
        error.innerHTML = "*Username must begin with a letter";
        validated = false;
    }
    else if(threeAlpha(username) != true) {
        error.innerHTML = "*Username must contain at least 3 letters";
        validated = false;
    }
    else if (charLength(username) != true) {
        error.innerHTML = "*Username must contain at least 8 characters";
        validated = false;
    }
    else if (containsUpper(username) != true) {
        error.innerHTML = "*Username must contain at least 1 Uppercase";
        validated = false;
    }
    else if (containsNumber(username) != true) {
        error.innerHTML = "*Username must contain at least 1 Number";
        validated = false;
    }
    else if (containsSpecial(username) != true) {
        error.innerHTML = "*Username must contain at least 1 Special character (/*-+!@#$^&*)";
        validated = false;
    }
    else if (passwordMatch(password, cpassword) != true) {
        error.innerHTML = "*Passwords do not match";
        validated = false;
    }

    else {
        error.innerHTML = "";
    }

    return validated;
}

