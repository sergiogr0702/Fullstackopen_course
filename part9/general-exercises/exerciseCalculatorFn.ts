export type exerciseReturn = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

export const calculateExercises = (
  exercisesArray: number[],
  averageObjective: number
): exerciseReturn => {
  const totalExercises = exercisesArray.reduce((acc, curr) => acc + curr, 0);
  const averageExercises = totalExercises / exercisesArray.length;
  const success = averageExercises >= averageObjective;
  let rating = 0;
  let ratingDescription = "";

  if (averageExercises > averageObjective) {
    rating = 3;
    ratingDescription = "Perfect";
  } else if (averageExercises >= averageObjective - 1) {
    rating = 2;
    ratingDescription = "Good";
  } else {
    rating = 1;
    ratingDescription = "Below average";
  }

  const returnObj: exerciseReturn = {
    periodLength: exercisesArray.length,
    trainingDays: exercisesArray.filter((x) => x > 0).length,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: averageObjective,
    average: averageExercises,
  };

  return returnObj;
};
