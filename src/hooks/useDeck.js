import axios from "axios";
import { useToast } from "vue-toastification";
export default function useDeck() {
  const toast = useToast();

  const getRawStructure = (structure) => {
    return [
      ...structure.front.map((item, index) => ({
        ...item,
        side: "front",
        position: index,
        type: item.type.accessor,
      })),
      ...structure.back.map((item, index) => ({
        ...item,
        side: "back",
        position: index,
        type: item.type.accessor,
      })),
    ];
  };

  const getStructuredDeck = async (deckSlug, toMap) => {
    const data = await axios.get(`/decks/get/${deckSlug}`).then((res) => {
      const { id, name, fields, cards } = res.data;
      const dbStructure = {
        front: fields
          .filter((item) => item.side === "front")
          .sort((a, b) => a.position > b.position)
          .map(toMap),
        back: fields
          .filter((item) => item.side === "back")
          .sort((a, b) => a.position > b.position)
          .map(toMap),
      };

      return { id, name, dbStructure, cards };
    });

    return data;
  };

  const getMyDecks = async () => {
    const data = await axios
      .get("/decks/get-my/")
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return data;
  };

  const addCardToDeck = async (data, deckSlug) => {
    if (!data.values.find((item) => item.value === "")) {
      const status = await axios
        .post(`/decks/add/`, { data, deck_slug: deckSlug })
        .then(() => {
          toast.success("Карточка добавлена!", {
            timeout: 2000,
          });
          return true;
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ошибка случилась!", {
            timeout: 2000,
          });
          return false;
        });
      return status;
    }
    return false;
  };

  return {
    getStructuredDeck,
    getMyDecks,
    addCardToDeck,
    getRawStructure,
  };
}
