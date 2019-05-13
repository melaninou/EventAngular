import { ResponseStatus } from '../models/ResponseStatus';
import { User } from '../models/User';
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
  //creator: User;
  /*-------------------------Creator---------------------*/
  creatorUsername: string;
  creatorFirstName: string;
  creatorLastName: string;
  creatorEmail: string;
  creatorId: string;
}
