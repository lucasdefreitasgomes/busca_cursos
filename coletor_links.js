// Configuração da API do YouTube Data
gapi.load("client", iniciar);

function iniciar() {
    gapi.client.init({
        apiKey: "AIzaSyBj5_ahiWz8WsnHGjlmawowkPtttt56upc",
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
    }).then(() => {
        console.log("API do YouTube Data inicializada");
    }, (erro) => {
        console.error("Erro ao inicializar API do YouTube Data", erro);
    });
}

// Função para buscar playlists relacionadas ao assunto especificado
function coletarLinks() {
    // Obtém o valor do campo de entrada de texto
    let busca = document.getElementById("busca").value;

    // Cria uma solicitação para a API do YouTube Data
    gapi.client.youtube.search.list({
        q: busca,
        type: "playlist",
        part: "id,snippet",
        maxResults: 10,
    }).then((response) => {
        // Processa a resposta da API e exibe os resultados na página HTML
        let resultados = document.getElementById("resultados");
        resultados.innerHTML = "";

        response.result.items.forEach((item) => {
            let link = "https://www.youtube.com/playlist?list=" + item.id.playlistId;
            let titulo = item.snippet.title;
            let descricao = item.snippet.description;
            let thumbnail = item.snippet.thumbnails.default.url;

            let resultado = document.createElement("div");
            resultado.innerHTML = `
                <a href="${link}" target="_blank">
                    <img src="${thumbnail}">
                    <h2>${titulo}</h2>
                    <p>${descricao}</p>
                </a>
            `;

            resultados.appendChild(resultado);
        });
    }, (erro) => {
        console.error("Erro na busca", erro);
    });
}
