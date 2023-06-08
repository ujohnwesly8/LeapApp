import {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {Login} from '../../redux/actions/actions';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
function Useloginscreen() {
  const [showModal, setShowModal] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('');
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Enter valid email'),
    password: Yup.string()
      .min(8)
      .required('Please enter password')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Must contain * characters and uppercase letters',
      ),
  });

  const handleLogin = async () => {
    try {
      dispatch(Login(formik.values.email, formik.values.password));
      // openModal();
    } catch (error) {}
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: handleLogin,
  });
  return {
    openModal,
    closeModal,
    showModal,
    formik,
    passwordError,
    setPasswordError,
    handleLogin,
  };
}
export default Useloginscreen;
