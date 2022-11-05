import axios from "axios";
import { reactive } from "vue";
import { watch } from "vue";

export default function useTest(deckSlug) {
  const testing = reactive({
    questions: [],
    correct: [],
    wrong: [],
    current: null,
    currentNumber: 0,
    timeForNextQuestion: 2500,
    testCreationLoading: false,
  });

  const createTest = async () => {
    const { data } = await axios(`/decks/create-test/${deckSlug}`);
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
