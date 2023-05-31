/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProducts} from '../../redux/slice/productSlice';
function Usemyrental() {
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const dispatch = useDispatch();
  const products = useSelector(state => state.products.data);
  console.log(JSON.stringify(products));
  return {products};
}
export default Usemyrental;
