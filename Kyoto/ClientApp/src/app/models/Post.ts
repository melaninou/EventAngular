import { ResponseStatus } from '../models/ResponseStatus';
export interface Post {
  id: string;
  date: Date;
  location: string;
  groupId: string;
  heading: string;
  message: string;
  type: string;
  responseStatus: ResponseStatus;
  hasResponse: boolean;
  onDashboard: boolean;
}
