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
  const createThreadButton = document.getElementById("button_createthread");
  
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

  createThreadButton.addEventListener("click", event => {
    map.setCenter({
      "lat": user.position.latitude,
      "lng": user.position.longitude
    });

    const createTheadDialog = new google.maps.InfoWindow({
      "content": createThreadForm()
    });
    
    const createTheadMarker = new google.maps.Marker({
      "map": map,
      "position": {
        "lat": user.position.latitude,
        "lng": user.position.longitude
      }
    });
    
    createTheadDialog.open(map, createTheadMarker);
  });

  /**
   * 現在地取得ボタンにイベントリスナを追加
   */
  getPositionButton.addEventListener("click", event => {
    map.setCenter({
      "lat": user.position.latitude,
      "lng": user.position.longitude
    });
  });
}

function createThreadForm() {
  const container = document.createElement("div");
  const titleRow = document.createElement("div");
  const titleLabel = document.createElement("label");
  const titleInput = document.createElement("input");
  const descriptionRow = document.createElement("div");
  const descriptionLabel = document.createElement("label");
  const descriptionInput = document.createElement("input");
  const controllerRow = document.createElement("div");
  const submitButton = document.createElement("button");
  const cancelButton = document.createElement("button");

  container.className = "form_createthread";
  titleRow.className = "form_createthread_row";
  titleLabel.className = "form_createthread_label";
  titleInput.className = "form_createthread_input";
  descriptionRow.className = "form_createthread_row";
  descriptionLabel.className = "form_createthread_label";
  descriptionInput.className = "form_createthread_input";
  controllerRow.className = "form_createthread_row";
  submitButton.className = "form_createthread_button -submit";
  cancelButton.className = "form_createthread_button -cancel";

  titleLabel.textContent = "タイトル：";
  descriptionLabel.textContent = "説明："
  submitButton.textContent = "作成する";
  cancelButton.textContent = "作成しない";

  container.appendChild(titleRow);
  titleRow.appendChild(titleLabel);
  titleRow.appendChild(titleInput);
  container.appendChild(descriptionRow);
  descriptionRow.appendChild(descriptionLabel);
  descriptionRow.appendChild(descriptionInput);
  container.appendChild(controllerRow);
  controllerRow.appendChild(submitButton);
  controllerRow.appendChild(cancelButton);

  return container;
}