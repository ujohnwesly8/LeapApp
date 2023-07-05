import {useContext, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Login} from '../../redux/actions/actions';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {passwordValidation} from '../../constants/Regex';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import colors from '../../constants/colors';
import Styles from '../../constants/themeColors';
type RootStackParamList = {
  OtpScreen: undefined;
  SignupScreen: undefined;
};

const useLoginscreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('');
  const {colorScheme} = useContext(ColorSchemeContext);
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Enter valid email'),
    password: Yup.string()
      .min(8)
      .required('Please enter password')
      .matches(
        passwordValidation,
        'Must contain * characters and uppercase letters',
      ),
  });
  const handleLogin = async () => {
    try {
      await dispatch(Login(formik.values.email, formik.values.password));
    } catch (error) {
      openModal();
      console.log('error in login');
    }
  };
  const handleOtpScreen = () => {
    navigation.navigate('OtpScreen');
  };
  const handleSignUp = () => {
    navigation.navigate('SignupScreen');
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const placeholadercolor = () => {
    return colorScheme === 'dark' ? colors.Textinput : colors.black;
  };
  const Textcolor = () => {
    return colorScheme === 'dark' ? Styles.whitetext : Styles.blackText;
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
    placeholadercolor,
    Textcolor,
    closeModal,
    showModal,
    formik,
    passwordError,
    setPasswordError,
    handleLogin,
    colorScheme,
    handleOtpScreen,
    handleSignUp,
  };
};
export default useLoginscreen;
