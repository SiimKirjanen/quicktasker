const getQueryParam = (param: string): string | null => {
  const searchParams = new URLSearchParams(window.location.search);

  return searchParams.get(param);
};

const getUserPageCodeParam = (): string | null => {
  return getQueryParam("code");
};

export { getQueryParam, getUserPageCodeParam };
