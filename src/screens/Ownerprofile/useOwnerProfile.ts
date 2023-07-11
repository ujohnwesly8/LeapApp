import {useDispatch, useSelector} from 'react-redux';
import {Logout} from '../../redux/actions/actions';
const UseOwnerprofile = () => {
  const dispatch = useDispatch();
  const Name = useSelector((state: any) => state.rootReducer.firstName);
  const email = useSelector((state: any) => state.rootReducer.email);
  const phoneNumber = useSelector(
    (state: any) => state.rootReducer.phoneNumber,
  );
  const lastName = useSelector((state: any) => state.rootReducer.lastName);
  const submit = () => {
    dispatch(Logout() as any);
  };
  console.log('firstName :', Name);
  console.log(email, phoneNumber, lastName);

  return {Name, email, phoneNumber, lastName, submit};
};
export default UseOwnerprofile;
