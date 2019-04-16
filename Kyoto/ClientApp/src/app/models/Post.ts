import { ResponseStatus } from '../models/ResponseStatus';
export interface Post {
  id: string;
  time: string;
  date: string;
  location: string;
  groupId: string;
  heading: string;
  message: string;
  type: string;
  responseStatus: ResponseStatus;
  hasResponse: boolean;
}
