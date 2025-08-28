
'use client';

import { useEffect, useState } from 'react';

const padWithZero = (num: number) => num.toString().padStart(2, '0');

export const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeftString = '';
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        if (days > 0) {
            timeLeftString = `${days}d ${padWithZero(hours)}h ${padWithZero(minutes)}m`;
        } else if (hours > 0) {
            timeLeftString = `${padWithZero(hours)}:${padWithZero(minutes)}:${padWithZero(seconds)}`;
        } else {
            timeLeftString = `${padWithZero(minutes)}:${padWithZero(seconds)}`;
        }
        setIsEnded(false);
      } else {
        setIsEnded(true);
      }
      
      return timeLeftString;
    };
    
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const newTimeLeft = calculateTime-left();
      setTimeLeft(newTimeLeft);
      if (newTimeLeft === '') {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return { timeLeft, isEnded };
};
