import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
// import {Alert} from 'react-native';
import axios from 'axios';
import {url} from '../../constants/Apis';
function Usesignup() {
  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required('Enter First Name'),
    lastName: Yup.string().required('Enter LastName'),
    email: Yup.string().email('Invalid email').required('Enter valid Email'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    password: Yup.string()
      .min(8)
      .required('Please enter password')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Must contain special characters and uppercase letters',
      ),
  });

  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setphoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const handleSignupfun = async () => {
    console.log('indrill');
    console.log(role);
    try {
      const response = await axios.post(`${url}/user/signup`, {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        role,
      });
      // Alert.alert('Signup Successful!');
      console.log(response.data);
      navigation.navigate('Login');
    } catch (error) {
      openModal();
      // Alert.alert('Signup Error!', error.message);
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: handleSignupfun,
  });
  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    formik.setFieldValue('firstName', value);
  };
  const handlephoneNumber = (value: string) => {
    setphoneNumber(value);
    formik.setFieldValue('phoneNumber', value);
  };
  const handleLastNameChange = (value: string) => {
    setLastName(value);
    formik.setFieldValue('lastName', value);
  };
  const handleEmailChange = (value: string) => {
    setEmail(value);
    formik.setFieldValue('email', value);
  };
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    formik.setFieldValue('password', value);
  };
  const handleBlur = (field: string) => {
    formik.setFieldTouched(field);
  };
  const handleRole = value => {
    setRole(value);
  };
  return {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    formik,
    role,
    openModal,
    closeModal,
    showModal,
    handleFirstNameChange,
    handlephoneNumber,
    handleLastNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleBlur,
    handleSignupfun,
    handleRole,
  };
}
export default Usesignup;
