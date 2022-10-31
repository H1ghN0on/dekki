const DecksApi = (instance) => {
  return {
    getMyDecks: async () => {
      try {
        const { data } = await instance.get("/decks/get-my/");
        if (!data) {
          return [{ message: "Unhandled" }, []];
        }
        return [null, data];
      } catch (e) {
        return [e];
      }
    },

    getDeck: async (slug) => {
      try {
        const { data } = await instance.get(`/decks/get/${slug}`);
        if (!data) {
          return [{ message: "Unhandled" }, {}];
        }
        return [null, data];
      } catch (e) {
        return [e];
      }
    },

    addCardToDeck: async (card, deck_slug) => {
      try {
        const data = await instance.post(`/decks/add/`, {
          data: card,
          deck_slug,
        });

        if (!data.status) {
          return [{ message: "Проблема с базой данных" }, false];
        }
        return [null, true];
      } catch (e) {
        return [e, false];
      }
    },

    createDeck: async (name) => {
      try {
        const { data } = await instance.get(`/decks/add-new/${name}`);
        return [null, data];
      } catch (e) {
        return [e];
      }
    },

    updateDeckName: async (name, slug) => {
      try {
        const { data } = await instance.put(`/decks/update/${slug}/${name}/`);

        return [null, data];
      } catch (e) {
        return [e];
      }
    },

    updateDeckFields: async (structure, slug) => {
      try {
        await instance.post(`/decks/update/fields/`, {
          data: structure,
          deck_slug: slug,
        });
        return [null];
      } catch (e) {
        return [e];
      }
    },

    updateDeckCards: async (tableData, slug) => {
      try {
        await instance.post(`/decks/update/values/`, {
          data: tableData,
          deck_slug: slug,
        });
        return [null];
      } catch (e) {
        return [e];
      }
    },

    removeCards: async (cards) => {
      try {
        await instance.post("/decks/update/remove-cards/", {
          data: cards,
        });
        return [null];
      } catch (e) {
        return [e];
      }
    },

    removeDeck: async (slug) => {
      try {
        await instance.delete(`/decks/remove/${slug}`);
        return [null];
      } catch (e) {
        return [e];
      }
    },
  };
};

export default DecksApi;
