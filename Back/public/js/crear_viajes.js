        const crear = document.getElementById("crear");
        const origen = document.getElementById("origen");
        const destino = document.getElementById("destino");
        const fechaSalida = document.getElementById("fechaSalida");
        const fechaLlegada = document.getElementById("fechaLlegada");
        const precio = document.getElementById("precio");

        crear.onclick = () => {
            fetch("/viajes", {
                method: "POST",
                body: JSON.stringify({
                    origen: origen.value,
                    destino: destino.value,
                    fechaSalida: fechaSalida.value,
                    fechaLlegada: fechaLlegada.value,
                    precio: precio.value
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }