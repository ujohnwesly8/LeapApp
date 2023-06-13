import {useState, useEffect, useContext} from 'react';
import {useDispatch} from 'react-redux';
import {postProductToAPI} from '../../redux/actions/actions';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import ApiService from '../../network/network';
import {url} from '../../constants/Apis';

const useCategoryProducts = (subcategoryId: number) => {
  const dispatch = useDispatch();
  const [subcategories, setSubcategories] = useState([]);
  const [wishlistList, setWishlistList] = useState<number[]>([]);
  const {colorScheme} = useContext(ColorSchemeContext);

  useEffect(() => {
    const fetchSubcategories = async () => {
      const response = await ApiService.get(
        `${url}/product/listBySubcategoryId/${subcategoryId}`,
      );
      const subcategoriesData = response;
      setSubcategories(subcategoriesData);
    };

    fetchSubcategories();
  }, [subcategoryId]);

  const toggleWishlist = (itemId: number) => {
    if (wishlistList.includes(itemId)) {
      setWishlistList(wishlistList.filter(id => id !== itemId));
    } else {
      setWishlistList([...wishlistList, itemId]);
      const selectedItem = subcategories.find(
        (item: any) => item.id === itemId,
      );
      if (selectedItem) {
        dispatch(postProductToAPI(selectedItem) as any);
      }
    }
  };

  return {
    subcategories,
    wishlistList,
    colorScheme,
    toggleWishlist,
  };
};

export default useCategoryProducts;
