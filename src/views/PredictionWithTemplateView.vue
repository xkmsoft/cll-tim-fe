<template>
  <main>
    <div class="container">

      <h5 class="text-primary text-center m-2 p-2">CLL-TIM Data Input Form With CSV Templates</h5>
      <h5 class="text-primary m-2 p-2">How to Use?</h5>
      <p class="text-justify m-2 p-2">
        CLL-TIM uses patient data several years prior CLL Diagnosis. In these cases, uploading patient data through
        our data upload option might be a better option than manual input. A template describing the format of the file
        is provided on the landing page. Alternatively, you can also upload one of the 6 patient examples also provided on the landing page.
        For manual data input of patient data please visit <RouterLink to="/prediction" >Prediction with form page</RouterLink>
      </p>

      <div class="container">
        <input @change="fileSelected" id="template-upload" type="file" accept="text/csv">
      </div>

      <Teleport to="body">
        <CLLTIMModal :show="showModal" @close="showModal = false">
          <template #header>
            <h3>CLL-TIM Prediction with CSV</h3>
          </template>
        </CLLTIMModal>
      </Teleport>

    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import CLLTIMModal from '@/components/CLLTIMModal.vue'

// Modal
const showModal = ref(false)

function fileSelected(event) {
  const file = event.target.files[0]
  console.dir(file)
  showModal.value = true
}
</script>

<style scoped>
</style>