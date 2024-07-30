import calculateBmi from "./calculateBmiFn";

try {
  const args = process.argv.slice(2);

  if (args.length !== 2)
    throw new Error(
      "Please provide height and weight as command-line arguments."
    );

  const height = parseFloat(args[0]);
  const weight = parseFloat(args[1]);

  if (isNaN(height) || isNaN(weight) || weight < 1 || height < 1)
    throw new Error("Both height and weight should be valid numbers.");

  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
  process.exit(1);
}
