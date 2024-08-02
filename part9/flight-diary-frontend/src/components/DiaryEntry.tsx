import { DiaryEntryBase } from "../types";

interface DiaryEntryProps {
  entry: DiaryEntryBase;
}

const DiaryEntry = ({ entry }: DiaryEntryProps) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>Visibility: {entry.visibility.toString()}</p>
      <p>Weather: {entry.weather.toString()}</p>
    </div>
  );
};

export default DiaryEntry;
