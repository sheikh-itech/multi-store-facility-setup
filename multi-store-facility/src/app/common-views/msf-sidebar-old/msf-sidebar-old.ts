import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'msf-sidebar-old',
  templateUrl: './msf-sidebar-old.html',
  styleUrls: ['./msf-sidebar-old.css']
})
export class MsfSidebarOld {

    constructor(@Inject(DOCUMENT) private doc: Document) {
        
    }

    onMenuItemClick(event: any) {

    const clickedElement = event.target as HTMLElement;
    let ele = clickedElement.closest("LI");

    if(!ele)
        return;

    ele.childNodes.forEach(node=>{
        if((node.nodeName=="UL" || node.nodeName=="OL") && (node instanceof HTMLElement)) {
            node.style.display = 
            (node.style.display=='none'||node.style.display.trim().length==0) ? 'block' : 'none';
            return;
        }
    })

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
}
