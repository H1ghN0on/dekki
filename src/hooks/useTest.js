import axios from "axios";
import { reactive } from "vue";
import { watch } from "vue";

export default function useTest(deckSlug) {
  const testing = reactive({
    questions: [],
    correctNumber: 0,
    wrongNumber: 0,
    current: null,
    currentNumber: 0,
    timeForNextQuestion: 3500,
  });

  const createTest = async () => {
    const { data } = await axios(`/decks/create-test/${deckSlug}`);
    testing.questions = data;
    testing.current = data[testing.currentNumber];
    testing.current.isAnswered = "";
  };

  const onAnswer = (value) => {
    setTimeout(() => {
      testing.current = testing.questions[++testing.currentNumber];
      testing.current.answered = "";
    }, testing.timeForNextQuestion);

    testing.current.answered = value;
    if (testing.current.correct_answer === value) {
      testing.correctNumber++;
    } else {
      testing.wrongNumber++;
    }
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
