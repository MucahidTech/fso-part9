interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExerciseHours: number[],
  target: number,
): ExerciseResult => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const average =
    dailyExerciseHours.reduce((sum, day) => sum + day, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target * 1.2) {
    rating = 3;
    ratingDescription = "excellent, you exceeded your target!";
  } else if (average >= target) {
    rating = 2;
    ratingDescription = "good, you met your target!";
  } else {
    rating = 1;
    ratingDescription = "not too bad but could be better";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (process.argv[1] === import.meta.filename) {
  const parseArguments = (
    args: string[],
  ): { target: number; dailyHours: number[] } => {
    if (args.length < 4) {
      throw new Error("Usage: npm run calculateExercises <target> <hours...>");
    }

    const target = Number(args[2]);
    if (isNaN(target)) {
      throw new Error("Target must be a number");
    }

    const dailyHours = args.slice(3).map((arg) => {
      const hours = Number(arg);
      if (isNaN(hours)) {
        throw new Error("All hours must be numbers");
      }
      return hours;
    });

    return { target, dailyHours };
  };

  try {
    const { target, dailyHours } = parseArguments(process.argv);
    const result = calculateExercises(dailyHours, target);
    console.log(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error:", error.message);
    }
  }
}
