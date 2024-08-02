import { useState } from "react";
import { create } from "../services/diaryService";
import { DiaryEntryBase, Visibility, Weather, RadioOption } from "../types";

interface AddEntryProps {
  addDiary: (newDiaryEntry: DiaryEntryBase) => void;
}

const AddEntry = ({ addDiary }: AddEntryProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const visibilityOptions: RadioOption[] = Object.values(Visibility).map(
    (value) => ({
      value: value.toString(),
      label: value.charAt(0).toUpperCase() + value.slice(1),
    })
  );

  const weatherOptions: RadioOption[] = Object.values(Weather).map((value) => ({
    value: value.toString(),
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }));

  const notifyError = (message: string) => {
    setError(`Error: ${message}`);
    setTimeout(() => setError(null), 5000);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    try {
      const createdEntry = await create(newEntry);
      addDiary(createdEntry);

      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
    } catch (err) {
      if (err instanceof Error) {
        notifyError(err.message);
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            required
          />
        </div>
        <div>
          <fieldset>
            <legend>Visibility:</legend>
            <div className="radioContainer">
              {visibilityOptions.map((option) => (
                <div key={option.value}>
                  <input
                    type="radio"
                    id={option.value}
                    name="visibility"
                    value={option.value}
                    checked={visibility === option.value}
                    onChange={({ target }) => setVisibility(target.value)}
                  />
                  <label htmlFor={option.value}>{option.label}</label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend>Weather:</legend>
            <div className="radioContainer">
              {weatherOptions.map((option) => (
                <div key={option.value}>
                  <input
                    type="radio"
                    id={option.value}
                    name="weather"
                    value={option.value}
                    checked={weather === option.value}
                    onChange={({ target }) => setWeather(target.value)}
                  />
                  <label htmlFor={option.value}>{option.label}</label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
        <div>
          <label>Comment:</label>
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddEntry;
