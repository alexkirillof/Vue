const fs = require('fs');

function readItems(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(data));
        });
    });
}

function writeItems(path, items) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(items), (err) => {
            if (err) {
                reject(err);
            }
            resolve(items);
        });
    });
}

function createPage(items, itemsPerPage, pageNumber) {
    const lastPage = Math.ceil(items.length / itemsPerPage);
    const start = itemsPerPage * (pageNumber - 1);
    const end = itemsPerPage * pageNumber;
    const data = pageNumber === lastPage ? items.slice(start) : items.slice(start, end);
    return {
        data,
        number: pageNumber,
    };
}

function calcPageCount(items, itemsPerPage) {
    return Math.ceil(items.length / itemsPerPage);
}

function calcStatistics(items) {
    return items.reduce((acc, items) => {
        acc[items.category] = (acc[items.category] || 0) + items.amount;
        return acc;
    }, {});
}

function getStatistics(path) {
    return readItems(path)
        .then((_items) => calcStatistics(_items));
}

function getPage(path, itemsPerPage, pageNumber) {
    return readItems(path)
        .then((_items) => {
            const items = [..._items];
            return createPage(items, itemsPerPage, pageNumber);
        });
}

function getPageCount(path, itemsPerPage) {
    return readItems(path)
        .then((items) => calcPageCount(items, itemsPerPage));
}

function addPayment(path, data) {
    return readItems(path)
        .then((_items) => {
            const items = [..._items],
            lastItemId = items[items.length - 1]?.id;
                payment = {
                    id: lastItemId ? lastItemId + 1 : 1,
                    ...data,
                };
            items.push(payment);
            return items;
        })
        .then((resultPayments) => writeItems(path, resultPayments))
        .catch((err) => console.log(err));
}

function deletePayment(path, id) {
    return readItems(path)
        .then((_items) => {
            const items = [..._items];
            const index = items.findIndex((el) => el.id === id);
            if (index >= 0) {
                items.splice(index, 1);
                return items;
            }
            throw new Error(`Payment with ID=${id} not found`);
        })
        .then((resultPayments) => writeItems(path, resultPayments))
        .catch((err) => console.log(err));
}

function editPayment(path, data) {
    return readItems(path)
        .then((_items) => {
            const items = [..._items];
            const index = items.findIndex((el) => el.id === data.id);
            if (index < 0) {
                throw new Error(`Payment with ID=${data.id} not found`);
            }
            items[index] = {...data };
            return items;
        })
        .then((resultPayments) => writeItems(path, resultPayments))
        .catch((err) => console.log(err));
}

function getCategory(path) {
    return readItems(path)
        .then((_items) => {
            const items = [..._items];
            return items;
        });
}

function addCategory(path, data) {
    return readItems(path)
        .then((_items) => {
            const items = [..._items];
            items.push(data);
            return items;
        })
        .then((resultCategory) => writeItems(path, resultCategory))
        .catch((err) => console.log(err));
}

module.exports = {
    readItems,
    writeItems,
    getPage,
    getPageCount,
    addPayment,
    deletePayment,
    editPayment,
    getCategory,
    addCategory,
    calcStatistics,
    getStatistics,
};