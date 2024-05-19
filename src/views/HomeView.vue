<template>
  <main>
    <div class="container">

      <h4 class="text-center text-primary m-2 p-2">CLL-TIM Treatment and Infection Modelling for Chronic Lymphocytic Leukemia</h4>
      <p class="text-justify m-2 p-2">
        CLL Treatment and Infection Modelling (CLL-TIM) is a model for predicting risk of infection or CLL treatment
        within the next 2-years. CLL-TIM is trained on a Danish dataset of 4149 patients diagnosed with CLL in the
        period of 2004-2017. The prediction of 28 machine-learning algorithms is combined into a single prediction
        using ensemble modelling. With CLL-TIM you are provided with
      </p>

      <ul>
        <li>A prediction of whether a patient is at a high or low-risk of infection or treatment within the next 2 years.</li>
        <li>A confidence score indicating the reliability of CLL-TIM’s prediction.</li>
        <li>A set of patient specific risk factors that were responsible in driving the patient towards the given risk.</li>
      </ul>

      <h5 class="text-primary m-2 p-2">CLL-TIM Prediction Options</h5>
      <ul>
        <li>
          <p class="text-justify m-2 p-2">
            <RouterLink to="/prediction">1. Predict using CLL-TIM User-Interface</RouterLink>
          </p>
        </li>
        <li>
          <p class="text-justify m-2 p-2">
            <RouterLink to="/prediction-with-template">2. Predict Using CLL-TIM Data Upload</RouterLink>
          </p>
        </li>
      </ul>

      <h5 class="text-primary m-2 p-2">Download Example Templates to be used with Prediction Option 2</h5>
      <ul>
        <li>
          <p class="text-justify m-2 p-2">
            <a href="templates/CLLTIM_DataInput.xlsx">CLL-TIM Data Input Format</a>
          </p>
        </li>
        <li><p class="text-justify m-2 p-2">
          <a href="templates/High-Risk-Example-1.csv">CLL-TIM High Risk Patient Example 1</a>
        </p>
        </li>
        <li><p class="text-justify m-2 p-2">
          <a href="templates/High-Risk-Example-2.csv">CLL-TIM High Risk Patient Example 2</a>
        </p>
        </li>
        <li><p class="text-justify m-2 p-2">
          <a href="templates/High-Risk-Example-3.csv">CLL-TIM High Risk Patient Example 3</a>
        </p>
        </li>
        <li><p class="text-justify m-2 p-2">
          <a href="templates/Low-Risk-Example-1.csv">CLL-TIM Low Risk Patient Example 1</a>
        </p>
        </li>
        <li><p class="text-justify m-2 p-2">
          <a href="templates/Low-Risk-Example-2.csv">CLL-TIM Low Risk Patient Example 2</a>
        </p>
        </li>
        <li><p class="text-justify m-2 p-2">
          <a href="templates/Low-Risk-Example-3.csv">CLL-TIM Low Risk Patient Example 3</a>
        </p>
        </li>
      </ul>

    </div>
  </main>
</template>

<script setup>
</script>

<style>
</style>
