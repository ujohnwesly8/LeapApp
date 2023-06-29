import * as api from '../src/constants/Apis';

describe('API', () => {
  it('should have the correct URL values', () => {
    expect(api.url).toBe('https://b7e0-106-51-70-135.ngrok-free.app/api/v1');
    expect(api.OwnerProductsUrl).toBe(`${api.url}/product/listOwnerProducts`);
    expect(api.UserProductsUrl).toBe(`${api.url}/product/list`);
    expect(api.AddAddressUrl).toBe(`${api.url}/address/add`);
    expect(api.EditItemsUrl).toBe(`${api.url}/product/listOwnerProducts`);
    expect(api.OwnerCategoryUrl).toBe(`${api.url}/category/list`);
    expect(api.checkoutApi).toBe(`${api.url}/order/create-checkout-session`);
    expect(api.CartGetApi).toBe(`${api.url}/cart/list`);
    expect(api.OrderGetApi).toBe(`${api.url}/order/list`);
    expect(api.cartUpdate).toBe(`${api.url}/cart/update`);
    expect(api.OwnerProductsUrlv2).toBe(`${api.url}/order/rentedProducts`);
    expect(api.OwnerProductsById).toBe(`${api.url}/product/listByProductId`);
    expect(api.AnalyticsUrl).toBe(`${api.url}/order/onClickDashboard`);
    expect(api.getdashboard).toBe(`${api.url}/order/dashboardOrderItems`);
    expect(api.Recentlyadded).toBe(`${api.url}/product/listInDesc`);
    expect(api.ProductsById).toBe(`${api.url}/product/listByProductId`);
    expect(api.QuantityApi).toBe(`${api.url}/cart/updateQuantity`);
    expect(api.FilterProduct).toBe(`${api.url}/product/filterProducts`);
    expect(api.pieChartUrl).toBe(
      `${api.url}/order/dashboardSubCategoriesAnalytics`,
    );
    expect(api.categoriesData).toBe(`${api.url}/subcategory/list`);
    expect(api.exportPdf).toBe(`${api.url}/order/exportPdf`);
    expect(api.categoriyPiechart).toBe(
      `${api.url}/order/dashboardCategoriesAnalytics`,
    );
    expect(api.Dashboardyearlydata).toBe(
      `${api.url}/order/onClickDashboardYearlyWiseData`,
    );
    expect(api.profileUpload).toBe(
      `${api.url}/user/updateProfilePicture?profileImageUrl`,
    );
  });
});
