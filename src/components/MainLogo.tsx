
import React from 'react';

const MainLogo = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-medieval text-6xl md:text-7xl text-white dark:text-chrono-gold drop-shadow-md">
        <span className="text-chrono-crimson dark:text-chrono-gold">C</span>hrono
        <span className="text-chrono-crimson dark:text-chrono-gold">C</span>onqueror
      </h1>
      <p className="font-script text-2xl md:text-3xl text-white dark:text-chrono-ivory mt-2">
        Rewrite History • Forge Your Legacy
      </p>
    </div>
  );
};

export default MainLogo;
