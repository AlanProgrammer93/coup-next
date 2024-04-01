import '@/styles/globals.css'
import store from '@/store'

import { Provider, useDispatch } from 'react-redux'

export default function App({ Component, pageProps }) {
  /* const dispatch = useDispatch();

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null

    await clientAxios.get('/auth/current-user', {
      headers: {
        token
      }
    })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        //dispatch(addUser(res.data.user));
        console.log(res);
      })
      .catch(err => {
        localStorage.removeItem('token')
        //dispatch(addUser(null));
        console.log(err);
      });
  } */
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
