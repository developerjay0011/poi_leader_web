export interface StoryProps {
  self?: boolean;
  handleDelete: any;
  userImage: string;
  stories?: Array<any>;
  name: string;
  createddate: string
}

export interface Media {
  type: string;
  media?: File;
  id: string;
}
