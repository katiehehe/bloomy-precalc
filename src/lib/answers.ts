export type AnswerRecord = {
  choice: number | null;
  firstTryCorrect: boolean | null;
  completed: boolean;
};

export function answerKey(slideId: string, questionIndex: number) {
  return `${slideId}:${questionIndex}`;
}

export function isFirstTry(record: AnswerRecord | undefined) {
  return record?.firstTryCorrect === true;
}
