    let productos = [];

    const agregarProducto = (id, producto, precio) => {
        let indice = productos.findIndex(p => p.id == id);

        if (indice != -1) {
            productos[indice].cantidad++;
            putJSON(productos[indice]);
        } else {
            let nuevoProducto = {
                id: id,
                producto: producto,
                precio: precio,
                cantidad: 1
            };
            productos.push(nuevoProducto);
            postJSON(nuevoProducto);
        }

        actualizarTabla();
    }

    const actualizarTabla = () => {
        let tbody = document.getElementById('tbody');
        let total = 0;

        tbody.innerHTML = '';

        for (let item of productos) {
            let fila = tbody.insertRow();

            let celdaProducto = fila.insertCell(0);
            let celdaCantidad = fila.insertCell(1);
            let celdaPrecio = fila.insertCell(2);
            let celdaTotal = fila.insertCell(3);
            let celdaBoton = fila.insertCell(4);

            celdaProducto.textContent = item.producto;
            celdaCantidad.textContent = item.cantidad;
            celdaPrecio.textContent = item.precio;
            celdaTotal.textContent = (item.precio * item.cantidad).toFixed(2);

            let boton = document.createElement('button');
            boton.textContent = 'Borrar';
            celdaBoton.appendChild(boton);

            boton.addEventListener('click', function () {
                eliminar(item.id);
            });

            total += item.precio * item.cantidad;
        }
        document.getElementById('total').textContent = total.toFixed(2);
    }

    const eliminar = (id) => {
        let indice = productos.findIndex(p => p.id == id);
        if (indice != -1) {
            productos.splice(indice, 1);
            actualizarTabla();
            deleteJSON(id);
        }
    }

    async function postJSON(data) {
        try {
            const response = await fetch("http://localhost:3000/productos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function getJSON() {
        try {
            const response = await fetch("http://localhost:3000/productos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();
            console.log("Success:", result);

            productos = result;
            actualizarTabla();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function putJSON(data) {
        try {
            const response = await fetch(`http://localhost:3000/productos/${data.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function deleteJSON(id) {
        try {
            const response = await fetch(`http://localhost:3000/productos/${id}`, {
                method: "DELETE",
            });

            const result = await response.json();
            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    window.onload = function () {
        getJSON();
    };
    document.getElementById('btnInicio').addEventListener('click', function() {
        window.location.href = 'productos.html'; // Reemplaza 'index.html' con la URL de tu página de inicio
    });
    