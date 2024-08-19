import {onMounted, ref} from "vue";
import axios from "axios";
const currentUser = ref([])
export function auth(){
    const authHeader = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
    const multipartHeader = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // If you use authentication
        },
    }

    // const base_url = ref('https://farm.kwetunyumbani.store/api/')
    // const storage = ref('https://farm.kwetunyumbani.store/backend/public/')

    const base_url = ref(import.meta.env.VITE_APP_API_URL)
    const storage = ref(import.meta.env.VITE_APP_STORAGE_URL)

    const   authUser = async () => {
        try {
            const res= await axios.get(base_url.value+'user-auth', authHeader);
        } catch (error) {
            window.location.href = '/auth/login';
        }
    }
    const   AuthenticatedUser = async () => {
            const res= await axios.get(base_url.value+'user', authHeader);
            currentUser.value = res.data
    }


    return {
        authHeader,AuthenticatedUser,currentUser,authUser,multipartHeader,base_url,storage
    }
}