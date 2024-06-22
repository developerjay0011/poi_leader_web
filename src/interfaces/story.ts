export interface StoryProps {
  self?: boolean;
  handleDelete: any;
  userImage: string;
  stories?: Array<any>;
  name: string;
  createddate: string
  other?: boolean
}

export interface Media {
  type: string;
  media?: File;
  id: string;
}
