import {
  url,
  OwnerProductsUrl,
  UserProductsUrl,
  AddAddressUrl,
  EditItemsUrl,
  OwnerCategoryUrl,
  checkoutApi,
  CartGetApi,
  OrderGetApi,
  cartUpdate,
  OwnerProductsUrlv2,
  OwnerProductsById,
  AnalyticsUrl,
  getdashboard,
  Recentlyadded,
  ProductsById,
  QuantityApi,
  FilterProduct,
  pieChartUrl,
  categoriesData,
  exportPdf,
  categoriyPiechart,
  Dashboardyearlydata,
  profileUpload,
} from '../../../src/constants/Apis';

describe('APIs', () => {
  it('should have the correct value for "url"', () => {
    expect(url).toEqual('https://e230-106-51-70-135.ngrok-free.app/api/v1');
  });

  it('should have the correct value for "OwnerProductsUrl"', () => {
    expect(OwnerProductsUrl).toEqual(`${url}/product/listOwnerProducts`);
  });

  it('should have the correct value for "UserProductsUrl"', () => {
    expect(UserProductsUrl).toEqual(`${url}/product/list`);
  });

  it('should have the correct value for "AddAddressUrl"', () => {
    expect(AddAddressUrl).toEqual(`${url}/address/add`);
  });

  it('should have the correct value for "EditItemsUrl"', () => {
    expect(EditItemsUrl).toEqual(`${url}/product/listOwnerProducts`);
  });

  it('should have the correct value for "OwnerCategoryUrl"', () => {
    expect(OwnerCategoryUrl).toEqual(`${url}/category/list`);
  });

  it('should have the correct value for "checkoutApi"', () => {
    expect(checkoutApi).toEqual(`${url}/order/create-checkout-session`);
  });

  it('should have the correct value for "CartGetApi"', () => {
    expect(CartGetApi).toEqual(`${url}/cart/list`);
  });

  it('should have the correct value for "OrderGetApi"', () => {
    expect(OrderGetApi).toEqual(`${url}/order/list`);
  });

  it('should have the correct value for "cartUpdate"', () => {
    expect(cartUpdate).toEqual(`${url}/cart/update`);
  });

  it('should have the correct value for "OwnerProductsUrlv2"', () => {
    expect(OwnerProductsUrlv2).toEqual(`${url}/order/rentedProducts`);
  });

  it('should have the correct value for "OwnerProductsById"', () => {
    expect(OwnerProductsById).toEqual(`${url}/product/listByProductId`);
  });

  it('should have the correct value for "AnalyticsUrl"', () => {
    expect(AnalyticsUrl).toEqual(`${url}/order/onClickDashboard`);
  });

  it('should have the correct value for "getdashboard"', () => {
    expect(getdashboard).toEqual(`${url}/order/dashboardOrderItems`);
  });

  it('should have the correct value for "Recentlyadded"', () => {
    expect(Recentlyadded).toEqual(`${url}/product/listInDesc`);
  });

  it('should have the correct value for "ProductsById"', () => {
    expect(ProductsById).toEqual(`${url}/product/listByProductId`);
  });

  it('should have the correct value for "QuantityApi"', () => {
    expect(QuantityApi).toEqual(`${url}/cart/updateQuantity`);
  });

  it('should have the correct value for "FilterProduct"', () => {
    expect(FilterProduct).toEqual(`${url}/product/filterProducts`);
  });

  it('should have the correct value for "pieChartUrl"', () => {
    expect(pieChartUrl).toEqual(`${url}/order/dashboardSubCategoriesAnalytics`);
  });

  it('should have the correct value for "categoriesData"', () => {
    expect(categoriesData).toEqual(`${url}/subcategory/list`);
  });

  it('should have the correct value for "exportPdf"', () => {
    expect(exportPdf).toEqual(`${url}/order/exportPdf`);
  });

  it('should have the correct value for "categoriyPiechart"', () => {
    expect(categoriyPiechart).toEqual(
      `${url}/order/dashboardCategoriesAnalytics`,
    );
  });

  it('should have the correct value for "Dashboardyearlydata"', () => {
    expect(Dashboardyearlydata).toEqual(
      `${url}/order/onClickDashboardYearlyWiseData`,
    );
  });

  it('should have the correct value for "profileUpload"', () => {
    expect(profileUpload).toEqual(
      `${url}/user/updateProfilePicture?profileImageUrl`,
    );
  });
});
