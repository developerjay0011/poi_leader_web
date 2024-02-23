export interface StoryProps {
  img: string;
  self?: boolean;
  id: string;
  handleDelete: any;
  userImage: string;
  stories?: Array<any>;
}

export interface Media {
  type: string;
  media?: File;
  id: string;
}
