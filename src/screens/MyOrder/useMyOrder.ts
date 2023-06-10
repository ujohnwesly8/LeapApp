import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {fetchOrderProducts} from '../../redux/slice/orderSlice';

interface Order {
  id: string;
  orderItems: any[];
}

interface RootState {
  OrderProducts: OrderProductsState;
}

interface OrderProductsState {
  data: Order[];
}

const useMyOrder = () => {
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();

  const orderData = useSelector((state: RootState) => state.OrderProducts.data);
  const OrderProducts = useSelector(
    (state: RootState) => state.OrderProducts.data,
  );
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(fetchOrderProducts());
    setRefreshing(false);
  };

  useEffect(() => {
    dispatch(fetchOrderProducts());
  }, [dispatch]);

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      setIsLoading(true);
      await dispatch(fetchOrderProducts());
      setIsLoading(false);
    };

    fetchOrderData();
  }, [dispatch]);

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  return {
    orderData,
    OrderProducts,
    showModal,
    refreshing,
    selectedOrder,
    isModalOpen,
    isLoading,
    onRefresh,
    openModal,
    closeModal,
  };
};

export default useMyOrder;
