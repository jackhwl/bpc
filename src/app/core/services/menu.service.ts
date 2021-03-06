import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Menu, Misc } from '../models';

@Injectable()

export class MenuService {
    topMenu: Menu[];
    subMenu: Menu[];
    currentMenu: Menu;
    currentSubMenu: Menu;
    misc: Misc;

    getTopNav(routeMenu: string, routeSubMenu: string = null){
        if (!this.topMenu) {
            let dbRef = firebase.database().ref('menu/').orderByChild('order');
            dbRef.once('value')
                .then((snapshot) => {
                    let tmp: string[] = [];
                    snapshot.forEach(function(childSnapshot){
                        let item = childSnapshot.val();
                        if (item.enable) tmp.push(childSnapshot.val());
                    })
                    this.topMenu = Object.keys(tmp).map(key => tmp[key]);
                    console.log(routeMenu);
                    if (routeMenu.toLowerCase() === 'admin') {
                        this.topMenu.forEach(m => {
                            this.getSubNav(m, null, false);
                        });
                    } else {
                        if (routeMenu.toLowerCase() === 'home' && this.topMenu[0].name.toLowerCase() !== 'home') routeMenu = this.topMenu[0].name.toLowerCase();                    
                        this.topMenu.forEach(m => {
                            if (m.name.toLowerCase() === routeMenu.toLowerCase().replace(/-/g, ' ')) {
                                this.currentMenu = m;
                                this.getSubNav(m, routeSubMenu, true);
                            } else {
                                this.getSubNav(m, routeSubMenu, false);
                            }
                        });
                    }
            });
        }
    } 

    getSubNav(menu: Menu, routeSubMenu: string = null, withContent: boolean = true) {
        if (!menu.items) {
          let dbRef = firebase.database().ref('subMenu/').child(menu.id).child('items').orderByChild('order');
          dbRef.once('value')
              .then((snapshot) => {
                  let tmp: string[] = [];
                  snapshot.forEach(function(childSnapshot){
                      let item = childSnapshot.val();
                      if (item.enable) tmp.push(childSnapshot.val());
                  })
                  menu.items = Object.keys(tmp).map(key => tmp[key]);
                  this.subMenu = menu.items;
                  if (withContent) {
                    this.currentSubMenu = routeSubMenu ? this.subMenu.find(m=>m.name.toLowerCase() === routeSubMenu.toLowerCase().replace(/-/g, ' ')) : this.subMenu[0];
                    this.getContent(this.currentSubMenu ? this.currentSubMenu : menu);
                  }
          });
        } else {
            this.subMenu = menu.items;
        }
    }

    getContent(menu: Menu){
        if (menu && !menu.content) {
            let contentRef = firebase.database().ref('content/').child(menu.id);
            contentRef.once('value')
                .then((snapshot) => {
                    let contents = snapshot.val();
                    menu.content = contents.content;
            });
        }
    }

    getMisc() {
        let contentRef = firebase.database().ref('misc/');
        contentRef.once('value')
            .then((snapshot) => {
                this.misc = snapshot.val();
            });
    }
  }

