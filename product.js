import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.1/vue.esm-browser.min.js'
const app = createApp({
  data(){
    return {
      tempProducts: [],
      products: [],
      checkUserStatus: '',
      apiUrl: 'https://ec-course-api.hexschool.io/v2'
    }
  },
  methods: {
    checkUser(){
      axios.post(`${this.apiUrl}/api/user/check`)
      .then((res)=>{
        // console.log(res);
        this.checkUserStatus = res.data.success;
        this.getProducts();

      })
      .catch((err)=>{
        // console.log(err);
        this.checkUserStatus = err.data.success;
        alert(err.data.message);
        location = 'login.html';
      })
    },
    getProducts(){
      axios.get(`${this.apiUrl}/api/leo535/admin/products`)
      .then((res)=>{
        // console.log(res.data);
        this.products = res.data.products;
      })
      .catch((err)=>{
        console.log(err.data);
      })
    }
  },
  mounted() {
    const mytoken = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
    axios.defaults.headers.common['Authorization'] = mytoken;
    this.checkUser();
  },
})
app.mount('#app')