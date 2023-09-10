export interface DrawerNotificationPropsModel {
  open: boolean;
  onClose: () => void;
}
export interface DataNotificationModel {
  id: number;
  identityId: number;
  title: string;
  content: string;
  isSeen: true;
  subject: string;
  redirectId: number;
  created: string;
}
