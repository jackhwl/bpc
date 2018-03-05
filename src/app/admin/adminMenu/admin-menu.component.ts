import { Component, OnInit } from '@angular/core';
import { UserService, MenuService } from '../../core/services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './admin-menu.component.html',
    styleUrls:['./admin-menu.component.css']
})

export class AdminMenuComponent implements OnInit {
    theUser: string;

    constructor( private userSVC: UserService, private router: Router ) {}

    ngOnInit(): void {
        
        //this.theUser = this.userSVC.loggedInUser;
        //this.menuSVC.currentMenu = menu;
    }

    logout(){
        this.userSVC.logout();
        this.router.navigate(['']);
    }
 }