const DecksApi = (instance) => {
  return {
    createTest: async (deckSlug) => {
      try {
        const { data } = await instance.get(`/decks/create-test/${deckSlug}`);
        if (!data) {
          return [{ message: "Unhandled" }, {}];
        }
        return [null, data];
      } catch (e) {
        return [e];
      }
    },
  };
};

export default DecksApi;
