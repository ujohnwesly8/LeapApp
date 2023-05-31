import {useDispatch, useSelector} from 'react-redux';
import {Logout} from '../../redux/actions/actions';
const UseOwnerprofile = () => {
  const dispatch = useDispatch();
  const Name = useSelector(state => state.rootReducer.firstName);
  const email = useSelector(state => state.rootReducer.email);
  const phoneNumber = useSelector(state => state.rootReducer.phoneNumber);
  const lastName = useSelector(state => state.rootReducer.lastName);
  const submit = () => {
    dispatch(Logout());
  };
  console.log('firstName :', Name);
  console.log(email, phoneNumber, lastName);
  return {Name, email, phoneNumber, lastName, submit};
};
export default UseOwnerprofile;
