import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SlideInOutAnimation } from './animation';

@Component({
  selector: 'msf-animate-sidebar',
  templateUrl: './msf-animate-sidebar.html',
  styleUrls: ['./msf-animate-sidebar.css'],
  animations: [SlideInOutAnimation]
})
export class MsfAnimateSidebar {

    navStates: string[] = [];
    totalSubNavs = 3;

    constructor(@Inject(DOCUMENT) private doc: Document) {
        this.initNavs();
    }

    onMenuItemClick(event: any) {

        let ele = event.target.closest("LI") as HTMLElement;

        if(!ele)
            return;
        let isSubNav = false;

        ele.childNodes.forEach(node=>{
            if(node.nodeName=="UL" && node instanceof HTMLElement) {
                isSubNav = true;
                let index = node.getAttribute('itemid');
                if(index) {
                    this.resetNavs(Number.parseInt(index));
                    this.navStates[Number.parseInt(index)] = this.navStates[Number.parseInt(index)]=="out" ? "in" : "out";
                    return;
                }           
            }
        });

        if(!isSubNav) {
            if(!ele.classList.contains("sub-menu"))
                this.resetNavs(-1);
        }

        let subMenu = ele.closest('UL');
        if(subMenu?.getAttribute('class')?.includes('msf-sub-nav')) {
            subMenu.childNodes.forEach(node=>{
                if((node instanceof HTMLElement))
                    node.classList.remove('active');
            })
            ele.classList.add('active');
            return;
        }

        if(subMenu?.getAttribute('class')?.includes('msf-nav-list')) {
            let subMenus = this.doc.getElementsByClassName("msf-sub-nav") as HTMLCollectionOf<HTMLElement>;
            for(let i=0; i<subMenus.length; i++) {
                
                if(subMenus[i].closest("LI")?.getAttribute("class")?.includes("active") && subMenus[i].style.display=='block') {
                    
                    if(ele.childNodes[1] && ele.childNodes[1].isEqualNode(subMenus[i]))
                        continue;
                    
                    subMenus[i].style.display = 'none';
                    subMenus[i].closest("LI")?.classList.remove('active')
                }
            }
        }

        let items = this.doc.querySelectorAll("LI");
        items.forEach(item=>{
            item.classList.remove('active');
        });

        ele.classList.add('active');
    }

    private initNavs() {
        for(let i=0; i<this.totalSubNavs; i++)
            this.navStates.push("out");
    }

    private resetNavs(index: number) {
        for(let i=0; i<this.navStates.length; i++)
            if(i!=index)
                this.navStates[i] = "out";
    }
}
