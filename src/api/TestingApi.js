const DecksApi = (instance) => {
  return {
    createTest: async (deckSlug, testSettings) => {
      try {
        const { data } = testSettings.isExam
          ? await instance.get(`/decks/create-exam/${deckSlug}/`)
          : await instance.get(`/decks/create-test/${deckSlug}/${testSettings.cardsForTest}`);
        if (!data) {
          return [{ message: "Unhandled" }, {}];
        }
        return [null, data];
      } catch (e) {
        return [e];
      }
    },

    createQuest: async (deckSlug, testSettings) => {
      try {
        const { data } = await instance.get(
          `/decks/create-quest/${deckSlug}/${testSettings.cardsForTest}/${
            testSettings.isQuestionsLimit ? testSettings.questionsLimit : 0
          }`
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
