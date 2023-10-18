
function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}

function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match) => (map[match]));
}



function sanitizeData(data) {
    for (let key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
            if (typeof data[key] === "object" && Array.isArray(data[key])) {
                data[key].forEach((item) => sanitizeData(item)
                );
            } else if (typeof data[key] === "object") {
                sanitizeData(data[key]);
            } else if (key === "user_name" && containsSpecialChars(data[key])) {

                return {
                    status: false,
                    message: "Special character found in username"
                }
            } else if (
                key === "user_email" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data[key].toLowerCase()))
            ) 
            {
                return {
                    status: false,
                    message: "Enter valid email"
                }
            }
            else data[key] = sanitize(data[key]);
        }
    }
    return {
        status: true,
        message: data
    }
}


function sanitizeUserPrefs(data) {
    for (let key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
            if (typeof data[key] === "object" && Array.isArray(data[key])) {
                data[key].forEach((item) => sanitizeUserPrefs(item)
                );
            } else if (typeof data[key] === "object") {
                sanitizeUserPrefs(data[key]);
            } else if ((key === "news_preferences") && containsSpecialChars(data[key])) {
                return {
                    status: false,
                    message: `${key} cannot include special character`
                }
            } else data[key] = sanitize(data[key]);
        }
    }
    return {
        status: true,
        message: data
    }
}



module.exports = { sanitizeData, sanitizeUserPrefs };
