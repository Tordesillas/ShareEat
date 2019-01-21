const people0 = require('../assets/images/people0.png');
const people1 = require('../assets/images/people1.png');
const people2 = require('../assets/images/people2.png');
const totoro = require('../assets/images/totoro.png');

export default {
    robot: require('../assets/images/robot-dev.png'),
    totoro: totoro,
    dinner: require('../assets/images/dinner.jpg'),
    people1: people1,
    people2: people2,
    location: require('../assets/images/location.png'),
    date: require('../assets/images/date.png'),
    price: require('../assets/images/price.png'),
    star: require('../assets/images/star.png'),
    empty_star: require('../assets/images/empty_star.png'),
    half_star: require('../assets/images/half_star.png'),
    plus_circled: require('../assets/images/plus_circled.png'),
    landscape: require('../assets/images/landscape.png'),
    cooking: require('../assets/images/cooking.jpg')
};

export function getImageFromName(name) {
    switch (name) {
        case "people0": return people0;
        case "people1": return people1;
        case "people2": return people2;
        default: totoro;
    }
}