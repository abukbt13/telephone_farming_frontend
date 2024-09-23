import axios from "axios";
import {auth} from "@/compossables/auth.js";
import {ref} from "vue";
const { base_url,storage,authUser, authHeader, multipartHeader} = auth();
const searched_videos =ref('')
const searched_results =ref(false)
export function youtube () {
    const searchVideo = async (data) =>{
        const res= await axios.post(base_url.value+'v1/youtube/search',data);
        if(res.data.status === 'success'){
            searched_results.value = true;
            searched_videos.value =res.data.videos;
        }
        else {
            searched_results.value = false;
        }

    }
    return {searchVideo , searched_videos, searched_results}
}