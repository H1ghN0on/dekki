import { useQuest, useTest } from "@/hooks/ExamModes";
import { useDeck } from "@/hooks";

import { useRoute } from "vue-router";

export default async function useExam(testSettings, examType) {
  let exam;

  const updateCardPreview = (item) => {
    const card = exam.answering.current.card.values.find((value) => value.field.name === item.name);
    return {
      ...item,
      value: card.value,
    };
  };

  const route = useRoute();
  const deckSlug = route.params.deckSlug;

  switch (examType) {
    case "test": {
      exam = await useTest(deckSlug);
      break;
    }
    case "quest": {
      exam = await useQuest(deckSlug);

      break;
    }
  }

  await exam.createExam(testSettings);

  const { getStructuredDeck } = useDeck(deckSlug);
  const { dbStructure } = await getStructuredDeck(deckSlug, updateCardPreview);

  exam.answeringWatcher(() => {
    dbStructure.front = dbStructure.front.map(updateCardPreview);
    dbStructure.back = dbStructure.back.map(updateCardPreview);
  });

  return {
    answering: exam.answering,
    dbStructure,
    onAnswer: exam.onAnswer,
  };
}
