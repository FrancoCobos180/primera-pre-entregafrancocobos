const express = require('express');
const router = express.Router();

// Simular una base de datos de productos
let products = [
    { id: 1, title: 'Samsung', description: 'Galaxi A54', code: 'P001', price: 280.000, status: true, stock: 10, category: 'Celulares' },
    { id: 2, title: 'Motorola', description: 'Moto E20', code: 'P002', price: 15.000, status: true, stock: 20, category: 'Celulares' },
    { id: 3, title: 'Motorola', description: 'Moto e40', code: 'P003', price: 48.000, status: true, stock: 30, category: 'Celulares' }
];

// Ruta para listar productos con limitación
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit) || products.length;
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
});

// Ruta para crear un nuevo producto
router.post('/', (req, res) => {
    const { id, title, description, code, price, status, stock, category } = req.body;
    
    // Validación básica de campos
    if (id === undefined || !title || !description || !code || price === undefined || status === undefined || stock === undefined || !category) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Crear el nuevo producto
    const newProduct = { id, title, description, code, price, status, stock, category };
    products.push(newProduct);
    res.status(201).json({ message: 'Producto creado con éxito', product: newProduct });
});

// Ruta para obtener un producto por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Ruta para actualizar un producto por ID
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, code, price, status, stock, category } = req.body;
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex !== -1) {
        products[productIndex] = { id, title, description, code, price, status, stock, category };
        res.json({ message: `Producto con ID: ${id} actualizado`, product: products[productIndex] });
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Ruta para eliminar un producto por ID
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    products = products.filter(p => p.id !== id);
    res.json({ message: `Producto con ID: ${id} eliminado` });
});

module.exports = router;


