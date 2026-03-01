function useNavigation() {
  function navigatePage(pageHash: string) {
    window.location.hash = pageHash;
  }
  function navigatePageWithoutHistory(pageHash: string) {
    window.location.replace(pageHash);
  }

  return {
    navigatePage,
    navigatePageWithoutHistory,
  };
}

export { useNavigation };
