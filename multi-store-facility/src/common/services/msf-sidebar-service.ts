import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MsfSidebarService {

    private sidebarViews = ["Full", "Medium","Small"];

    private currentView: string = "";

    private smallWidth = "0px";
    private mediumWidth = "70px";
    private fullWidth = "200px";

    constructor() { }

    public toggleView(): void {
        
        if(this.currentView==this.sidebarViews[0])
            this.mediumView();
        else
            if(this.currentView==this.sidebarViews[1])
                this.smallView();
            else 
                if(this.currentView==this.sidebarViews[2] && window.innerWidth >= 750)
                    this.fullView();
                else
                    this.mediumView();
    }

    public resetView(event: any): void {

        if (!event || !event.target || !event.target.window)
            return;

        if (event.target.window.innerWidth > 949)
            this.fullView();
        else
            if (event.target.window.innerWidth < 950 && event.target.window.innerWidth > 749)
                this.mediumView();
            else
                if (event.target.window.innerWidth < 750)
                    this.smallView();
    }

    private fullView(): void {

        this.resetNavbar();
        this.currentView = this.sidebarViews[0];
        document.documentElement.style.setProperty('--displayEle', "block");
        document.documentElement.style.setProperty('--sidebarMenu', "inline");
        document.documentElement.style.setProperty('--sidebarWidth', this.fullWidth);
        document.documentElement.style.setProperty('--centerText', "left");
        document.documentElement.style.setProperty('--paddingFive', "5px");
        document.documentElement.style.setProperty('--rightIcon', "inline");
        document.documentElement.style.setProperty('--leftText', "left");
    }

    private mediumView(): void {

        this.resetNavbar();
        this.currentView = this.sidebarViews[1];
        document.documentElement.style.setProperty('--displayEle', "block");
        document.documentElement.style.setProperty('--sidebarMenu', "block");
        document.documentElement.style.setProperty('--paddingFive', "0px");
        document.documentElement.style.setProperty('--centerText', "center");
        document.documentElement.style.setProperty('--rightIcon', "none");
        document.documentElement.style.setProperty('--leftText', "center");
        document.documentElement.style.setProperty('--sidebarWidth', this.mediumWidth);
    }

    private smallView(): void {

        this.currentView = this.sidebarViews[2];
        document.documentElement.style.setProperty('--displayEle', "none");
        document.documentElement.style.setProperty('--sidebarWidth', this.smallWidth);
    }

    public whichView(): string {

        return this.currentView;
    }

    private resetNavbar() {

        let ele: NodeListOf<Element>;
        if(this.currentView==='Medium' || this.currentView==='Small') {
            ele = document.querySelectorAll('.msf-blue-sm-nav');
            ele.forEach(node=>{
                node.classList.remove('msf-blue-sm-nav');
            })
        } else {
            ele = document.querySelectorAll('.msf-blue-sub-nav');
            ele.forEach(node=>{
                node.classList.add('msf-blue-sm-nav');
            })
        }        
    }
}
