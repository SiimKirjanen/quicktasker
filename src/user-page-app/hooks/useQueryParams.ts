const useQueryParams = () => {
  const getQueryParam = (param: string): string | null => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
  };

  return {
    getQueryParam,
  };
};

export default useQueryParams;
