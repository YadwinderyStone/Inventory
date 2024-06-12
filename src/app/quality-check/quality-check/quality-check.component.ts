import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import Quagga from 'quagga'; 
@Component({
  selector: 'app-quality-check',
  templateUrl: './quality-check.component.html',
  styleUrls: ['./quality-check.component.scss']
})
export class QualityCheckComponent implements OnInit {
  selectedDevice: MediaDeviceInfo;
  scannedResult: string;

  constructor(private http: HttpClient) { 

    console.log('BarcodeScannerComponent constructor called');
  }

  ngOnInit(): void {
   // this.initQuagga();
   navigator.mediaDevices.enumerateDevices()
   .then(devices => {
     this.selectedDevice = devices.find(device => device.kind === 'videoinput');
   });

  //  console.log('ngOnInit called');

  }

  // ngOnDestroy(): void {
  //   Quagga.stop();
  // }


  // private initQuagga(): void {
  //   Quagga.init({
  //     inputStream: {
  //       name: 'Live',
  //       type: 'LiveStream',
  //       target: document.querySelector('#interactive'),
  //       constraints: {
  //         width: 640,
  //         height: 480,
  //         facingMode: 'environment' // or 'user' for front camera
  //       }
  //     },
  //     decoder: {
  //       readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader'] // specify your readers here
  //     }
  //   }, (err) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     console.log('Initialization finished. Ready to start');
  //     Quagga.start();
  //   });

  //   Quagga.onDetected((result) => {
  //     console.log('Barcode detected and processed : [' + result.codeResult.code + ']', result);
  //     alert('Barcode detected: ' + result.codeResult.code);
  //     // Optionally, stop the scanner after detection
  //     Quagga.stop();
  //   });
  // }



  /* --------------------------------------------------------------------------------------------------*/

  onBarcodeScanned(result: string) {
    debugger;
    console.log('onBarcodeScanned called with result:', result);
    alert('Scanned result: ' + result);
    this.scannedResult = result;

    this.http.post('https://localhost:44346/api/BarCode/ReadBarcode', { imageBytes: result })
      .subscribe(response => {
        console.log('Barcode data:', response);
      }, error => {
        console.error('Error scanning barcode:', error);
      });
  }

  openDialog(){
    
  }
}




