import { useLocation } from 'react-router-dom';

export default function BrandingHeader() {
  const location = useLocation();
  const showBranding = location.pathname !== '/';

  if (!showBranding) return null;

  return (
    <div className="branding-header">
      <span className="branding-text">Doctor Plus+</span>
    </div>
  );
}
