const express = require('express');
const cors = require('cors');
const { PAYMENTS_PATH, CATEGORY_PATH } = require('./constants');
const {
    getPage,
    getPageCount,
    addPayment,
    deletePayment,
    editPayment,
    getCategory,
    addCategory,
    getStatistics,
} = require('./MainFunctions');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./server/static'));

app.get('/page/', (req, res) => {
    const itemsPerPage = Number(req.query.itemsPerPage);
    const pageNumber = Number(req.query.pageNumber);
    getPage(PAYMENTS_PATH, itemsPerPage, pageNumber)
        .then((page) => {
            res.setHeader('Content-type', 'application/json');
            res.send(page);
        });
});

app.get('/page_count/', (req, res) => {
    const itemsPerPage = Number(req.query.itemsPerPage);
    getPageCount(PAYMENTS_PATH, itemsPerPage)
        .then((pageCount) => {
            res.setHeader('Content-type', 'application/json');
            res.send({ pageCount });
        });
});

app.get('/category', (req, res) => {
    getCategory(CATEGORY_PATH)
        .then((category) => {
            res.setHeader('Content-type', 'application/json');
            res.send(category);
        });
});

app.get('/stat', (req, res) => {
    getStatistics(PAYMENTS_PATH)
        .then((stat) => {
            res.setHeader('Content-type', 'application/json');
            res.send(stat);
        });
});

app.post('/category', (req, res) => {
    addCategory(CATEGORY_PATH, req.body.category)
        .then(() => {
            res.setHeader('Content-type', 'text/plain');
            res.send('OK');
        });
});

app.post('/payment', (req, res) => {
    addPayment(PAYMENTS_PATH, req.body)
        .then(() => {
            res.setHeader('Content-type', 'text/plain');
            res.send('OK');
        });
});

app.put('/payment', (req, res) => {
    editPayment(PAYMENTS_PATH, req.body)
        .then(() => {
            res.setHeader('Content-type', 'text/plain');
            res.send('OK');
        });
});

app.delete('/payment', (req, res) => {
    deletePayment(PAYMENTS_PATH, req.body.id)
        .then(() => {
            res.setHeader('Content-type', 'text/plain');
            res.send('OK');
        });
});

app.listen('8070', () => {
    console.log('Server is running on port 8070!');
});