import { Api } from "@/api";
import { reactive, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default function useTest(deckSlug) {
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
  });

  const createTest = async () => {
    const [error, data] = await Api().createTest(deckSlug);
    if (error) {
      console.log(error);
      toast.error("Попробуйте позже", {
        timeout: 2000,
      });
      router.push("/decks");
      return;
    }
    testing.questions = data;
    testing.current = data[testing.currentNumber];
    testing.current.isAnswered = "";
    testing.currentNumber = 0;
  };

  const onAnswer = (value) => {
    testing.current.answered = value;
    if (testing.current.correct_answer === value) {
      testing.correct.push(testing.current.card);
    } else {
      testing.wrong.push(testing.current.card);
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
