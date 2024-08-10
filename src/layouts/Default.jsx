
import { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../pages/AxiosClient';

export const Default = () => {
  const { user, token, code, setUser, setToken, getUser, setKey } = useStateContext();
 
 /* if (!token) {
    return <Navigate to="/login" />
  }*/
  
  /*const onLogout = (ev) => {
    ev.preventDefault()
    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
        setKey(null)
      })
  }
  const onTest = (ev) => {
    ev.preventDefault()
    axiosClient.get('/test')
      .then(({data}) => {
        console.log(data)
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status == 500) {
          console.log(response.data.message);
        } else {
          console.log(response.data);
        }
      })
  }

  useEffect(() => {
    getUser()
  }, [])
*/
  return (
    <div>
      <Outlet />
    </div>
  )
}