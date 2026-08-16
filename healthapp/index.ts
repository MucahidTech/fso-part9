import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();
app.use(express.json());

interface ExerciseRequest {
  daily_exercises: number[];
  target: number;
}

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);
  return res.json({ height, weight, bmi });
});

app.post("/exercises", (req, res) => {
  const body = req.body as unknown as ExerciseRequest;
  const { daily_exercises, target } = body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const numbers = daily_exercises.map((n: unknown) => Number(n));
  if (numbers.some(isNaN) || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(numbers, Number(target));
  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
