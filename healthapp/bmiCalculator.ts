const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height > 2.5 ? height / 100 : height;
  const bmi: number = weight / heightInMeters ** 2;

  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal range";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

console.log(calculateBmi(180, 74));
