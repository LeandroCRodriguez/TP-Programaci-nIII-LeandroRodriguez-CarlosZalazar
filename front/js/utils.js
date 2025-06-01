// utils.js
export function validateString(str) {
    const regex = /^[a-zA-Z\s]+$/;

    if (!str || typeof str !== 'string' || !regex.test(str.trim())) {
        throw new Error("Por favor ingresá un nombre válido (solo letras y espacios).");
    }

    return true;
}
