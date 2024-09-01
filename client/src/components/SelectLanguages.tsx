import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const availableLanguages = ["English", "Mandarin", "Malay", "Tamil"];

const SelectLanguages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { nric } = location.state as { nric: string };

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]
    );
  };

  const handleNext = async () => {
    if (!selectedLanguages.length) {
      alert("Please select at least one language.");
      return;
    }

    try {
      const response = await fetch('/api/save_languages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nric,
          languages: selectedLanguages,
        }),
      });
      
      if (response.ok) {
        navigate('/select-mobility', { state: { nric } });
      } else {
        alert('Failed to save languages. Please try again.');
      }
    } catch (error) {
      console.error('Error saving languages:', error);
    }
  };

  return (
    <div>
      <h1>Select Your Preferred Languages</h1>
      {availableLanguages.map((language) => (
        <label key={language}>
          <input
            type="checkbox"
            checked={selectedLanguages.includes(language)}
            onChange={() => handleLanguageChange(language)}
          />
          {language}
        </label>
      ))}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default SelectLanguages;
