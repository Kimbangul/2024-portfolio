'use client';
import { getKoreaTime } from '@/utils';
import { useEffect, useMemo, useRef, useState } from 'react';

export const getFormattedTime = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  } else {
    return `${time}`;
  }
};

const useTime = () => {
  const timer = useRef<NodeJS.Timeout>();
  const [hour, setHour] = useState(getKoreaTime().hour);
  const [min, setMin] = useState(getKoreaTime().min);

  useEffect(() => {
    timer.current = setInterval(() => {
      setHour(getKoreaTime().hour);
      setMin(getKoreaTime().min);
    }, 1000);
    return () => clearInterval(timer.current);
  });

  const amPm = useMemo(() => {
    if (hour >= 12) return 'PM';
    else return 'AM';
  }, [hour]);

  const formattedHour = useMemo(() => (hour <= 12 ? hour : hour - 12), [hour]);

  return { hour, min, amPm, formattedHour };
};

export default useTime;
