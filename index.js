function init(){
	$("#submitRoute").on('submit',function(e){
		e.preventDefault();
		let origin = $("input[name=origin]").val()
		let destination = $("input[name=destination]").val()
		console.log(origin,destination);
		let originLatLon;
		let destinationLatLon;
		$.when($.ajax({
					url: "https://maps.googleapis.com/maps/api/geocode/json",
					data:{
						address: origin,
						key: "AIzaSyAQLm64no1vHHHxneT8WcMf9ypJFb8lEyg"
					},
					type: "get"
					}),
					$.ajax({
					url: "https://maps.googleapis.com/maps/api/geocode/json",
					data:{
						address: destination,
						key: "AIzaSyAQLm64no1vHHHxneT8WcMf9ypJFb8lEyg"
					},
					type: "get"
					})
		).then(function(data,data2){
			originLatLon=data[0].results[0].geometry.location;
			destinationLatLon = data2[0].results[0].geometry.location;
		}).then(function(){
			console.log(originLatLon,destinationLatLon);
			initMap(originLatLon,destinationLatLon);
		}).then(function(){
			$.ajax({
				url: "https://api.uber.com/v1.2/estimates/price",
				method: "get",
				data:{
					start_latitude: originLatLon.lat,
					start_longitude: originLatLon.lng,
					end_latitude: destinationLatLon.lat,
					end_longitude: destinationLatLon.lng
				},
				headers:{
					'Authorization' : 'Token u_N6qlK2u9uIaT3iclaAZsbRbsE5sG_XmqIo04l9',
					'Access-Control-Allow-Origin' : 'file:///Users/wandujar/Desktop/thinkful/capStone1/main.html'
				}
			})
		})		
	})
}
$(init());



function initMap(origin,destination){
	console.log("Map called")
	var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
	var map = new google.maps.Map(
    document.getElementById('map'), {zoom: 12, center: origin}
    );
	directionsDisplay.setMap(map)
	var request = {
    origin: origin,
    destination: destination,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });	
}


