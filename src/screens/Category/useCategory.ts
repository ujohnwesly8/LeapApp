import {useState, useEffect} from 'react';
import axios from 'axios';
import {url} from '../../constants/Apis';

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${url}/category/list`)
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return {
    categories,
    loading,
  };
};

// import {useState, useEffect} from 'react';
// import axios from 'axios';
// import {url} from '../../constants/Apis';

// export function useCategory() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(`${url}/category/list`)
//       .then(response => {
//         setCategories(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, []);

//   return {
//     categories,
//     loading,
//   };
// }
