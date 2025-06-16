const crear = document.getElementById("crear");
        const experiencia = document.getElementById("experiencia");
        const fecha = document.getElementById("fecha");
        const calificacion = document.getElementById("calificacion");
        const comentario = document.getElementById("comentario");
        const precio = document.getElementById("precio");

        crear.onclick = () => {
            fetch("/experiencias", {
                method: "POST",
                body: JSON.stringify({
                    experiencia: experiencia.value,
                    fecha: fecha.value,
                    calificacion: calificacion.value,
                    comentario: comentario.value,
                    precio: precio.value
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
