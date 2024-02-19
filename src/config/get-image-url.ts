export const getImageUrl =  (src?: string): string => {
  // Prefix server endpoint
  return src ? process.env.NEXT_PUBLIC_BASE_URL + src : '';
}