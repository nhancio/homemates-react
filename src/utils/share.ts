export function getShareableUrl(propertyId: string, type: 'rent' | 'sell'): string {
  // Get the base URL - in production this would be your domain
  const baseUrl = import.meta.env.PROD 
    ? 'https://https://homematesapp.netlify.app/'  // Replace with your production domain
    : window.location.origin;

  // Generate the path based on listing type
  const path = type === 'rent' ? 'r' : 's';
  
  return `${baseUrl}/${path}/${propertyId}`;
}
