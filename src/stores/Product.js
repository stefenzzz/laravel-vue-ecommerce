import axiosClient from "@/axios";
import { defineStore } from "pinia";


const state = ()=>{
    return{
        products:{},
        product:{},
        errors:{},
    }
}

const actions = {

    /************************* Get Prodcuts *****************************/
    async getProducts(formData = {}){

        try{
            formData.url = formData.url || '/api/products';
            this.products.isLoading = true;
            const response = await axiosClient.get(formData.url,{
                params: formData,
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = response.data;
            this.products = {
                data: data.data,
                links: data.meta?.links,
                page: data.meta.current_page,
                limit: data.meta.per_page,
                from: data.meta.from,
                to: data.meta.to,
                total: data.meta.total,
            }
        }catch(e){

            console.log(e);

        }finally{
            this.products.isLoading = false
        }

    },

    /************************* Get Single Prodcut *****************************/
    async getProduct(productId){

        try{
            
            this.product.isLoading = true;
            const response = await axiosClient.get(`/api/products/${productId}`);               

            this.product = response.data;
            
        }catch(e){

            console.log(e);

        }finally{
            this.product.isLoading = false;
        }

    },

        /************************* Get Single Prodcut *****************************/
    async storeProduct(product){

        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('image', product.image);
        formData.append('description', product.description);
        formData.append('published', product.published ? 1 : 0);
        formData.append('price', product.price);


        try{
            
            this.product.isLoading = true;
            const response = await axiosClient.post(`/api/products`, formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            });               
            
            // refresh the products in products table view
            this.getProducts();
            // remove errors
            this.errors = {};

            // return true to validate successs
            return true;
        }catch(e){

            if(e.response){
      
             if(e.response.status === 422 ) this.errors = e.response.data.errors ;

            }else{
                console.log(e);
            }

        }finally{
            this.product.isLoading = false;
        }

    },
    async updateProduct(product){

        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('image', product.image || '');
        formData.append('description', product.description);
        formData.append('published', product.published ? 1 : 0);
        formData.append('price', product.price);
        formData.append('_method', 'PUT');


        try{
            
            this.product.isLoading = true;
            const response = await axiosClient.post(`/api/products/${product.id}`, formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            });               
            
            // refresh the products in products table view
            this.getProducts();
            // remove errors
            this.errors = {};

            // return true to validate successs
            return true;
        }catch(e){

            if(e.response){

                
             if(e.response.status === 422 ) this.errors = e.response.data.errors ;


            }else{
                console.log(e);
            }

        }finally{
            this.product.isLoading = false;
        }

    },

    async deleteProduct(productId){

        const confirm = window.confirm(`Are you sure to delete product #${productId}`);
        if(!confirm) return;

        try{
            const response = await axiosClient.delete(`/api/products/${productId}`);

            // refresh products table view
            this.getProducts();
            
        }catch(e){
            console.log(e);
        }
    }
    


}




export const useProductStore = defineStore('productStore', { state, actions});
