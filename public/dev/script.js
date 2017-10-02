function initMap() {
  /**
   * ユーザー情報
   */
  const user = {
    "position": {}
  };

  /**
   * DOM要素の取得
   */
  const mapContainer = document.getElementById("map");
  const getPositionButton = document.getElementById("button_getposition");
  
  /**
   * Google Mapの初期化
   */
  const map = new google.maps.Map(mapContainer, {
    "center": {
      "lat": 34.682007,
      "lng": 135.498626
    },
    "zoom": 16,
    "disableDefaultUI": true,
    "zoomControl": true
  });

  /**
   * Google Map読み込み時のイベントリスナを追加
   */
  google.maps.event.addListenerOnce(map, "idle", event => {
    const geolocationConfig = {
      "enableHighAccuracy": true,
      "timeout": 10 * 1000,
      "maximumAge": 1 * 1000
    }

    const userPositionMarker = new google.maps.Marker({
      "map": map,
      "icon": {
        "url": "./image/trump.png",
        "size": new google.maps.Size(1068, 1068),
        "scaledSize": new google.maps.Size(60, 60),
        "origin": new google.maps.Point(0, 0),
        "anchor": new google.maps.Point(30, 30)
      }
    });

    navigator.geolocation.watchPosition(position => {
      console.log(position, userPositionMarker);

      if(!user.position.latitude || !user.position.longitude) {
        map.setCenter({
          "lat": position.coords.latitude,
          "lng": position.coords.longitude
        });
      }

      user.position.latitude = position.coords.latitude;
      user.position.longitude = position.coords.longitude;

      userPositionMarker.setPosition({
        "lat": user.position.latitude,
        "lng": user.position.longitude
      });
    }, null, geolocationConfig);
  });

  /**
   * 現在地取得ボタンにイベントリスナを追加
   */
  getPositionButton.addEventListener("click", event => {
    map.setCenter({
      "lat": user.position.latitude,
      "lng": user.position.longitude
    })
  });
}