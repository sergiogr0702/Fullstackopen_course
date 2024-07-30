import { calculateExercises } from "./exerciseCalculatorFn";

try {
  const args = process.argv.slice(2);
  if (args.length < 2)
    throw new Error(
      "Please provide a target and at least one exercise day as command-line arguments."
    );

  const target = parseFloat(args[0]);
  const exercisesArray = args.slice(1).map((arg) => parseFloat(arg));

  if (isNaN(target) || target <= 0)
    throw new Error("Target should be a positive number greater than zero.");

  if (exercisesArray.some(isNaN) || exercisesArray.some((num) => num < 0))
    throw new Error("All exercise hours should be non-negative numbers.");

  if (!exercisesArray.some((num) => num > 0))
    throw new Error("There should be at least one non-zero exercise hour.");

  const result = calculateExercises(exercisesArray, target);
  console.log(result);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
  process.exit(1);
}
