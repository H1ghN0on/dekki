import { Api } from "@/api";
import { reactive, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default function useTest(deckSlug, isExam = false) {
  const toast = useToast();
  const router = useRouter();

  const testing = reactive({
    questions: [],
    correct: [],
    wrong: [],
    current: null,
    currentNumber: 0,
    timeForNextQuestion: 2000,
    testCreationLoading: false,
    examDeck: null,
  });

  const createTest = async (testSettings) => {
    const [error, data] = await Api().createTest(deckSlug, testSettings);
    if (error) {
      toast.error("Попробуйте позже", {
        timeout: 2000,
      });
      router.push("/decks");
      return;
    }
    testing.questions = data;
    testing.current = data[testing.currentNumber];
    testing.current.answered = "";
    testing.currentNumber = 0;

    if (isExam) {
      const [error, data] = await Api().copyDeckStructure(deckSlug, "Problems: " + deckSlug);
      if (error) {
        toast.error(`Ошибка случилась : ${error}`, {
          timeout: 2000,
        });
        router.push("/decks");
        return;
      }
      testing.examDeck = data;
    }
  };

  const onAnswer = (value) => {
    testing.current.answered = value;
    if (testing.current.correct_answer === value) {
      testing.correct.push(testing.current.card);
    } else {
      testing.wrong.push(testing.current.card);
      if (isExam) {
        Api().addCardToDeck(
          {
            values: testing.current.card.values.map((_value) => {
              const trueFieldId = testing.examDeck.fields.find(
                (field) => field.name == _value.field.name
              ).id;
              return {
                field_id: trueFieldId,
                value: _value.value,
              };
            }),
          },
          testing.examDeck.slug
        );
      }
    }
    setTimeout(async () => {
      if (testing.questions.length !== testing.currentNumber + 1) {
        testing.current = testing.questions[++testing.currentNumber];
        testing.current.answered = "";
      } else {
        testing.testCreationLoading = true;
        await createTest();
        testing.testCreationLoading = false;
      }
    }, testing.timeForNextQuestion);
  };

  const testingWatcher = (watcher) => {
    return watch(testing, watcher);
  };

  return {
    createTest,
    testing,
    onAnswer,
    testingWatcher,
  };
}
