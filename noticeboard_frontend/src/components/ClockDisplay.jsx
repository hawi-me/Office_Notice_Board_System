import React, { useState, useEffect } from 'react';

function ClockDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value; // Add leading zero for single-digit values
  };

  const hours = formatTime(time.getHours());
  const minutes = formatTime(time.getMinutes());
  const seconds = formatTime(time.getSeconds());

  // Determine if it's working hours or lunch time
  const getTimePeriod = () => {
    const currentHour = time.getHours();
    const currentMinute = time.getMinutes();

    // Define working hours (e.g., 9 AM to 5 PM)
    const isWorkingHour = currentHour >= 9 && currentHour < 17;

    // Define lunch time (e.g., 12 PM to 1 PM)
    const isLunchTime = currentHour === 12 && currentMinute >= 0 && currentMinute < 60;

    if (isLunchTime) {
      return 'Lunch Time 🍴';
    } else if (isWorkingHour) {
      return 'Working Hour 💼';
    } else {
      return 'Non-Working Hour 😴';
    }
  };

  return (
    <div>
      <div className="flex items-start justify-center w-full gap-4 count-down-main">
        <div className="timer w-16">
          <div className="bg-blue-600 py-4 px-2 rounded-lg overflow-hidden">
            <h3 className="countdown-element hours font-Cormorant font-semibold text-2xl text-white text-center">
              {hours}
            </h3>
          </div>
          <p className="text-lg font-Cormorant font-normal text-white-900 mt-1 text-center w-full">
            hours
          </p>
        </div>
        <h3 className="font-manrope font-semibold text-2xl text-white-900">:</h3>
        <div className="timer w-16">
          <div className="bg-blue-600 py-4 px-2 rounded-lg overflow-hidden">
            <h3 className="countdown-element minutes font-Cormorant font-semibold text-2xl text-white text-center">
              {minutes}
            </h3>
          </div>
          <p className="text-lg font-Cormorant font-normal text-white-900 mt-1 text-center w-full">
            minutes
          </p>
        </div>
        <h3 className="font-manrope font-semibold text-2xl text-white-900">:</h3>
        <div className="timer w-16">
          <div className="bg-blue-600 py-4 px-2 rounded-lg overflow-hidden">
            <h3 className="countdown-element seconds font-Cormorant font-semibold text-2xl text-white text-center animate-countinsecond">
              {seconds}
            </h3>
          </div>
          <p className="text-lg font-Cormorant font-normal text-white-900 mt-1 text-center w-full">
            seconds
          </p>
        </div>
      </div>
      <div className="text-center mt-4">
        <h3 className="font-manrope font-semibold text-2xl text-white-900">
          {getTimePeriod()} {/* Display the time period */}
        </h3>
      </div>
    </div>
  );
}

export default ClockDisplay;