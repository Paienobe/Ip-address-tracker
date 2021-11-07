const userAddress = document.getElementById("user_ip")
const enterKey = document.querySelector(".enter_key")
let apiUrl = "https://geo.ipify.org/api/v2/country?apiKey=at_az1A34R8civ2vgCzjxfENrZeURWlz&ipAddress="
const results = document.querySelector(".results")
const ipAddress = document.querySelector("#address-content")
const userlocation = document.querySelector("#location-content")
const timezone = document.querySelector("#timezone-content")
const isp = document.querySelector("#isp-content")

const myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
});

const mymap = L.map('map').setView([0, 0], 1)
const marker = L.marker([0, 0], {icon : myIcon}).addTo(mymap)
const attribution = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`
const tileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
const tiles = L.tileLayer(tileUrl, {attribution})
tiles.addTo(mymap)

enterKey.addEventListener("click", () => {
    apiUrl += userAddress.value
    searchAddress()
    userAddress.value = ""
})

async function searchAddress() {
    const response = await fetch(apiUrl)
    const data = await response.json()
    let latLng = []

    var xmlhttp = new XMLHttpRequest();
    var ip_address = data.ip;
    var auth = 'c3efcde4-0716-4a7f-a2fd-bcd40a63889e';
    var url = "https://ipfind.co/?auth=" + auth + "&ip=" + ip_address;

    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.responseText);
        console.log(result);
        latLng.push(result)
        console.log(latLng)
        console.log(latLng[0].latitude)
        console.log(latLng[0].longitude)
    marker.setLatLng([latLng[0].latitude, latLng[0].longitude])

        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    ipAddress.textContent = `${data.ip}`
    userlocation.textContent = `${data.location.country}, ${data.location.region}`
    timezone.textContent = `UTC ${data.location.timezone}`
    isp.textContent = `${data.isp}`
}


