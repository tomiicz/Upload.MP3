async function subir() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return alert("Elegí un archivo primero");

  const form = new FormData();
  form.append("file", file);

  const res = await fetch("/upload", {
    method: "POST",
    body: form
  });

  const data = await res.json();
  document.getElementById("link").innerHTML = `
    <strong>Tu archivo está disponible en:</strong><br>
    <a href="${data.url}" target="_blank">${data.url}</a>
  `;
}