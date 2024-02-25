export interface StoryProps {
  self?: boolean;
  id: string;
  handleDelete: any;
  userImage: string;
  stories?: Array<any>;
  data:any
}

export interface Media {
  type: string;
  media?: File;
  id: string;
}
