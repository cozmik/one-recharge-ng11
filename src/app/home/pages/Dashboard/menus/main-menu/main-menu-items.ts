import { MainMenuItem } from './main-menu-item.model';
import { Constants } from '../../../../../shared/Constants';

export const MAINMENUITEMS: MainMenuItem[] = [
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
      permissions: 0
    },

    {
      title: 'System Activity',
        icon: 'fa fa-desktop',
      active: false,
      groupTitle: false,
      sub: '',
      routing: '/admin/sctivities',
      externalLink: '',
      budge: '',
      budgeColor: '#f44236',
      userType: Constants.ADMIN_USERTYPE,
      permissions: [Constants.CAN_VIEW_SYSTEM_REPORT]
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
      permissions: [Constants.CAN_SYSTEM_SETTINGS, Constants.CAN_CREATE_ROLE, Constants.CAN_UPDATE_ROLE]
    }
];

