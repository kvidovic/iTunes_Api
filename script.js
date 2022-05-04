const getElementFromDOM = (element) => {
    return document.querySelector(element);
}

const renderData = (data) => {
    if(data.length > 0){
        let html = '';
        for (const item of data) {
            html += '<tr>';
            html += `<td>${item.artistName}</td>`;
            html += `<td>${item.collectionName}</td>`;
            html += `<td>`;
            html += `<audio controls src="${item.previewUrl}"</audio>`;
            html += `</td>`;
            html += '</tr>';
        }

        songsList.innerHTML = html;
        return;
    }
        songsList.innerHTML = 'Nisam dohvatio podatke!';
}

const fetchData = (url, method = 'GET') => {
    return fetch (url, {
        method: method
    });
}

const getDataFromApi = (event) => {
    event.preventDefault();

    const term = searchTerm.value;

    if(!term){
        alert('Unesite neki izraz!');
        return;
    }

    const url = `https://itunes.apple.com/search?term=${term}&entity=song`;

    loader.classList.remove('d-none');
    loader.classList.add('d-flex');

    const dataPromise = fetchData(url);

    dataPromise.then(response => response.json())
               .then(data => {
                   renderData(data.results)
               })
               .catch(error => console.log(error))
               .finally(() => {
                   loader.classList.remove('d-flex');
                   loader.classList.add('d-none');
               })
}

const appInit = () => {

    const loader = getElementFromDOM('#loader');
    const searchTerm = getElementFromDOM('#searchTerm');
    const songsList = getElementFromDOM('#songsList');
    const searchBtn = getElementFromDOM('#searchBtn');

    searchBtn?.addEventListener('click', getDataFromApi);

}

(() => {
    appInit();
})();