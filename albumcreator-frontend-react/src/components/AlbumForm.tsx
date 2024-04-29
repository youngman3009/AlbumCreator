import React, { useState } from 'react';
import { createAlbum } from '../services/api';

interface TrackFormProps {
  onSuccess?: () => void;
}

const TrackForm: React.FC<TrackFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      await createAlbum({ name });
      onSuccess?.(); 
    } catch (error) {
      setFormError('Error saving album. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formError && <p className="error">{formError}</p>}
      <label htmlFor="name">Album Name:</label>
      <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Create Album'}
      </button>
    </form>
  );
};

export default TrackForm;
