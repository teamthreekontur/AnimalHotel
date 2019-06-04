import user1 from "../images/user1.jpg";
import user2 from "../images/user2.jpg";
import user3 from "../images/user3.jpg";

export {
    addPlace,
    deletePlace,
    editPlace,
    getCatalog,
    getPricedPlaces,
    getFilterredPlaces,
    register,
    auth,
    setCookie,
    getCookie,
    deleteCookie,
    isLoggedIn
};
const path = 'https://animalhotelapi.azurewebsites.net';

function getCatalog(id = '') {
    return fetch(`${path}/api/Places/${id}`)
        .then(response => {
            if (Math.round(response.status / 100) !== 2)
                throw new Error('');
            return (response.json());
        })
        .catch(error => {
            console.log(error);
        });
}

function register(login, password, confirmPassword) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({Login: login, Password: password, ConfirmPassword: confirmPassword})
    };
    return fetch(`${path}/api/Register`, options)
        .then(response => {
            if (Math.round(response.status / 100) !== 2)
                throw new Error(response.status.toString());
            return (response.json());
        })
    // return new Promise((resolve, reject) => {
    //     setTimeout(resolve([1]), 3000);
    // })
}

function auth(login, password) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"Login": login, "Password": password})
    };
    return fetch(`${path}/api/Auth`, options)
        .then(response => {
            if (Math.round(response.status / 100) !== 2)
                throw new Error(response.status.toString());
            return (response.json());
        })
}

function getFilterredPlaces(param) {
    return fetch(`${path}/api/Places/?placeFilterInfo.ownerId=${param}`)
        .then(response => {
            if (Math.round(response.status / 100) !== 2)
                throw new Error('');
            return (response.json());
        })
        .catch(error => {
            console.log(error);
        });
}

function getPricedPlaces(min, max) {
    return fetch(`${path}/api/Places/?placeFilterInfo.priceMin=${min}&placeFilterInfo.priceMax=${max}`)
        .then(response => {
            if (Math.round(response.status / 100) !== 2)
                throw new Error('');
            return (response.json());
        })
        .catch(error => {
            console.log(error);
        });
}

function addPlace(name, address, description, price, contacts, sessionId) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Name": name,
            "Address": address,
            "Description": description,
            "Price": price,
            "Contacts": contacts,
            "SessionId": sessionId
        })
    };
    return fetch(`${path}/api/Places`, options)
        .then(response => {
            if (Math.round(response.status / 100) !== 2)
                throw new Error('');
            return (response.json());
        })
}

function deletePlace(id, sessionId) {
    let options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sessionId)
    };
    return fetch(`${path}/api/Places/${id}`, options)
        .then(response => {
            if (Math.round(response.status / 100) !== 2)
                throw new Error('');
            return (response.json());
        })
}

function editPlace(id, name, address, description, price, contacts, sessionId) {
    let options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Name": name,
            "Address": address,
            "Description": description,
            "Price": price,
            "Contacts": contacts,
            "SessionId": sessionId
        })
    };
    return fetch(`${path}/api/Places/${id}`, options)
        .then(response => {
            if (Math.round(response.status / 100) !== 2)
                throw new Error('');
            return (response.json());
        })
}


function setCookie(name, value, options) {
    options = options || {};

    let expires = options.expires;

    if (typeof expires == "number" && expires) {
        let d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + "=" + value;

    for (let propName in options) {
        updatedCookie += "; " + propName;
        let propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}

function isLoggedIn() {
    return getCookie("SessionId") ? true : false;
}


// function getCatalog() {
//     return new Promise((resolve, reject) => {
//         const data = [
//             {
//                 logo: user1,
//                 cost: 300,
//                 name: 'Иван Иванов',
//                 address: 'Центральный',
//                 description: 'С детства неравнодушна к животным , есть опыт\n' +
//                     '                                            в передержке , своих питомцев нет, рядом с домом находится парк , квартира\n' +
//                     '                                            2-х комнатная , 60кв.м , с радост ...'
//             },
//             {
//                 logo: user2,
//                 cost: 250,
//                 name: 'Илья Сидоров',
//                 address: 'Ленинский',
//                 description: 'Уважаемые хозяева! Имею очень большой опыт ухода за животными: собаки (от мелких до крупных), кошки разных пород, хорьки, грызуны, птицы. Очень люблю животных и люблю ухаживать за ними, нахожу с ними быстро общий язык. Есть своя машина. Есть опыт в ветеринарии. '
//             },
//             {
//                 logo: user3,
//                 cost: 370,
//                 name: 'Мария И',
//                 address: 'Калининский',
//                 description: 'С удовольствием поухаживаем за Вашими питомцами на время отпуска.Содержание в благоустроенной квартире.По питанию и уходу будем соблюдать все рекомендации.Есть опыт ставить уколы и давать таблетки и лекарства.'
//             }
//         ];
//
//         setTimeout(resolve(data),3000);
//     })
// }