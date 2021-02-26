import {MainMenuItem} from './main-menu-item.model';
import {Injectable} from '@angular/core';
import {Constants} from '../../../../../shared/Constants';
import {HelperFunctions} from '../../../../../shared/HelperFunctions';

@Injectable({
  providedIn: 'root'
})
export class MainMenu {

  public MainMenuItems: MainMenuItem[] = [
    /* Agent */
    {
      title: 'Overview',
      icon: 'fa fa-dashboard',
      active: false,
      groupTitle: false,
      sub: '',
      routing: '/agent/',
      externalLink: '',
      budge: '',
      budgeColor: '#f44236',
      userType: Constants.AGENT_USERTYPE,
      permissions: 0
    },
    {
      title: 'Sell',
      icon: 'fa fa-bank',
      active: false,
      groupTitle: false,
      sub: '',
      routing: '/agent/sell',
      externalLink: '',
      budge: '',
      budgeColor: '#f44236',
      userType: Constants.AGENT_USERTYPE,
      permissions: 0
    },
    {
      title: 'Fund Requests',
      icon: 'fa fa-money',
      active: false,
      groupTitle: false,
      sub: [
        {
          title: 'New',
          routing: '/agent/new-fund-request',
          permissions: [Constants.CAN_AGENT_REQUEST_FUND]
        },
        {
          title: 'History',
          routing: '/agent/fund-request-history',
          permissions: [Constants.CAN_AGENT_REQUEST_FUND]
        }
      ],
      routing: '',
      externalLink: '',
      budge: '',
      budgeColor: '#f44236',
      userType: Constants.AGENT_USERTYPE,
      permissions: 0
    },
    {
      title: 'My Wallet',
      icon: 'fa fa-window-maximize',
      active: false,
      groupTitle: false,
      sub: '',
      routing: '/agent/wallet',
      externalLink: '',
      budge: '',
      budgeColor: '#f44236',
      userType: Constants.AGENT_USERTYPE,
      permissions: 0
    },
    {
      title: 'Transactions History',
      icon: 'fa fa-history',
      active: false,
      groupTitle: false,
      sub: [
        {
          title: 'Transactions',
          routing: '/agent/transaction-history',
          permissions: 0
        }
      ],
      routing: '',
      externalLink: '',
      budge: '',
      budgeColor: '#f44236',
      userType: Constants.AGENT_USERTYPE,
      permissions: 0
    },
    {
      title: 'Users',
      icon: 'fa fa-users',
      active: false,
      groupTitle: false,
      sub: [
        {
          title: 'Create',
          routing: '/agent/create-user',
          permissions: [Constants.CAN_CREATE_AGENT, Constants.CAN_CREATE_SUB_SUPER_AGENT ]
        },
        {
          title: 'Manage',
          routing: '/agent/manage-user',
          permissions: [Constants.CAN_VIEW_SUPER_AGENT , Constants.CAN_UPDATE_AGENT ]
        },
      ],
      routing: '',
      externalLink: '',
      budge: '',
      budgeColor: '',
      userType: Constants.AGENT_USERTYPE,
      permissions: [Constants.CAN_CREATE_AGENT, Constants.CAN_CREATE_SUB_SUPER_AGENT]
    },
    {
      title: 'Help & Support',
      icon: 'fa fa-support',
      active: false,
      groupTitle: false,
      sub: '',
      routing: '/agent/support',
      externalLink: '',
      budge: '',
      budgeColor: '#f44236',
      userType: Constants.AGENT_USERTYPE,
      permissions: 0
    },


    /* Admin */
    {
      title: 'Main',
      icon: '',
      active: true,
      groupTitle : true,
      sub: '',
      routing: '',
      externalLink: '',
      budge: '',
      budgeColor: '',
      userType: Constants.ADMIN_USERTYPE,
      permissions: [Constants.CAN_DO_ALL, Constants.CAN_VIEW_TRANSACTIONS, Constants.CAN_VIEW_SYSTEM_REPORT]
    },

    {
      title: 'Dashboard',
      icon: 'fa fa-dashboard',
      active: false,
      groupTitle: false,
      sub: '',
      routing: '/admin/dashboard',
      externalLink: '',
      budge: '',
      budgeColor: '#f44236',
      userType: Constants.ADMIN_USERTYPE,
      permissions: [Constants.CAN_DO_ALL, Constants.CAN_VIEW_TRANSACTIONS, Constants.CAN_VIEW_SYSTEM_REPORT]
    },
    {
      title: 'Funding',
      icon: 'fa fa-money',
      active: false,
      groupTitle: false,
      sub: [
        {
          title: 'Quick Funding',
          routing: '/admin/quick-funding',
          permissions: [Constants.CAN_DO_ALL, Constants.CAN_FUND_AGENT, Constants.CAN_FUND_WALLET]
        },
        {
          title: 'Fund Agents',
          routing: '/admin/fund-agents',
          permissions: [Constants.CAN_DO_ALL, Constants.CAN_FUND_AGENT, Constants.CAN_FUND_WALLET]
        },
        {
          title: 'Fund Requests',
          routing: '/admin/fund-requests',
          permissions: [Constants.CAN_DO_ALL, Constants.CAN_FUND_AGENT, Constants.CAN_FUND_WALLET]
        },
        {
          title: 'Fund History',
          routing: '/admin/fund-history',
          permissions: [Constants.CAN_DO_ALL, Constants.CAN_FUND_AGENT, Constants.CAN_FUND_WALLET]
        },
      ],
      routing: '',
      externalLink: '',
      budge: '',
      budgeColor: '',
      userType: Constants.ADMIN_USERTYPE,
      permissions: [Constants.CAN_DO_ALL]
    },
  /*  {
      title: 'Audit',
      icon: 'fa fa-list-alt',
      active: false,
      groupTitle: false,
      sub: [
        {
          title: 'Commission Accounts',
          routing: '/admin/commission-accounts',
          permissions: [Constants.CAN_FUND_AGENT]
        }
      ],
      routing: '',
      externalLink: '',
      budge: '',
      budgeColor: '',
      userType: Constants.ADMIN_USERTYPE,
      permissions: [Constants.CAN_DO_ALL]
    },*/
    // {
    //   title: 'Payout Requests',
    //   icon: 'fa fa-credit-card',
    //   active: false,
    //   groupTitle: false,
    //   sub: '',
    //   routing: '/admin/payout-requests',
    //   externalLink: '',
    //   budge: '',
    //   budgeColor: '#f44236',
    //   userType: Constants.ADMIN_USERTYPE,
    //   permissions: [Constants.CAN_FUND_AGENT]
    // },
    {
      title: 'Transactions',
      icon: 'fa fa-exchange',
      active: false,
      groupTitle: false,
      sub: [
        {
          title: 'History',
          routing: '/admin/transactions',
          permissions: [Constants.CAN_DO_ALL, Constants.CAN_VIEW_TRANSACTIONS, Constants.CAN_VIEW_SYSTEM_REPORT]
        },
        {
          title: 'Wallet',
          routing: '/admin/wallet-transactions',
          permissions: [Constants.CAN_DO_ALL, Constants.CAN_VIEW_TRANSACTIONS, Constants.CAN_VIEW_SYSTEM_REPORT]
        },
        {
          title: 'Frozen Transactions',
          routing: '/admin/frozen-accounts',
          permissions: [Constants.CAN_DO_ALL, Constants.CAN_VIEW_TRANSACTIONS, Constants.CAN_VIEW_SYSTEM_REPORT]
        }
      ],
      routing: '',
      externalLink: '',
      budge: '',
      budgeColor: '',
      userType: Constants.ADMIN_USERTYPE,
      permissions: [Constants.CAN_DO_ALL, Constants.CAN_VIEW_TRANSACTIONS, Constants.CAN_VIEW_SYSTEM_REPORT]
    },
    {
      title: 'User Management',
      icon: '',
      active: false,
      groupTitle : true,
      sub: '',
      routing: '',
      externalLink: '',
      budge: '',
      budgeColor: '',
      userType: Constants.ADMIN_USERTYPE,
      permissions: [Constants.CAN_DO_ALL, Constants.CAN_CREATE_ADMIN, Constants.CAN_UPDATE_ADMIN, Constants.CAN_CREATE_AGENT ]
    },

    {
      title: 'Admins',
      icon: 'fa fa-user-secret',
      active: false,
      groupTitle: false,
      sub: [
        {
          title: 'Create',
          routing: '/admin/create-admin',
          permissions: [Constants.CAN_DO_ALL, Constants.CAN_CREATE_ADMIN]
        },
        {
          title: 'Manage',
          routing: '/admin/manage-admin',
          permissions: [Constants.CAN_DO_ALL, Constants.CAN_UPDATE_ADMIN]
        },
      ],
      routing: '',
      externalLink: '',
      budge: '',
      budgeColor: '',
      userType: Constants.ADMIN_USERTYPE,
      permissions: [Constants.CAN_DO_ALL]
    },
    {
      title: 'Users',
      icon: 'fa fa-users',
      active: false,
      groupTitle: false,
      sub: [
        {
          title: 'Create',
          routing: '/admin/create-user',
          permissions: [Constants.CAN_DO_ALL, Constants.CAN_CREATE_AGENT]
        },
        {
          title: 'Manage',
          routing: '/admin/manage-user',
          permissions: [Constants.CAN_DO_ALL, Constants.CAN_UPDATE_AGENT]
        },
      ],
      routing: '',
      externalLink: '',
      budge: '',
      budgeColor: '',
      userType: Constants.ADMIN_USERTYPE,
      permissions: [Constants.CAN_DO_ALL]
    },
    {
      title: 'Customers',
      icon: 'fa fa-users',
      active: false,
      groupTitle: false,
      sub: '',
      routing: '/admin/manage-customers',
      externalLink: '',
      budge: '',
      budgeColor: '#f44236',
      userType: Constants.ADMIN_USERTYPE,
      permissions: ''
    },
    {
      title: 'Reports',
      icon: '',
      active: false,
      groupTitle : true,
      sub: '',
      routing: '',
      externalLink: '',
      budge: '',
      budgeColor: '',
      userType: Constants.ADMIN_USERTYPE,
      permissions: [Constants.CAN_DO_ALL, Constants.CAN_VIEW_TRANSACTIONS]
    },
    {
      title: 'Settings',
      icon: '',
      active: false,
      groupTitle : true,
      sub: '',
      routing: '',
      externalLink: '',
      budge: '',
      budgeColor: '',
      userType: Constants.ADMIN_USERTYPE,
      permissions: [Constants.CAN_DO_ALL, Constants.CAN_SYSTEM_SETTINGS, Constants.CAN_CREATE_ROLE, Constants.CAN_UPDATE_ROLE]
    },

    {
      title: 'Role Management',
      icon: 'fa fa-sitemap',
      active: false,
      groupTitle: false,
      sub: [
        {
          title: 'Create Role',
          routing: '/admin/create-role',
          permissions: [Constants.CAN_DO_ALL, Constants.CAN_CREATE_ROLE]
        },
        {
          title: 'Manage Role',
          routing: '/admin/manage-role',
          permissions: [Constants.CAN_DO_ALL, Constants.CAN_UPDATE_ROLE]
        },
      ],
      routing: '',
      externalLink: '',
      budge: '',
      budgeColor: '',
      userType: Constants.ADMIN_USERTYPE,
      permissions: ''
    },
    {
      title: 'Manage Services',
      icon: 'fa fa-exchange',
      active: false,
      groupTitle: false,
      sub: '',
      routing: '/admin/manage-services',
      externalLink: '',
      budge: '',
      budgeColor: '#f44236',
      userType: Constants.ADMIN_USERTYPE,
      permissions: ''
    },
    {
      title: 'System Configuration',
      icon: 'fa fa-wrench',
      active: false,
      groupTitle: false,
      sub: [
        {
          title: 'Networks',
          routing: '/admin/manage-networks',
          permissions: [Constants.CAN_DO_ALL, Constants.CAN_SYSTEM_SETTINGS]
        },
      ],
      routing: '',
      externalLink: '',
      budge: '',
      budgeColor: '',
      userType: Constants.ADMIN_USERTYPE,
      permissions: [Constants.CAN_SYSTEM_SETTINGS]
    }

  ];

// Empty Array to construct the menu based on valid permissions

