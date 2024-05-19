<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">CLL-TIM</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar-content">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/prediction">
              <FontAwesomeIcon :icon="faHeartbeat"></FontAwesomeIcon> Prediction
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/prediction-with-template">
             <FontAwesomeIcon :icon="faFileCsv"></FontAwesomeIcon> Prediction with CSV
            </RouterLink>
          </li>
        </ul>
        <span class="badge bg-light text-dark">Contact: <a href="mailto:rudi.agius@regionh.dk">rudi.agius@regionh.dk</a></span>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFileCsv, faHeartbeat } from '@fortawesome/free-solid-svg-icons'
</script>

<style scoped>
</style>
