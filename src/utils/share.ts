export function getShareableUrl(propertyId: string, type: 'rent' | 'sell'): string {
  const baseUrl = import.meta.env.PROD 
    ? 'https://homematesapp.netlify.app'
    : window.location.origin;

  // Always use 'rent' for rent listings and 'buy' for sell listings
  const path = type === 'rent' ? 'rent' : 'buy';
  return `${baseUrl}/${path}/${propertyId}`;
}
