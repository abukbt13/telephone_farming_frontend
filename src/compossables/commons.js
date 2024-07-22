import axios from "axios";
import { ref } from "vue";
import { auth } from "@/compossables/auth.js";

const { base_url, storage, authUser, authHeader, multipartHeader } = auth();

export function commons() {
    // Initialize likeStatuses as an object
    const likeStatuses = ref({});

    const AddLike = async (postId) => {
        try {
            const res = await axios.get(base_url.value + 'v1/posts/' + postId + '/likes', authHeader);
            const message = res.data.message;

            // Format the response as { id: postId, message: message }
            const formattedResponse = { id: postId, message };

                likeStatuses.value = formattedResponse

        } catch (error) {
            console.error('Error liking the post:', error);
            // Format error message as { id: postId, message: "Error occurred" }
            const formattedResponse = { id: postId, message: 'Error occurred' };
            likeStatuses.value = formattedResponse
        }
    };

    return {
        AddLike,
        likeStatuses
    };
}
