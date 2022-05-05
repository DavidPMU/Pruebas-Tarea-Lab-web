var map = L.map('map').setView([19.284076,-98.9955524], 17);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
tileSize: 512,
zoomOffset: -1,
accessToken: 'pk.eyJ1IjoibHVpc2pvc2U1IiwiYSI6ImNsMDc0dDVtMjAza3gzanM4d3J0ZnMzbzgifQ.NfkxFbGmErrf6AayBjmuXg'
}).addTo(map);

console.log("a")

$.ajax({
    dataType: 'json',
    url: 'api/bicicletas',
    success: function(res){
        console.log(res)
        res.bicicletas.forEach(function(bici){
            console.log(bici)

            L.marker([bici.ubicacion[1],bici.ubicacion[0]], title=bici.code).addTo(map);
        })
    }
})

