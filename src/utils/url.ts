// Helper function to get location search - exported for testing
export const getLocationSearch = (): string => {
  return window.location.search;
};

// Helper function to reload page - exported for testing
export const reloadPage = (): void => {
  window.location.reload();
};

const getQueryParam = (param: string): string | null => {
  const searchParams = new URLSearchParams(getLocationSearch());

  return searchParams.get(param);
};

const getUserPageCodeParam = (): string | null => {
  return getQueryParam("code");
};

export { getQueryParam, getUserPageCodeParam };
