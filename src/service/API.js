import user1 from "../images/user1.jpg";
import user2 from "../images/user2.jpg";
import user3 from "../images/user3.jpg";

export {getCatalog};
const path = 'https://animalhotelapi.azurewebsites.net';

function getCatalog(id = '') {
    return fetch(`/api/Places/${id}`)
        .then(response => {
            return (response.json());
        })
        .catch(error => {
            console.log(error);
        });
}

// function register() {
//     let options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//     };
//     return fetch(`${path}/api/Register`, options)
//         .then(response => {
//             return (response.json());
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }

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