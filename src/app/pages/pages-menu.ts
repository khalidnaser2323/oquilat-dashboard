import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    link: '/pages/orders/list',
    title: 'طلبات الشراء',
    icon: 'settings-2-outline',
  },
  {
    link: '/pages/team/list',
    title: 'الفريق',
    icon: 'people-outline',
  },
  // {
  //   link: '/pages/areas/list',
  //   title: 'المناطق',
  //   icon: 'radio-button-off-outline',
  // },
  {
    link: '/pages/complaints/list',
    title: 'الشكاوي والمقترحات',
    icon: 'alert-triangle-outline',
  },
  {
    link: '/pages/questions/list',
    title: 'أسئلة العميل',
    icon: 'alert-triangle-outline',
  },
  {
    link: '/pages/faq/list',
    title: 'الاسئلة الشائعة',
    icon: 'question-mark-outline',
  },
  {
    link: '/pages/conversations/list',
    title: 'محادثات الواتس اب ',
    icon: 'message-circle-outline',
  },
];
