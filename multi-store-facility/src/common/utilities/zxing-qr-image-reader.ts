import { Injectable } from "@angular/core";
import { BrowserQRCodeReader } from "@zxing/library";
import { EncDecUtil } from "./enc-dec-util";
import { Observable, Subject, shareReplay } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ZXingQrImageReader {

    private codeReader: BrowserQRCodeReader;
    private encKeyFields: string[];

    private qrCodeInfo = new Subject<any>();

    constructor() {
        this.codeReader = new BrowserQRCodeReader();
        this.encKeyFields = ['name', 'desc', 'code', 'category'];
    }

    public readQrImage(imageUrl: string, count: number = 1): Observable<any> {

        const image = new Image();
        image.src = imageUrl;

        image.onerror = (err) => {
            console.error('Failed to load image:', err);
        };

        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext('2d');
            context?.drawImage(image, 0, 0, image.width, image.height);

            this.codeReader.decodeFromImageElement(image)
                .then(result => {
                    let actualData = result.getText().split('##');
                    let info = [] as any;
                    actualData.forEach(data => {
                        let temp = data.split(':');
                        if (this.encKeyFields.includes(temp[0]))
                            info.push({ key: temp[0], value: EncDecUtil.decrypt(temp[1]) });
                        else
                            info.push({ key: temp[0], value: temp[1] });
                    });
                    this.qrCodeInfo.next(info);
                })
                .catch(err => {
                    if (count <= 5)
                        this.readQrImage(imageUrl, count + 1);
                    else
                        this.qrCodeInfo.next(null);
                });
        };
        return this.qrCodeInfo.asObservable().pipe(shareReplay(1));
    }
}