import React, { useState, useEffect } from 'react';
import { FaMoon , FaSun} from 'react-icons/fa';
const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');
  
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
  
    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    };
  
    return (
      <div>
       
        {theme === 'dark' ? <button onClick={toggleTheme} className='btn btn-neutral btn-sm'><FaMoon></FaMoon>Dark Theme</button>:<button onClick={toggleTheme} className='btn btn-success btn-sm'><FaSun></FaSun>Light Theme</button> }
      </div>
    );
  };
  export default ThemeToggle;