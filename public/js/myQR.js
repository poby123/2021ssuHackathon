var video = document.createElement('video');
var canvasElement = document.getElementById('canvas');
var canvas = canvasElement.getContext('2d');
var loadingMessage = document.getElementById('loadingMessage');
var outputMessage = document.getElementById('outputMessage');
var outputData = document.getElementById('outputData');

function drawLine(begin, end, color) {
  canvas.beginPath();
  canvas.moveTo(begin.x, begin.y);
  canvas.lineTo(end.x, end.y);
  canvas.lineWidth = 4;
  canvas.strokeStyle = color;
  canvas.stroke();
}

// Use facingMode: environment to attemt to get the front camera on phones
navigator.mediaDevices
  .getUserMedia({ video: { facingMode: 'environment' } })
  .then(function (stream) {
    video.srcObject = stream;
    video.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
    video.play();
    requestAnimationFrame(tick);
  });

function sendData(target) {
  return $.ajax({
    url: '/market/qr',
    method: 'POST',
    dataType: 'json',
    data: target,
  });
}

async function tick() {
  //   loadingMessage.innerText = '⌛ Loading video...';
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    // loadingMessage.hidden = true;
    canvasElement.hidden = false;

    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    var imageData = canvas.getImageData(
      0,
      0,
      canvasElement.width,
      canvasElement.height,
    );
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });
    if (code) {
      drawLine(
        code.location.topLeftCorner,
        code.location.topRightCorner,
        '#FF3B58',
      );
      drawLine(
        code.location.topRightCorner,
        code.location.bottomRightCorner,
        '#FF3B58',
      );
      drawLine(
        code.location.bottomRightCorner,
        code.location.bottomLeftCorner,
        '#FF3B58',
      );
      drawLine(
        code.location.bottomLeftCorner,
        code.location.topLeftCorner,
        '#FF3B58',
      );

      outputMessage.innerText = '인증되었습니다.';
      //   outputMessage.hidden = true;
      //   outputData.parentElement.hidden = false;
      //   outputData.innerText = code.data;

      const userCode = code.data;

      try {
        const res = await sendData({ user: userCode });
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 3 sec
        console.log('result :', res);
      } catch (e) {
        console.log('error : ', e);
      } finally {
        outputMessage.innerText = 'QR코드를 스캔해주세요.';
      }
    } else {
      //   outputMessage.hidden = false;
      //   outputData.parentElement.hidden = true;
    }
  }
  requestAnimationFrame(tick);
}
