export function isoDateToUser(isoDate) {
    const date = new Date(isoDate);
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    let month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;
    return date.getDate() + "/" + month + "/" + date.getFullYear() + " à " + date.getHours() + "h" + minutes;
}

export function priceToUser(price) {
    if (price <= 0) {
        return "Gratuit";
    }
    const newPrice = parseFloat(Math.round(price * 100) / 100).toFixed(2);
    return (newPrice+"").replace(".", ",") + " €";
}

export function addDaysToIsoDate(isoDate, days) {
    const date = new Date(isoDate);
    let month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;
    return (date.getDate()+days) + "/" + month + "/" + date.getFullYear();
}