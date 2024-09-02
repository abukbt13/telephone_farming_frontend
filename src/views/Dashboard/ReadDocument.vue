<script setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {auth} from "@/compossables/auth.js";
import Header from "@/components/includes/Header.vue";

const {base_url,storage,authHeader} = auth()
const  document =ref('')
const route = useRoute()
const id =ref('')
const router = useRouter()
id.value =route.params.id
const  getDocument = async () => {
  const res = await axios.get(base_url.value + 'v1/education/'+id.value, authHeader)
  if(res){
    console.log(res)
    document.value = res.data.document
  }
}
function  goBack() {
  router.back();
}

onMounted(()=> {
  getDocument()
})
</script>

  <template>

    <Header />
    <i @click="goBack"
       style="font-size: 24px; font-weight: 900; position: absolute; left: 1rem; top: 3rem;
          text-shadow: 1px 1px 2px white, -1px -1px 2px black;color: white; background-color: grey; padding: 0px 0.5rem"
       class="bi bi-arrow-90deg-left">
    </i>

    <embed :src="storage + 'documents/' + document.document" type="application/pdf" class="img-fluid" style="width:100vw; height:100vh;" />

</template>

<style scoped>

</style>