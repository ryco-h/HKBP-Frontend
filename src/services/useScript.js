import { useEffect } from 'react';

function useScript(url) {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;
    // script.crossOrigin = 'anonymous'
    script.defer = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;