document.getElementById('generar').addEventListener('click', async () => {
    const nombre = document.getElementById('nombre').value.trim();
    const carrera = document.getElementById('carrera').value;
    const caso = document.getElementById('caso').value.trim();
    const respuesta = document.getElementById('respuesta').value.trim();

    if (!nombre || !carrera || !caso || !respuesta) {
        alert('Todos los campos son obligatorios');
        return;
    }

    const btn = document.getElementById('generar');
    btn.disabled = true;
    btn.textContent = 'Generando...';
    document.getElementById('error').style.display = 'none';
    document.getElementById('resultado').style.display = 'none';

    try {
        const response = await fetch('https://TU_WORKER_URL', {  // <-- URL de tu Worker
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, carrera, caso, respuesta })
        });

        if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);

        const latex = await response.text();
        document.getElementById('codigo-latex').value = latex;
        document.getElementById('resultado').style.display = 'block';
    } catch (err) {
        document.getElementById('error').textContent = 'Error: ' + err.message;
        document.getElementById('error').style.display = 'block';
    } finally {
        btn.disabled = false;
        btn.textContent = '🚀 Generar Informe LaTeX';
    }
});

// Funcionalidad Copiar
document.getElementById('copiar').addEventListener('click', () => {
    const codigo = document.getElementById('codigo-latex');
    codigo.select();
    document.execCommand('copy');
    alert('Código copiado al portapapeles');
});