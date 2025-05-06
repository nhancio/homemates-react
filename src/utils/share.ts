export function getShareableUrl(propertyId: string, type: 'rent' | 'sell'): string {
  // Get the base URL - in production this would be your domain
  const baseUrl = import.meta.env.PROD 
    ? 'https://homematesapp.netlify.app'  // Remove extra https:// and trailing slash
    : window.location.origin;

  // Generate the path based on listing type and ensure single slashes
  const path = type === 'rent' ? 'rent' : 'buy'; // Change to match your routes
  
  return `${baseUrl}/${path}/property/${propertyId}`.replace(/([^:]\/)\/+/g, '$1'); // Clean up double slashes
}
