import router from '@/router';
import { reactive, getCurrentInstance, watch, toRefs } from 'vue';

export const useRouter = () => {
    let vm: any;
    vm = getCurrentInstance()?.proxy;
    const state = reactive({
        route: vm.$route,
    });

    watch(
        () => vm.$route,
        (r) => {
            state.route = r;
        }
    );

    return { ...toRefs(state), router: vm.$router };

};