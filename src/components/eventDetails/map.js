function renderMap (location) {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 13
  })

  const marker = new google.maps.Marker({
    position: location,
    animation: google.maps.Animation.DROP,
    map: map
  })
}

export default renderMap
