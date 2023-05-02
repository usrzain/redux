
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../Store/store';

const Chat = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state)
  const dispatch = useDispatch()

  console.log(isLoggedIn)

  const click = () => {
    axios.get('/alldaat')
      .then((res) => {
        console.log(res.data)
        dispatch(authActions.logout())
      })
  }

  const LogOut = () => {
    axios.get('/Logout')
      .then((res) => {
        if (res.status === 200) {
          dispatch(authActions.logout())
          navigate('/');
        }
      })
  }

  return (
    <>

      <div>  scsc</div>
      <button onClick={click}> click me </button>
      <button onClick={LogOut}> Log Out </button>

    </>

  )
}

export default Chat