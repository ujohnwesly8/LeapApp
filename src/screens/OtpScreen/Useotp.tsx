import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getOTP, submitOTP} from '../../redux/actions/actions';
function Useotp() {
  const [phoneNo, setphoneNo] = useState<string>('');
  const [otp, setotp] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const GETOTP = () => {
    dispatch(getOTP(phoneNo));
    openModal();
    console.log(phoneNo);
  };
  const handleLogin = () => {
    dispatch(submitOTP(phoneNo, otp));
    console.log(phoneNo, otp);
  };
  const handlephoneNumberChange = (value: string) => {
    setphoneNo(value);
  };
  const handlePasswordChange = (value: string) => {
    setotp(value);
  };
  return {
    phoneNo,
    otp,
    handlephoneNumberChange,
    handlePasswordChange,
    GETOTP,
    handleLogin,
    passwordError,
    showModal,
    openModal,
    closeModal,
    setPasswordError,
  };
}
export default Useotp;
