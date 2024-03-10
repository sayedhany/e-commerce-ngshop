import { Component, OnInit } from '@angular/core';
import { AuthService } from '@cairo/users';

@Component({
    selector: 'admin-sidebarr',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    constructor(private authSrv: AuthService) {}

    ngOnInit(): void {}
    logout() {
        this.authSrv.logout();
    }
}
