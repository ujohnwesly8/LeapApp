import {StatusBar} from 'react-native';
import React from 'react';
import Ownerstack from './Ownerbottomtab/Ownerstack';
import {useSelector} from 'react-redux';
import MyStack from './Userbottomtab/UserStack';
const OwnerNavigation = () => {
  const role = useSelector(state => state.Rolereducer.role);
  console.log(role);
  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {role === 'OWNER' ? <Ownerstack /> : <MyStack />}
    </>
  );
};
export default OwnerNavigation;
