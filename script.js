// Sample data - replace with your actual data or fetch from an API


import {getStores} from './locationRepositry.js';

let map;
let markers = [];

async function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 51.1657, lng: 10.4515 },
        zoom: 6
    });


    const stores = await getStores();
    stores.forEach(store => {
        addMarker(store);
        addStoreToList(store);
    });
}

function addMarker(store) {
    const marker = new google.maps.Marker({
        position: { lat: store.lat, lng: store.lng },
        map: map,
        title: store.name
    });

    markers.push(marker);

    const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${store.name}</h3><p>${store.address}, ${store.city}</p><p>${store.hours}</p>`
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

function addStoreToList(store) {
    const storeList = document.getElementById('store-list');
    const storeItem = document.createElement('div');
    storeItem.classList.add('store-item');
    storeItem.innerHTML = `
        <div class="store-name">${store.name}</div>
        <div class="store-address">${store.address}, ${store.postalCode} ${store.city}</div>
        <div class="store-hours">${store.hours}</div>
    `;
    storeList.appendChild(storeItem);
}

function searchStores() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredStores = stores.filter(store => 
        store.name.toLowerCase().includes(searchInput) ||
        store.city.toLowerCase().includes(searchInput) ||
        store.address.toLowerCase().includes(searchInput)
    );

    document.getElementById('store-list').innerHTML = '';
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    filteredStores.forEach(store => {
        addMarker(store);
        addStoreToList(store);
    });

    if (filteredStores.length > 0) {
        map.setCenter({ lat: filteredStores[0].lat, lng: filteredStores[0].lng });
    }
}

document.getElementById('search-button').addEventListener('click', searchStores);

window.onload = initMap;