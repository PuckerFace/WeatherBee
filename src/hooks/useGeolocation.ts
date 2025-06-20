import type { Geolocationstate } from '@/api/type';

import React, { useEffect, useState } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState<Geolocationstate>({
    coordinates: null,
    error: null,
    isLoading: true,
  });
  //   const [error, setError] = React.useState<string | null>(null);

  const getLocation = () => {
    setLocation((prev) => ({ ...prev, isLoading: true }));
    if (!navigator.geolocation) {
      setLocation({
        coordinates: null,
        error: 'Geolocation is not supported by this browser.',
        isLoading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          coordinates: { lat: latitude, lon: longitude },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'User denied the request for Geolocation.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out.';
            break;

          default:
            errorMessage = 'An unknown error occurred.';
            break;
        }
        setLocation({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { ...location, getLocation };
}
