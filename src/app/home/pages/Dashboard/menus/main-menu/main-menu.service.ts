// import { Injectable } from '@angular/core';
//
// import { MainMenuItem } from './main-menu-item.model';
// import { MAINMENUITEMS } from './main-menu-items';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class MainMenuService {
//   getMainMenuItems(): Promise<MainMenuItem[]> {
//     return Promise.resolve(MAINMENUITEMS);
//   }
// }



import {Injectable} from '@angular/core';

import { MainMenuItem } from './main-menu-item.model';
import {MainMenu} from './mock-main-menu-items';

@Injectable({
  providedIn: 'root'
})
export class MainMenuService {
  constructor(private menu: MainMenu) {}
  getMainMenuItems(): Promise<MainMenuItem[]> {
    return Promise.resolve(this.menu.getMainMenuItems());
  }
}

