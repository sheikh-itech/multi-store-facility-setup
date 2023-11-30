import { Component } from '@angular/core';

@Component({
  selector: 'msf-gapshap-point',
  templateUrl: './gapshap-point.html',
  styleUrls: ['./gapshap-point.css']
})
export class GapshapPoint {

    closeGapShap(event: any) {

        let ele = event.target.parentElement.parentElement;
        if(ele)
            ele.style.display = 'none';
    }
}
