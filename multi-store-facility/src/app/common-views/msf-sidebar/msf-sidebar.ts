import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SlideInOutAnimation } from './animation';
import { MsfSidebarService } from 'src/common/services/msf-sidebar-service';
import { take } from 'rxjs';
import { RouteGuard } from 'src/common/services/route-guard';

@Component({
    selector: 'msf-sidebar',
    templateUrl: './msf-sidebar.html',
    styleUrls: ['./msf-sidebar.css'],
    animations: [SlideInOutAnimation]
})
export class MsfSidebar {

    navStates: string[] = [];
    totalSubNavs = 3;

    constructor(@Inject(DOCUMENT) private doc: Document, private sideService: MsfSidebarService,
        private guard: RouteGuard) {
        this.initNavs();
    }
    
    /*  This function for RouteChangeService [Async mode needed]
    async onMenuItemClick(event: any) {

        this.routeService.waitForInitialization()
            .pipe(take(1)) // Automatically unsubscribe after the first emission
            .subscribe({
                next: (resp) => {
                    if(resp)
                        this.startNavigation(event);
                    else
                        console.log('Restricted content');
                },
                error: (err) => {
                    console.log('Restricted content');
                }
            });
    }
    */

    async onMenuItemClick(event: any) {

        let ele = event.target.closest("LI") as HTMLElement;
		if(!ele)
		    return;
        if(ele.classList.contains("dummy-link") || ele.classList.contains("home")) {
            this.startNavigation(event);
            return;
        }

        this.guard.waitForInitialization()
            .pipe(take(1)) // Automatically unsubscribe after the first emission
            .subscribe({
                next: (resp) => {
                    if (resp)
                        this.startNavigation(event);
                    else
                        console.log('Restricted content');
                },
                error: (err) => {
                    console.log('Restricted content');
                }
            });
    }

    private initNavs() {
        for (let i = 0; i < this.totalSubNavs; i++)
            this.navStates.push("out");
    }

    private resetNavs(index: number) {
        for (let i = 0; i < this.navStates.length; i++)
            if (i != index)
                this.navStates[i] = "out";
    }

    private startNavigation(event: any): void {

        let ele = event.target.closest("LI") as HTMLElement;

        if (!ele)
            return;
        let isSubNav = false;

        ele.childNodes.forEach(node => {
            if (node.nodeName == "UL" && node instanceof HTMLElement) {
                isSubNav = true;
                let index = node.getAttribute('itemid');
                if (index) {
                    this.resetNavs(Number.parseInt(index));
                    this.navStates[Number.parseInt(index)] = this.navStates[Number.parseInt(index)] == "out" ? "in" : "out";
                    if (this.sideService.whichView() === 'Medium')
                        node.classList.add("msf-blue-sm-nav");
                    else
                        node.classList.remove("msf-blue-sm-nav");
                    return;
                }
            }
        });

        if (!isSubNav) {
            if (!ele.classList.contains("sub-menu"))
                this.resetNavs(-1);
        }

        let subMenu = ele.closest('UL');
        if (subMenu?.getAttribute('class')?.includes('msf-blue-sub-nav')) {
            subMenu.childNodes.forEach(node => {
                if ((node instanceof HTMLElement))
                    node.classList.remove('active');
            })
            ele.classList.add('active');
            return;
        }

        if (subMenu?.getAttribute('class')?.includes('msf-nav-list')) {
            let subMenus = this.doc.getElementsByClassName("msf-blue-sub-nav") as HTMLCollectionOf<HTMLElement>;
            for (let i = 0; i < subMenus.length; i++) {

                if (subMenus[i].closest("LI")?.getAttribute("class")?.includes("active") && subMenus[i].style.display == 'block') {

                    if (ele.childNodes[1] && ele.childNodes[1].isEqualNode(subMenus[i]))
                        continue;

                    subMenus[i].style.display = 'none';
                    subMenus[i].closest("LI")?.classList.remove('active')
                }
            }
        }

        let items = this.doc.querySelectorAll("LI");
        items.forEach(item => {
            item.classList.remove('active');
        });

        ele.classList.add('active');
    }
}
