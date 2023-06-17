import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';



const useAxiosSecure = () => {
  const { logOut} = useAuth(); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  const axiosSecure = axios.create({
    baseURL: 'https://12th-assignment-server-side.vercel.app', 
  });

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {  
        config.headers.Authorization = `Bearer ${token}`;
      }
      setLoading(false)
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          
          console.log('Unauthorized axios')
          await logOut();
          navigate('/Login');
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate, axiosSecure]);

  return [axiosSecure];
};

export default useAxiosSecure;
