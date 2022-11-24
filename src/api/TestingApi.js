const DecksApi = (instance) => {
  return {
    createTest: async (deckSlug, cardsNumber) => {
      try {
        const { data } = await instance.get(
          `/decks/create-test/${deckSlug}/${cardsNumber}`
        );
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
