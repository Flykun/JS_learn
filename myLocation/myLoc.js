window.onload = getMyLocation;

// 总部坐标
var ourCoords = {
    latitude: 47.624851,
    longitude: -122.52099,
};

// 获取位置信息
function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("Oops, no geolocation support")
    }
}

// 显示坐标
function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", longitude: " + longitude;
    // 传递坐标
    var km = computeDistance(position.coords, ourCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km + " km from the WickedlySmart HQ";
}

//显示错误信息
function displayError(error) {
    var errorTypes = {
        0: "Unknow error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };

    var errorMessage = errorTypes[error.code]
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;

}

// 计算距离
function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoods.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(startCoords.latitude);
    var destLongRads = degreesToRadians(startCoords.longitude);

    var Radius = 6371; // 地球半径(km)
    var distance = Math.acos(
        Math.sin(startLatRads) * Math.sin(destLatRads)
        + Math.cos(startLatRads) * Math.cos(destLatRads) 
        * Math.cos(startLongRads - destLongRads)
    ) * Radius;
    return distance;
}

// 角度转弧度
function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
}