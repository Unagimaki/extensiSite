import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from '../Input/Input';
import s from "./contacts.module.scss"
import { Button } from 'components/Button/Button';

interface FormData {
  value: string;
}

export const Contacts: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    value: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://example.com/api/yourEndpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddArtists = () => {

  }
  return (
    <div className={s.contacts}>
      <form className={s.form}>
        <Input onChange={handleInputChange} value={formData.value}/>
        <div className={s.buttonWrapper}>
          <Button variant='black' onClick={handleAddArtists} withArrowIcon />
        </div>
      </form>
    </div>
  )
}
