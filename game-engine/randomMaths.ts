export type Sign = "+" | "-" | "*" | "/";
export type FirstStepResult = {
  sign: Sign;
  first: number;
  second: number;
  answer: number;
};
export type PossibleAnswer = {
  id: number;
  answer: number;
  isCorrect: boolean;
};

export type Question = {
  sign: Sign;
  first_number: number;
  second_number: number;
  question: string;
  possibleAnswers: PossibleAnswer[];
};

async function shuffleArray(array: PossibleAnswer[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const round = (n: number, dp: number) => {
  const h = +"1".padEnd(dp + 1, "0"); // 10 or 100 or 1000 or etc
  return Math.round(n * h) / h;
};

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomQuestion = async () => {
  let isValid = false;
  let question: FirstStepResult | undefined;
  while (!isValid) {
    const first = randomNumber(10, 40);
    const second = randomNumber(0, 10);

    // result for + - * /
    const sum = first + second;
    const sub = first - second;
    const multiply = first * second;
    const division = first / second;

    // create an array to be picked randomly
    const firstStepResults: FirstStepResult[] = [
      {
        sign: "+",
        first,
        second,
        answer: sum,
      },
      {
        sign: "-",
        first,
        second,
        answer: sub,
      },
      {
        sign: "*",
        first,
        second,
        answer: multiply,
      },
      {
        sign: "/",
        first,
        second,
        answer: division,
      },
    ];

    // get Random Element from firstStepResults
    const randomQuestion: FirstStepResult =
      firstStepResults[Math.floor(Math.random() * firstStepResults.length)];

    const { answer } = randomQuestion;

    if (answer !== 0) {
      question = randomQuestion;
      isValid = true;
    }
  }
  return question;
};

const getDifferentPossibleAnswers = async (answer: number) => {
  // range for possible answers
  const min = answer - 5;
  const max = answer + 5;

  let firstPossibleAnswer = randomNumber(min, max);
  let secondPossibleAnswer = randomNumber(min, max);

  // getting the different options : possible answers
  let isAnswerSame = true;
  if (
    firstPossibleAnswer !== secondPossibleAnswer &&
    firstPossibleAnswer !== answer &&
    secondPossibleAnswer !== answer
  ) {
    isAnswerSame = false;
    const possibleAnswers: PossibleAnswer[] = [
      { id: 1, answer: round(firstPossibleAnswer, 3), isCorrect: false },
      { id: 2, answer: round(secondPossibleAnswer, 3), isCorrect: false },
      { id: 3, answer: round(answer, 3), isCorrect: true },
    ];
    return possibleAnswers;
  }
  while (isAnswerSame) {
    const first = randomNumber(min, max);
    const second = randomNumber(min, max);
    if (first !== second && first !== answer && second !== answer) {
      firstPossibleAnswer = first;
      secondPossibleAnswer = second;
      isAnswerSame = false;
    }
  }
  const possibleAnswers: PossibleAnswer[] = [
    { id: 1, answer: round(firstPossibleAnswer, 3), isCorrect: false },
    { id: 2, answer: round(secondPossibleAnswer, 3), isCorrect: false },
    { id: 3, answer: round(answer, 3), isCorrect: true },
  ];
  return possibleAnswers;
};

export const generateReadyQuestion = async () => {
  const question = await generateRandomQuestion();
  if (!question) return { error: "Something went wrong!" };

  const { sign, first, second, answer } = question;

  const possibleAnswers = await getDifferentPossibleAnswers(answer);

  await shuffleArray(possibleAnswers);

  const questionString = `${first} ${sign} ${second}`;

  const readyMadeQuestion: Question = {
    sign,
    first_number: first,
    second_number: second,
    question: questionString,
    possibleAnswers,
  };
  return readyMadeQuestion;
};
