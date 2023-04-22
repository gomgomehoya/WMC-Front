import {
  REQUEST_PRODUCT_LIST_BY_CATEGORY,
  REQUEST_PRODUCT_LIST_TO_SPRING,
  REQUEST_PRODUCT_ITEM_LIST_TO_SPRING,
  REQUEST_MAIN_PRODUCT_LIST_TO_SPRING,
  REQUEST_MOST_SOLD_PRODUCT_LIST,
} from './mutation-types';

// import mainRequest from '@/utility/axiosObject';
import mainRequest from '@/api/mainRequest';

export default {
  async fetchProductById(_, productId) {
    console.log('asdf');
    try {
      const response = await mainRequest.get(`/product/detail/`, {
        params: { productId },
      });
      return response.data;
    } catch (error) {
      console.error('에러났다:', error);
    }
  },
  requestCreateProductToSpring({}, payload) {
    const { name, description, price, stock, categoryId, fileNames } = payload;

    const productData = {
      name,
      description,
      price,
      stock,
      categoryId,
      fileNames,
    };

    return mainRequest
      .post('/product/register', productData)
      .then(() => {
        alert('상품 등록 성공!');
      })
      .catch(() => {
        alert('문제 발생!');
      });
  },

  requestProductListByCategory({ commit }, categoryId) {
    return mainRequest
      .get('/product/listByCategory', {
        params: { categoryId },
      })
      .then((res) => {
        commit(REQUEST_PRODUCT_LIST_BY_CATEGORY, res.data);
      });
  },
  requestProductListToSpring({ commit }) {
    return mainRequest.get('/product/list').then((res) => {
      commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data);
    });
  },
  requestProductItemListToSpring({ commit }) {
    return mainRequest.get('/product/list').then((res) => {
      commit(REQUEST_PRODUCT_ITEM_LIST_TO_SPRING, res.data);
    });
  },
  requestMainProductListToSpring({ commit }) {
    return mainRequest.get('/product/list').then((res) => {
      commit(REQUEST_MAIN_PRODUCT_LIST_TO_SPRING, res.data);
    });
  },
  requestMostSoldProductListToSpring({ commit }) {
    return mainRequest.get('/product/mostsoldlist').then((res) => {
      commit(REQUEST_MOST_SOLD_PRODUCT_LIST, res.data);
    });
  },
};
