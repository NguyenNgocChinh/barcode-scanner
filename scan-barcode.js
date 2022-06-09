var Quagga = window.Quagga;

function load_quagga() {
  if (
    navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === "function"
  ) {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          numOfWorkers: navigator.hardwareConcurrency,
          target: document.querySelector("#barcode-scanner"),
        },
        decoder: {
          readers: [
            "code_128_reader",
            "code_93_reader",
            "code_39_reader",
            "ean_reader",
          ],
        },
      },
      function (err) {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        $("#barcode-scanner").show(300);
        $("#btnStop").show(300);
        Quagga.start();
      }
    );

    Quagga.onDetected(function (result) {
      let last_code = result.codeResult.code;
      $("#last-scan").html(last_code);
      $("#last-scan").addClass("flash");
      setTimeout(() => $("#last-scan").removeClass("flash"), 1000);
    });
  }
}

$(function () {
  $("#btnScan").click(function () {
    load_quagga();
  });

  $("#btnStop").click(function () {
    Quagga.stop();
    $("#barcode-scanner").hide(300);
  });
});
