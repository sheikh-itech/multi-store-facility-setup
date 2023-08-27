import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsfSidebarService } from 'src/common/services/msf-sidebar-service';
import { UserService } from 'src/common/services/user-service';

@Component({
  selector: 'msf-header',
  templateUrl: './msf-header.html',
  styleUrls: ['./msf-header.css']
})
export class MsfHeader {

    username: string = "Hapheej";
    
    constructor(private sidebarService: MsfSidebarService, private route: Router) {

    }

    public headerToggle(): void{
        
        this.sidebarService.toggleView();
    }

    protected logOut(event: any): void {

        UserService.logOut();
        this.route.navigate(["login"]);
    }
}
