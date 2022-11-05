import { Api } from "@/api";
import { useToast } from "vue-toastification";
export default function useDeck() {
  const toast = useToast();

  const parseRawDeck = (rawDeck, toMap) => {
    const { id, name, fields, cards } = rawDeck;
    const dbStructure = {
      front: fields
        .filter((item) => item.side === "front")
        .sort((a, b) => a.position > b.position),
      back: fields
        .filter((item) => item.side === "back")
        .sort((a, b) => a.position > b.position),
    };
    if (toMap) {
      dbStructure.front = dbStructure.front.map(toMap);
      dbStructure.back = dbStructure.back.map(toMap);
    }

    return { id, name, dbStructure, cards };
  };

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

  const getDefaultDeck = (toMap) => {
    const defaultDeck = {
      id: -1,
      name: "",
      slug: "",
      cards: [],
      fields: [
        {
          fontSize: 24,
          name: "",
          position: 0,
          side: "front",
          type: "main",
          id: -1,
        },
        {
          fontSize: 24,
          name: "",
          position: 0,
          side: "back",
          type: "main",
          id: -1,
        },
      ],
    };
    return parseRawDeck(defaultDeck, toMap);
  };

  const getStructuredDeck = async (deckSlug, toMap) => {
    const [error, data] = await Api().getDeck(deckSlug);

    if (error) {
      console.log(error);
      toast.error("Ошибка случилась!", {
        timeout: 2000,
      });
    }

    return parseRawDeck(data, toMap);
  };

  const getMyDecks = async () => {
    const [error, data] = await Api().getMyDecks();
    if (error) {
      console.log(error);
      toast.error("Ошибка случилась!", {
        timeout: 2000,
      });
      return [];
    }
    return data;
  };

  const addCardToDeck = async (data, deckSlug) => {
    if (!data.values.find((item) => item.value === "")) {
      const [error, status] = await Api().addCardToDeck(data, deckSlug);

      if (error || !status) {
        console.log(error);
        toast.error(`Ошибка случилась : ${error.message}`, {
          timeout: 2000,
        });
        return false;
      }

      toast.success("Карточка добавлена!", {
        timeout: 2000,
      });
      return true;
    } else {
      toast.error(`Не все поля заполнены`, {
        timeout: 2000,
      });
      return false;
    }
  };

  return {
    getStructuredDeck,
    getMyDecks,
    addCardToDeck,
    getRawStructure,
    getDefaultDeck,
  };
}
