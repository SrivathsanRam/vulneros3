import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const availableLanguages = ["English", "Mandarin", "Malay", "Tamil","Sign Language"];

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
    <div className="container my-5">
  <h1 className="text-center mb-4">Select Your Preferred Languages</h1>
  <form>
    <div className="row">
      {availableLanguages.map((language) => (
        <div className="col-md-4 mb-4" key={language}>
          <div className="form-check elder-friendly-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={language}
              checked={selectedLanguages.includes(language)}
              onChange={() => handleLanguageChange(language)}
              style={{ transform: 'scale(1.5)' }} // Increase the size of the checkbox
            />
            <label className="form-check-label" htmlFor={language} style={{ fontSize: '1.25rem' }}>
              {language}
            </label>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mt-4">
      <button type="button" className="btn btn-primary btn-lg" onClick={handleNext}>
        Next
      </button>
    </div>
  </form>
</div>

  );
};

export default SelectLanguages;
