<script setup lang="ts">
import { type AdvisorItem } from '@/type';
import { computed, ref, type Ref, onMounted } from 'vue';
import AdvisorService from '@/services/AdvisorrService';
import AdvisorCard from '@/components/AdvisorCard.vue';
import NProgress from 'nprogress'
import { onBeforeRouteUpdate, useRouter, useRoute } from 'vue-router'
import type { AxiosResponse } from 'axios';
import { useAdvisorStore } from '@/stores/advisor';

const router = useRouter();
const route = useRoute();
const store = useAdvisorStore();
const advisors: Ref<Array<AdvisorItem>> = ref([])
const totalAdvisor = ref<number>(0)

const props = defineProps({
    page: {
        type: Number,
        required: true
    }
    ,
    limit: {
        type: Number,
        required: true
    }
})

const fetchAdvisors = () => {
    console.log(store.getAdvisors)
    advisors.value = store.getAdvisorByPage(6, props.page)
    totalAdvisor.value = store.getAdvisors.length 
};

onBeforeRouteUpdate((to, from, next) => {
    const toPage = to.query.page ? Number(to.query.page) : 1
    advisors.value = store.getAdvisorByPage(6, toPage)
    totalAdvisor.value = store.getAdvisors.length
    next()
});


const hasNextPage = computed(() => {
    const totalPages = Math.ceil(totalAdvisor.value / 6);
    return props.page < totalPages;
});

onMounted(() => {
    fetchAdvisors();
});

</script>

<template>
    <div class="my-5">
        <main class="flex flex-col items-center justify-center">

            <div class="-z-10 grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">

                <AdvisorCard v-for="advisor in advisors" :key="advisor.id" :advisor="advisor"></AdvisorCard>
            </div>

            <div class="flex flex-col items-center">

                <div class="pagination flex">
                    <RouterLink :to="{ name: 'advisor-list', query: { page: page - 1, limit: limit } }" rel="prev"
                        v-if="page != 1"
                        class="font-fig-base font-base flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 "
                        id="page-prev">
                        <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        Prev Page
                    </RouterLink>
                    <RouterLink :to="{ name: 'advisor-list', query: { page: page + 1, limit: limit } }" rel="next"
                        v-if="hasNextPage"
                        class="font-fig-base flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 "
                        id="page-next">
                        Next Page
                        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </RouterLink>
                </div>
            </div>
        </main>
    </div>
</template>
