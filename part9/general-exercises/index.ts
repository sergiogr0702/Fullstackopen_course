import express from "express";
import calculateBmi from "./calculateBmiFn";
import { calculateExercises, exerciseReturn } from "./exerciseCalculatorFn";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res.status(400).send({ error: "missing query parameters" });
  }

  const { height, weight } = req.query;

  try {
    const heightNum = Number(height);
    const weightNum = Number(weight);

    if (
      isNaN(heightNum) ||
      isNaN(weightNum) ||
      weightNum < 1 ||
      heightNum < 1
    ) {
      return res.status(400).send({ error: "malformed parameters" });
    }

    const bmi = calculateBmi(heightNum, weightNum);

    return res.status(200).send({
      weight,
      height,
      bmi,
    });
  } catch (error: unknown) {
    console.error(error);
    return res.status(400).send({ error: "malformed parameters" });
  }
});

app.get("/exercises", (req, res) => {
  if (!req.body.target || !req.body.daily_exercises) {
    return res.status(400).send({ error: "missing parameters" });
  }

  const { target, daily_exercises } = req.body;

  const targetNum = Number(target);
  if (isNaN(targetNum) || targetNum <= 0) {
    return res.status(400).send({ error: "malformed parameters" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((ex) => typeof ex !== "number" || ex < 0)
  ) {
    return res.status(400).send({ error: "malformed parameters" });
  }

  const exercisesArray: number[] = daily_exercises.map((num) => Number(num));

  if (exercisesArray.length === 0) {
    return res.status(400).send({ error: "malformed parameters" });
  }

  if (!exercisesArray.some((num) => num > 0)) {
    return res.status(400).send({ error: "malformed parameters" });
  }

  try {
    const exercisesResult: exerciseReturn = calculateExercises(
      exercisesArray,
      targetNum
    );

    return res.status(200).send(exercisesResult);
  } catch (error: unknown) {
    console.error(error);
    return res.status(400).send({ error: "malformed parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
