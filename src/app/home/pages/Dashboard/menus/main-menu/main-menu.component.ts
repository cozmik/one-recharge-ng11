import { Component, OnInit } from '@angular/core';

import { MainMenuItem } from './main-menu-item.model';
import { MainMenuService } from './main-menu.service';

@Component({
  selector: 'main-menu',
  templateUrl: 'main-menu.component.html',
  styleUrls: ['main-menu.component.scss'],
  providers: [MainMenuService]
})
export class MainMenuComponent implements OnInit{
  mainMenuItems: MainMenuItem[];

  constructor(public mainMenuService: MainMenuService) { }

  getMainMenuItems(): void {
    this.mainMenuService.getMainMenuItems().then(mainMenuItems => this.mainMenuItems = mainMenuItems);
  }

  ngOnInit(): void {
    this.getMainMenuItems();
  }

  toggle(event: Event, item: any, el: any): void {
    event.preventDefault();

    const items: any[] = el.mainMenuItems;

    if (item.active) {
      item.active = false;
    } else {
      items.forEach(item1 => {
        item1.active = false;
      });
      item.active = true;
    }
  }
}
