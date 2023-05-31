import {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {Login} from '../../redux/actions/actions';
function Useformik() {
  const dispatch = useDispatch();

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

  // const handleLogin = () => {
  //   dispatch(Login(email, password));
  // };
  const handleLogin = async () => {
    try {
      await dispatch(Login(email, password));
      openModal();
    } catch (error) {}
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('');

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

  const handleEmailChange = (value: string) => {
    setEmail(value);
    formik.setFieldValue('email', value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    formik.setFieldValue('password', value);
  };

  // const handleBlur = (field: string) => {
  //   formik.setFieldTouched(field);
  // };
  const handleBlur = (field: string) => {
    formik.setFieldTouched(field);
  };
  // const openModal = () => {
  //   setShowModal(true);
  // };
  // const closeModal = () => {
  //   setShowModal(false);
  // };

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleBlur,
    openModal,
    closeModal,
    showModal,
    formik,
    passwordError,
    setPasswordError,
    handleLogin,
  };
}
export default Useformik;
