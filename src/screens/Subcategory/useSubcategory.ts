import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {url} from '../../constants/Apis';

type RootStackParamList = {
  CategoryProducts: {
    subcategoryId: string;
  };
};

interface Subcategory {
  id: string;
  name: string;
}

export const useSubcategory = <T>(categoryId: string) => {
  const [subcategories, setSubcategories] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchSubcategories = async () => {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${url}/subcategory/listbyid/${categoryId}`,
        config,
      );
      const subcategoriesData = response.data;
      setSubcategories(subcategoriesData);
      setLoading(false);
    };

    fetchSubcategories();
  }, [categoryId]);

  const handleSubcategoryPress = (subcategoryId: string) => {
    navigation.navigate('CategoryProducts', {
      subcategoryId: subcategoryId,
    });
  };

  return {
    subcategories,
    loading,
    handleSubcategoryPress,
  };
};

// import {useState, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import {useNavigation} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {url} from '../../constants/Apis';

// type RootStackParamList = {
//   CategoryProducts: {
//     subcategoryId: string;
//   };
// };

// interface Subcategory {
//   id: string;
//   name: string;
// }

// export function useSubcategory<T>(categoryId: string) {
//   const [subcategories, setSubcategories] = useState<T[]>([]);
//   const [loading, setLoading] = useState(true);

//   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

//   useEffect(() => {
//     const fetchSubcategories = async () => {
//       const token = await AsyncStorage.getItem('token');
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const response = await axios.get(
//         `${url}/subcategory/listbyid/${categoryId}`,
//         config,
//       );
//       const subcategoriesData = response.data;
//       setSubcategories(subcategoriesData);
//       setLoading(false);
//     };

//     fetchSubcategories();
//   }, [categoryId]);

//   const handleSubcategoryPress = (subcategoryId: string) => {
//     navigation.navigate('CategoryProducts', {
//       subcategoryId: subcategoryId,
//     });
//   };

//   return {
//     subcategories,
//     loading,
//     handleSubcategoryPress,
//   };
// }
