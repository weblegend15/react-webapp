import { createAction } from 'redux-actions';

// notification
export const NOTIFICATION_SHOW = 'layout/notification/show';
export const NOTIFICATION_HIDE = 'layout/notification/hide';

export const showNotification = createAction(NOTIFICATION_SHOW, (type, message) => ({
  type,
  message
}));
export const hideNotification = createAction(NOTIFICATION_HIDE);

// navdrawer
export const NAVDRAWER_SHOW = 'layout/navdrawer/show';
export const NAVDRAWER_HIDE = 'layout/navdrawer/hide';
export const NAVDRAWER_TOGGLE = 'layout/navdrawer/toggle';

export const showNavDrawer = createAction(NAVDRAWER_SHOW);
export const hideNavDrawer = createAction(NAVDRAWER_HIDE);
export const toggleNavDrawer = createAction(NAVDRAWER_TOGGLE);

export default {
  showNotification,
  hideNotification,
  showNavDrawer,
  hideNavDrawer,
  toggleNavDrawer
};