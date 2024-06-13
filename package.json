const express = require('express');
const app = express();
const port = 8080;

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Importar los routers
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

// Usar los routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta raíz para mostrar una página HTML con estilo
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Productos</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <h1>Lista de Productos</h1>
            <div id="product-list"></div>
            <script>
                fetch('/api/products')
                    .then(response => response.json())
                    .then(products => {
                        const productList = document.getElementById('product-list');
                        let html = '<table class="table"><tr><th>ID</th><th>Título</th><th>Descripción</th><th>Precio</th></tr>';
                        products.forEach(product => {
                            html += \`<tr><td>\${product.id}</td><td>\${product.title}</td><td>\${product.description}</td><td>\${product.price}</td></tr>\`;
                        });
                        html += '</table>';
                        productList.innerHTML = html;
                    })
                    .catch(error => console.error('Error:', error));
            </script>
        </body>
        </html>
    `);
});

// Manejo de errores 404
app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});

// Manejo de errores del servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor y escuchar en el puerto definido
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
