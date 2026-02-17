const express = require('express');
const app = express();
const port = 3000;
let products = [
    {id: 1, name: 'Фикус', price: 3000},
    {id: 2, name: 'Колода карт', price: 1200},
    {id: 3, name: 'Ноутбук', price: 100000}
];

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Магазин');
});

app.post('/products', (req, res) => {
    const {name, price} = req.body;

    const newProduct = {
        id: Date.now(),
        name,
        price
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.get('/products', (req, res) => {
    res.send(JSON.stringify(products));
});

app.get('/products/:id', (req, res) => {
    const product = products.find(u => u.id == req.params.id);
    if (product) {
        res.send(JSON.stringify(product));
    } else {
        res.status(404).json({ message: 'Товар не найден' });
    }
});

app.patch('/products/:id', (req, res) => {
    const product = products.find(u => u.id == req.params.id);
     if (product) {
        const {name, price} = req.body;
        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = price;
        res.json(product);
    } else {
        res.status(404).json({ message: 'Товар не найден' });
    }
});

app.delete('/products/:id', (req, res) => {
    const initialLength = products.length;
    products = products.filter(u => u.id != req.params.id);
    if (products.length === initialLength) {
        return res.status(404).json({ message: 'Товар не найден' });
    }
    res.json({ message: 'Товар удален' });
})

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});