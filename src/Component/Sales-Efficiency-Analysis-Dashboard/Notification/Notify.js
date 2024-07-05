import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Notify() {
  return NotificationManager.success('Chart-option is updated successfully!', 'Success');
}
