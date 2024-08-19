import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
export function useInactivityLogout(){
    const advertise = ref('advertise here')
    const logoutTimer = ref(null);
    const inactivityLimit = 60 * 70; // 1minutes in milliseconds
    const router = useRouter();

    const startTimer = () => {
        logoutTimer.value = setTimeout(() => {
            logoutUser();
        }, inactivityLimit);
    };

    const resetTimer = () => {
        if (logoutTimer.value) {
            clearTimeout(logoutTimer.value);
        }
        startTimer();
    };

    const logoutUser = () => {
        clearTimeout(logoutTimer.value);
        advertise.value = 'You have reached the maximum limit'
        alert('You have reached the maximum limit')
        // Clear authentication tokens or session data
        // localStorage.removeItem('authToken'); // Example token key
        // sessionStorage.removeItem('authToken'); // Example token key
        // window.location ='/auth/login'
    };

    onMounted(() => {
        startTimer();
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keypress', resetTimer);
    });

    onBeforeUnmount(() => {
        if (logoutTimer.value) {
            clearTimeout(logoutTimer.value);
        }
        window.removeEventListener('mousemove', resetTimer);
        window.removeEventListener('keypress', resetTimer);
    });

    return {
        resetTimer,advertise // expose resetTimer in case you want to trigger it manually
    };

}