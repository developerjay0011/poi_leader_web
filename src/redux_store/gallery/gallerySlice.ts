
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface GalleryDetails {
  id: string
  leaderid: string
  type: string
  media: string
  created_date: string
  saved_by: string

}
interface GalleryState {
  gallery: GalleryDetails[];
}

const initialState: GalleryState = {
  gallery: [],
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    storeGallery(state, action: PayloadAction<GalleryDetails[]>) {
      state.gallery = action.payload
    },
  },
});

export const galleryActions = gallerySlice.actions;
