const cameraVideo = document.getElementById('camera__video'),
    cameraCanvas = document.getElementById('camera__canvas'),
    cameraOutput = document.getElementById('camera__output'),
    cameraOverlay = document.getElementById('camera__overlay'),
    cameraTrigger = document.getElementById('camera__trigger');

let track = null;


function takePicture() {
    localStorage.clear();

    if (!track) return null;

    const ctx = cameraCanvas.getContext('2d');
    if (!ctx) return null;

    cameraCanvas.width = cameraVideo.videoWidth;
    cameraCanvas.height = cameraVideo.videoHeight;
    ctx.drawImage(cameraVideo, 0, 0);

    cameraTrigger.onclick = null;

    const dataURL = cameraCanvas.toDataURL('image/webp');
    cameraOutput.src = dataURL;
    cameraOverlay.src = 'images/confirm.png';
    localStorage.setItem('imgData', dataURL);

    track.stop();
};


function cameraStart() {
    const constraints = {
        video: { facingMode: 'user' },
        audio: false
    };

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
            track = stream.getTracks()[0];
            cameraVideo.srcObject = stream;
            cameraTrigger.onclick = takePicture;
        })
        .catch(err => {
            console.error('unable to get media stream', err);
        });
};


window.onload = cameraStart;
