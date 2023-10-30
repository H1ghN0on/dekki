import { Api } from "@/api";
import { reactive, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default function useTest(deckSlug) {
  const toast = useToast();
  const router = useRouter();

  const answering = reactive({
    questions: [],
    correct: [],
    wrong: [],
    current: null,
    currentNumber: 0,
    timeForNextQuestion: 2000,
    answerCreationLoading: false,
    examDeck: null,
    shouldRememberWrong: false,
  });

  const createExam = async (testSettings) => {
    const [error, data] = await Api().createQuest(deckSlug, testSettings);
    if (error) {
      toast.error("Попробуйте позже", {
        timeout: 2000,
      });
      router.push("/decks");
      return;
    }

    answering.questions = data;
    answering.current = data[answering.currentNumber];
    answering.current.answered = "";
    answering.currentNumber = 0;
    answering.shouldRememberWrong = testSettings.shouldRememberWrong;

    if (testSettings.shouldRememberWrong) {
      const [error, data] = await Api().copyDeckStructure(deckSlug, "Problems: " + deckSlug);
      if (error) {
        toast.error(`Ошибка случилась : ${error}`, {
          timeout: 2000,
        });
        router.push("/decks");
        return;
      }
      answering.examDeck = data;
    }
  };

  const onAnswer = (value) => {
    answering.current.answered = value;
    if (answering.current.answers.includes(value)) {
      answering.correct.push(answering.current.card);
    } else {
      answering.wrong.push(answering.current.card);
      if (answering.shouldRememberWrong) {
        Api().addCardToDeck(
          {
            values: answering.current.card.values.map((_value) => {
              const trueFieldId = answering.examDeck.fields.find(
                (field) => field.name == _value.field.name
              ).id;
              return {
                field_id: trueFieldId,
                value: _value.value,
              };
            }),
          },
          answering.examDeck.slug
        );
      }
    }
    setTimeout(async () => {
      if (answering.questions.length !== answering.currentNumber + 1) {
        answering.current = answering.questions[++answering.currentNumber];
        answering.current.answered = "";
      } else {
        answering.answerCreationLoading = true;
        await createExam();
        answering.answerCreationLoading = false;
      }
    }, answering.timeForNextQuestion);
  };

  const answeringWatcher = (watcher) => {
    return watch(answering, watcher);
  };

  return {
    createExam,
    answering,
    onAnswer,
    answeringWatcher,
  };
}
