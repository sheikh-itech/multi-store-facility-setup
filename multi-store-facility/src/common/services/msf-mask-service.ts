import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class MsfMaskService {

  private static maskElement: HTMLDivElement;
  
  constructor() {

    MsfMaskService.maskElement = <HTMLDivElement>document.getElementById('msf-mask');
  }

  public show(maskStatus: boolean): void {
    if (maskStatus)
      MsfMaskService.maskElement.setAttribute('class', 'show-loader');
    else
      MsfMaskService.maskElement.setAttribute('class', 'display-none');
  }
}
