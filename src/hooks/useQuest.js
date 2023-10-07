import { Api } from "@/api";
import { reactive, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default function useTest(deckSlug) {
  const toast = useToast();
  const router = useRouter();

  const quest = reactive({
    questions: [],
    correct: [],
    wrong: [],
    current: null,
    currentNumber: 0,
    timeForNextQuestion: 2000,
    questCreationLoading: false,
    examDeck: null,
    shouldRememberWrong: false,
  });

  const createQuest = async (testSettings) => {
    const [error, data] = await Api().createQuest(deckSlug, testSettings);
    if (error) {
      toast.error("Попробуйте позже", {
        timeout: 2000,
      });
      router.push("/decks");
      return;
    }

    quest.questions = data;
    quest.current = data[quest.currentNumber];
    quest.current.answered = "";
    quest.currentNumber = 0;
    quest.shouldRememberWrong = testSettings.shouldRememberWrong;

    if (testSettings.shouldRememberWrong) {
      const [error, data] = await Api().copyDeckStructure(deckSlug, "Problems: " + deckSlug);
      if (error) {
        toast.error(`Ошибка случилась : ${error}`, {
          timeout: 2000,
        });
        router.push("/decks");
        return;
      }
      quest.examDeck = data;
    }
  };

  const onAnswer = (value) => {
    quest.current.answered = value;
    if (quest.current.answers.includes(value)) {
      quest.correct.push(quest.current.card);
    } else {
      quest.wrong.push(quest.current.card);
      if (quest.shouldRememberWrong) {
        Api().addCardToDeck(
          {
            values: quest.current.card.values.map((_value) => {
              const trueFieldId = quest.examDeck.fields.find(
                (field) => field.name == _value.field.name
              ).id;
              return {
                field_id: trueFieldId,
                value: _value.value,
              };
            }),
          },
          quest.examDeck.slug
        );
      }
    }
    setTimeout(async () => {
      if (quest.questions.length !== quest.currentNumber + 1) {
        quest.current = quest.questions[++quest.currentNumber];
        quest.current.answered = "";
      } else {
        quest.questCreationLoading = true;
        await createQuest();
        quest.questCreationLoading = false;
      }
    }, quest.timeForNextQuestion);
  };

  const questWatcher = (watcher) => {
    return watch(quest, watcher);
  };

  return {
    createQuest,
    quest,
    onAnswer,
    questWatcher,
  };
}
