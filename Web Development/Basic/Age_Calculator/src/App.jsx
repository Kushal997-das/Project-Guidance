import React from 'react'
import { useState } from 'react';
import { AgeCalculatorForm } from './components/AgeCalculatorForm'
import AgeResult from './components/AgeResult';
import Image from './assets/calendar.svg';


const App = () => {

    const [age, setAge] = useState(null);

    const calculateAge = (date) => {
        const birthDate = new Date(date);
        const age_in_diff_ms = Date.now() - birthDate.getTime();
        const ageDate = new Date(age_in_diff_ms);
        const years = ageDate.getUTCFullYear() - 1970;
        const months = ageDate.getUTCMonth();
        const days = ageDate.getUTCDate() - 1;
        setAge({years, months, days});
    };
    return (
      <>
      <div className='flex flex-col md:flex-row justify-end bg-slate-50'>
        <div className='self-center w-full md:w-1/2'>
          <h1 className='text-5xl font-bold tracking-wider my-12 text-center text-slate-600'>Age Calculator</h1>
          <h3 className='text-2xl text-center text-stone-400'>Enter your date of birth in the date picker and calculate your age with precision</h3>
          <AgeCalculatorForm calculateAge={calculateAge} />
          {age && <AgeResult age={age} />}
        </div>
        <img src={Image} alt='calendar' className='w-full md:w-1/2' />
      </div>
      <footer className='text-center text-stone-400 text-xl bg-slate-50'>&copy; Made with &hearts; by PRC</footer>
      </>
    )
};

export default App
