function useNavigation() {
  function navigatePage(pageHash: string) {
    window.location.hash = pageHash;
  }

  return {
    navigatePage,
  };
}

export { useNavigation };
