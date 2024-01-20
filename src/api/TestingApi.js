const DecksApi = (instance) => {
  return {
    createTest: async (deckSlug, testSettings) => {
      try {

        const questionSide = testSettings.questionSide.accessor != "-1" ? `/${testSettings.questionSide.accessor}` : "";

        const { data } = testSettings.isExam
          ? await instance.get(`/decks/create-exam/${deckSlug}${questionSide}`)
          : await instance.get(`/decks/create-test/${deckSlug}/${testSettings.cardsForTest}${questionSide}`);
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
        console.log(testSettings)
        const { data } = await instance.get(
          `/decks/create-quest/${deckSlug}/${testSettings.cardsForTest}/${testSettings.isQuestionsLimit ? testSettings.questionsLimit : 0}${testSettings.questionSide.accessor != "-1" ? `/${testSettings.questionSide.accessor}` : ``}`
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
