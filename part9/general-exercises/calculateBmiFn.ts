const calculateBmi = (h: number, m: number) => {
  const heightInMeters = h / 100;
  const bmi = m / heightInMeters ** 2;

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

export default calculateBmi;
