import { Component, OnInit } from '@angular/core';
import {MainMenuService} from '../../main-menu.service';
import {MainMenuItem} from '../../main-menu-item.model';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items-setup.component.html',
  styleUrls: ['./menu-items-setup.component.scss'],
  providers: [MainMenuService]
})
export class MenuItemsComponent implements OnInit {
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
