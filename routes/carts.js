const express = require('express');
const router = express.Router();

// Simular una base de datos de carritos (puedes adaptarlo a tus necesidades)
let carts = [];

// Rutas para carritos
router.get('/', (req, res) => {
    res.json(carts);
});

router.post('/', (req, res) => {
    const { id, products } = req.body;
    
    // Validación básica de campos
    if (!id || !products) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Crear el nuevo carrito
    const newCart = { id, products };
    carts.push(newCart);
    res.status(201).json({ message: 'Carrito creado con éxito', cart: newCart });
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cart = carts.find(c => c.id === id);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { products } = req.body;
    const cartIndex = carts.findIndex(c => c.id === id);

    if (cartIndex !== -1) {
        carts[cartIndex] = { id, products };
        res.json({ message: `Carrito con ID: ${id} actualizado`, cart: carts[cartIndex] });
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    carts = carts.filter(c => c.id !== id);
    res.json({ message: `Carrito con ID: ${id} eliminado` });
});

module.exports = router;