  public permissions: any[] = [];

  private MAINMENUITEMS: MainMenuItem[];
  private permissionValues: string[] = [];
  private user: any;
  private userType: string;


  constructor() {
  }

  private getPermissions(): any[] {
    const permissions: any[] = [];
    const userPermissions: any[] = [];
    this.user = JSON.parse(localStorage.getItem(Constants.PROFILE));
    this.userType = JSON.parse(localStorage.getItem(Constants.PROFILE)).userType;
    // get permissions from local storageconsole.log('get user permissions')
    // console.log(this.user.role.permissions[0].name);
    // console.log('usertype', this.userType);

    this.permissions = this.user.role.permissions.forEach((permission) => {
      permissions.push(permission.name);
    });
    return permissions;
  }

  private getMenuOptions(): void {
    const sidebarMenu: MainMenuItem[] = [];
    let counter = 0;
    let labels = 0;
    let menus = 0;
    let menuWithSubmenu = 0;
    // get permissions
    this.getPermissions();
    console.log('permissions');
    // loop through the menu items to construct
    for (const menu of this.MainMenuItems) {
      counter++;
      // labels with permissions that exists
      if ((!menu.permissions && menu.userType === this.userType)
        || (menu.groupTitle && HelperFunctions.isElementsExistsInArray(menu.permissions, this.getPermissions()))
        && menu.userType === this.userType) {
        sidebarMenu.push(menu);
        labels++;
      }
      // menu that has submenus && permissions exists
      else if (menu.sub  !==  '') {
        const newsub: any[] = [];
        for (const subItems of menu.sub) {
          if (HelperFunctions.isElementsExistsInArray(subItems.permissions, this.getPermissions()) && menu.userType === this.userType) {
            newsub.push(subItems);
          }
        }
        if (newsub.length > 0) {
          menu.sub = newsub;
          sidebarMenu.push(menu);
          menuWithSubmenu++;
        }
      }
      // menu without submenus && permissions exists
      else if ((!menu.permissions && menu.userType === this.userType)
        || ((menu.sub === '') && (HelperFunctions.isElementsExistsInArray(menu.permissions, this.getPermissions() ))
          && menu.userType === this.userType)) {
        sidebarMenu.push(menu);
        menus++;
      }
    }
    this.MAINMENUITEMS = sidebarMenu;
    // console.log('side bar menu starts');
    // console.log('counter ' + counter);
    // console.log('labels ' + labels);
    // console.log('menus ' + menus);
    // console.log('menu with submenu' + menu_with_submenu);
  }

  public getMainMenuItems(): any {
    this.getMenuOptions();
    return this.MAINMENUITEMS;
  }
}
