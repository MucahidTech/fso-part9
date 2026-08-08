const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height > 2.5 ? height / 100 : height;
  const bmi: number = weight / heightInMeters ** 2;

  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal range";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error("Usage: npm run calculateBmi <height_in_cm> <weight_in_kg>");
  process.exit(1);
}

const height = Number(args[0]);
const weight = Number(args[1]);

if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
  console.error("Height and weight must be positive numbers.");
  process.exit(1);
}

console.log(calculateBmi(height, weight));
