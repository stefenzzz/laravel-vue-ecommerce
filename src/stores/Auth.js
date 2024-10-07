import { defineStore } from "pinia"
import axiosClient from '@/axios'


const state = ()=>{
    return {
        user:null,
        errors: {},
        isLoading: false,
    }
}

const actions = {

    /************************** Login *******************************/
    async login (formData){
        
        try{
            
            this.isLoading = true;
            const response = await axiosClient.post('/api/login', formData);
            
            localStorage.setItem('token', response.data.token);
            this.user = response.data.user;
            this.router.push({ name:'app.dashboard' });

        }catch(e){

            if(e.response){
                 
             if(e.response.status === 422 || e.response.status === 403) this.errors = e.response.data.errors ;

            }else{
                console.log(e);
            }

        }finally{
            this.isLoading = false;
        }
        
    },

    
    /************************** Logout *******************************/
     async logout(){

        try{

            const response = await axiosClient.post('api/logout');

            this.router.push({ name:'login' });
            
            localStorage.removeItem('token');
            this.user = null;
            
        }catch(e){

            console.log(e);
        }
    },

    
    /************************** get user *******************************/
    async getUser(){
        try{
            const response = await axiosClient.get('/api/user');
        
            this.user = response.data.user;
            
        }catch(e){
            console.log(e);
        }
    }
};

const useAuthStore = defineStore('authStore', {state, actions});

export default useAuthStore;