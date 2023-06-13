import {useContext} from 'react';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

type Props = {
  route: {params: {product: any}};
  navigation: any;
};

const useOProductDetails = ({route, navigation}: Props) => {
  const {product} = route.params;
  const {colorScheme} = useContext(ColorSchemeContext);

  const goBack = () => {
    navigation.goBack();
  };

  return {product, colorScheme, goBack};
};

export default useOProductDetails;
