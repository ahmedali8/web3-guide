

function is_touch_device() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}



function delay(n) {
    n = n || 2000;
    return new Promise(done => {
        setTimeout(() => {
            done();
        }, n);
    });
}


function preloadImage(url, callback = null) {
  //  console.log('preload!!', url);
    var img = new Image();
    img.src = url;
    if (callback) {
        img.onload = callback;
    }
}


function preloadImages(urls) {
   // console.log(urls);
    for (url of urls) {
        preloadImage(url);

    }

}


