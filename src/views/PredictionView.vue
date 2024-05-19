<template>
  <main>
    <div class="container">

      <h5 class="text-primary text-center m-2 p-2">CLL-TIM Data Input Form</h5>

      <h5 class="text-primary m-2 p-2">How to Use?</h5>
      <p class="text-justify m-2 p-2">
        Please fill in any patient data available for CLL-TIM to make its prediction. CLL-TIM is designed to work with
        missing values, so you are not required to enter all the requested patient information. For confident predictions,
        inputting patient data prior to CLL-diagnosis at several time-points, for laboratory tests and blood cultures, is recommended.
      </p>

      <p class="text-justify m-2 p-2">
        <b>Note</b>: Once you input data and receive CLL-TIM's prediction, you may make additional changes to some of the parameters and invoke
        CLL-TIM to predict again.
      </p>

      <form @submit.prevent="generatePrediction" id="diagnosis-form" action="#" method="post">

        <!-- Diagnosis and prediction dates -->
        <fieldset class="baseline-border m-2 p-2">
          <legend class="baseline-border text-muted">Diagnosis Date</legend>
          <div class="form-group form-row m-2 p-2">
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary" for="diagnosis-date">Date of CLL Diagnosis</label>
              <input v-model="diagnosisDate" class="form-control" id="diagnosis-date" name="diagnosis-date" required>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary">Date of Prediction (Set at 3 to 12 months post diagnosis)
                <FontAwesomeIcon :icon="faCircleInfo" data-toggle="tooltip" data-placement="top" title="This date refers to the date post CLL diagnosis that is considered to be time-zero. CLL-TIM’s prediction of the next 2-years will be calculated as 2-years from the date of prediction. NOTE: Prediction Point should be at least 3 months, and not longer than 1 year post CLL-diagnosis. Any data entered post this date will be ignored by CLL-TIM"></FontAwesomeIcon>
              </label>
              <input v-model="predictionDate" class="form-control" id="prediction-date" name="prediction-date" required>
            </div>
          </div>
        </fieldset>

        <!-- Patient details -->
        <fieldset class="baseline-border m-2 p-2">
          <legend class="baseline-border text-muted">Patient Details</legend>
          <div class="form-group form-row m-2 p-2">

            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary diagnosis-form-label" for="patient-id">Patient Id</label>
              <input v-model="patientId" class="form-control" type="text" id="patient-id" name="patient-id" required>
            </div>

            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary diagnosis-form-label" for="gender">Gender</label>
              <select v-model="gender" class="form-control" id="gender" name="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary diagnosis-form-label" for="age">Age</label>
              <select v-model="age" class="form-control" id="age" name="age">
                <option :key="n" v-for="n in 100" :selected="n === age">{{ n }}</option>
              </select>
            </div>
          </div>
        </fieldset>

        <!-- BaseLine -->
        <fieldset class="baseline-border m-2 p-2">
          <legend class="baseline-border text-muted">BaseLine</legend>
          <div class="form-group form-row m-2 p-2">

            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary diagnosis-form-label" for="binet-stage">Binet Stage</label>
              <select v-model="binetStage" class="form-control" id="binet-stage" name="binet-stage">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="NA">NA</option>
              </select>
            </div>

            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary diagnosis-form-label" for="ighv_unmut">IGHV mutational status</label>
              <select v-model="ighv_unmut" class="form-control" id="ighv_unmut" name="ighv_unmut">
                <option value="Mutated">Mutated status (Germline identity &lt; 98%)</option>
                <option value="Unmutated">Unmutated status</option>
                <option value="NA">NA</option>
              </select>
            </div>

            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary diagnosis-form-label" for="ecog">ECOG Status</label>
              <select v-model="ecog" class="form-control" id="ecog" name="ecog">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="NA">NA</option>
              </select>
            </div>

            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary diagnosis-form-label" for="FamCLL">Familial CLL</label>
              <select v-model="FamCLL" class="form-control" id="FamCLL" name="FamCLL">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="NA">NA</option>
              </select>
            </div>

            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary diagnosis-form-label" for="beta2m">Beta-2 -microglubulin > 4.0 (mg/L)</label>
              <select v-model="beta2m" class="form-control" id="beta2m" name="beta2m">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="NA">NA</option>
              </select>
            </div>

            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary diagnosis-form-label" for="cd38">CD38-expression >=30%</label>
              <select v-model="cd38" class="form-control" id="cd38" name="cd38">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="NA">NA</option>
              </select>
            </div>

            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary diagnosis-form-label" for="zap70">ZAP-70 expression >=20%</label>
              <select v-model="zap70" class="form-control" id="zap70" name="zap70">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="NA">NA</option>
              </select>
            </div>

            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <hr>
              <div class="alert alert-light mt-3" role="alert">
                <p class="text-muted">
                  <FontAwesomeIcon :icon="faCircleInfo"></FontAwesomeIcon> Please do not use Döhner's FISH hierarchy for entering values
                </p>
              </div>
            </div>

            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary diagnosis-form-label" for="del13">del(13q)</label>
              <select v-model="del13" class="form-control" id="del13" name="del13">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="NA">NA</option>
              </select>
            </div>

            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary diagnosis-form-label" for="tri12">tri(12)</label>
              <select v-model="tri12" class="form-control" id="tri12" name="tri12">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="NA">NA</option>
              </select>
            </div>

            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary diagnosis-form-label" for="del11">del(11q)</label>
              <select v-model="del11" class="form-control" id="del11" name="del11">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="NA">NA</option>
              </select>
            </div>

            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <label class="col-form-label text-nowrap text-primary diagnosis-form-label" for="del11">del(17p)</label>
              <select v-model="del17" class="form-control" id="del17" name="del17">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="NA">NA</option>
              </select>
            </div>

          </div>
        </fieldset>

        <!-- Routine Lab Tests -->
        <fieldset class="baseline-border m-2 p-2">
          <legend class="baseline-border text-muted">Routine Lab Test Variables</legend>

          <div class="row form-check form-check-inline">
            <div class="col-12">
              <label for="lab-test-exists" class="col-form-label text-muted m-1 p-1">Do you have any routine lab test information on Patient?</label>
              <label class="radio-inline m-1 p-1">
                <input @click="showTests" v-model="hasLabTests" type="checkbox" id="lab-test-exists">
              </label>
            </div>
          </div>

          <div v-show="hasLabTests" class="table-responsive">
            <table id="lab-table" class="table">
              <thead>
              <tr>
                <th class="text-nowrap text-primary" scope="row">
                  <FontAwesomeIcon @click="addLabTest" :icon="faVial"></FontAwesomeIcon>
                </th>
                <th class="text-nowrap text-primary" scope="row">Lab Test Date</th>
                <th class="text-nowrap text-primary" scope="row">Beta-2-microglobulin (mg/L)</th>
                <th class="text-nowrap text-primary" scope="row">Haemoglobin (mmol/L)</th>
                <th class="text-nowrap text-primary" scope="row">Erythrocyte Count (RBC) (10<sup>9</sup>/L)</th>
                <th class="text-nowrap text-primary" scope="row">Mean Cell Haemoglobin (MCH) (10<sup>12</sup>/L)</th>
                <th class="text-nowrap text-primary" scope="row">Mean Cell Volume, Erythrocyte count (10<sup>12</sup>/L)</th>
                <th class="text-nowrap text-primary" scope="row">Mean Cell Haemoglobin concentration (MCHC) (mmol/L)</th>
                <th class="text-nowrap text-primary" scope="row">Hematocrit (%)</th>
                <th class="text-nowrap text-primary" scope="row">Leukocytes (WBC) (10<sup>9</sup>/L)</th>
                <th class="text-nowrap text-primary" scope="row">Absolute Neutrophile Count (10<sup>9</sup>/L)</th>
                <th class="text-nowrap text-primary" scope="row">Eosinophilocytes (10<sup>9</sup>/L)</th>
                <th class="text-nowrap text-primary" scope="row">Basophilocytes (10<sup>9</sup>/L)</th>
                <th class="text-nowrap text-primary" scope="row">Absolute Lymphocyte Count (ALC) (10<sup>9</sup>/L)</th>
                <th class="text-nowrap text-primary" scope="row">Myeloid Immature Cells (10<sup>9</sup>/L)</th>
                <th class="text-nowrap text-primary" scope="row">Myelocytes (10<sup>9</sup>/L)</th>
                <th class="text-nowrap text-primary" scope="row">Metamyelocytes (10<sup>9</sup>/L)</th>
                <th class="text-nowrap text-primary" scope="row">Promyelocytes (10<sup>9</sup>/L)</th>
                <th class="text-nowrap text-primary" scope="row">Blast Cells (10<sup>9</sup>/L)</th>
                <th class="text-nowrap text-primary" scope="row">Smudge Cells (10<sup>9</sup>/L)</th>
                <th class="text-nowrap text-primary" scope="row">Platelet Count (10<sup>9</sup>/L)</th>
                <th class="text-nowrap text-primary" scope="row">Amylase (U/L)</th>
                <th class="text-nowrap text-primary" scope="row">Alkaline Phosphatase (U/L)</th>
                <th class="text-nowrap text-primary" scope="row">Creatinine (µmol/L)</th>
                <th class="text-nowrap text-primary" scope="row">eGFR (mL/min)</th>
                <th class="text-nowrap text-primary" scope="row">Albumine (g/L)</th>
                <th class="text-nowrap text-primary" scope="row">Sodium (mmol/L)</th>
                <th class="text-nowrap text-primary" scope="row">Transferrin (µmol/L)</th>
                <th class="text-nowrap text-primary" scope="row">Lactate Dehydrogenase (U/L)</th>
                <th class="text-nowrap text-primary" scope="row">C-Reactive Protein (CRP) (mg/L)</th>
                <th class="text-nowrap text-primary" scope="row">Uric Acid (mmol/L)</th>
                <th class="text-nowrap text-primary" scope="row">Prostate Specific Antigen (μg/L)</th>
                <th class="text-nowrap text-primary" scope="row">Glucose (mmol/L)</th>
                <th class="text-nowrap text-primary" scope="row">Creatinine Kinase (U/L)</th>
                <th class="text-nowrap text-primary" scope="row">International Normalized Ratio</th>
              </tr>
              </thead>
              <tbody>
              <tr :key="index" v-for="(test, index) in labTests">
                <td>
                  <FontAwesomeIcon @click="removeLabTests(index)" :icon="faRemove"></FontAwesomeIcon>
                </td>
                <td><input v-model="test.labDate" class="form-control lab-date" name="labDate" placeholder="Date" required></td>
                <td><input v-model="test.beta2m" class="form-control lab-value" name="beta2m" required></td>
                <td><input v-model="test.haem" class="form-control lab-value" name="haem" required></td>
                <td><input v-model="test.aec" class="form-control lab-value" name="aec" required></td>
                <td><input v-model="test.mch" class="form-control lab-value" name="mch" required></td>
                <td><input v-model="test.mcv" class="form-control lab-value" name="mcv" required></td>
                <td><input v-model="test.mchc" class="form-control lab-value" name="mchc" required></td>
                <td><input v-model="test.hema" class="form-control lab-value" name="hema" required></td>
                <td><input v-model="test.leuk" class="form-control lab-value" name="leuk" required></td>
                <td><input v-model="test.neu" class="form-control lab-value" name="neu" required></td>
                <td><input v-model="test.eos" class="form-control lab-value" name="eos" required></td>
                <td><input v-model="test.baso" class="form-control lab-value" name="baso" required></td>
                <td><input v-model="test.alc" class="form-control lab-value" name="alc" required></td>
                <td><input v-model="test.mic" class="form-control lab-value" name="mic" required></td>
                <td><input v-model="test.myel" class="form-control lab-value" name="myel" required></td>
                <td><input v-model="test.metamyel" class="form-control lab-value" name="metamyel" required></td>
                <td><input v-model="test.prom" class="form-control lab-value" name="prom" required></td>
                <td><input v-model="test.blast" class="form-control lab-value" name="blast" required></td>
                <td><input v-model="test.smudge" class="form-control lab-value" name="smudge" required></td>
                <td><input v-model="test.thr" class="form-control lab-value" name="thr" required></td>
                <td><input v-model="test.amy" class="form-control lab-value" name="amy" required></td>
                <td><input v-model="test.alp" class="form-control lab-value" name="alp" required></td>
                <td><input v-model="test.crea" class="form-control lab-value" name="crea" required></td>
                <td><input v-model="test.egfr" class="form-control lab-value" name="egfr" required></td>
                <td><input v-model="test.alb" class="form-control lab-value" name="alb" required></td>
                <td><input v-model="test.naPlus" class="form-control lab-value" name="naPlus" required></td>
                <td><input v-model="test.trans" class="form-control lab-value" name="trans" required></td>
                <td><input v-model="test.ldh" class="form-control lab-value" name="ldh" required></td>
                <td><input v-model="test.crp" class="form-control lab-value" name="crp" required></td>
                <td><input v-model="test.urat" class="form-control lab-value" name="urat" required></td>
                <td><input v-model="test.psa" class="form-control lab-value" name="psa" required></td>
                <td><input v-model="test.gluc" class="form-control lab-value" name="gluc" required></td>
                <td><input v-model="test.creak" class="form-control lab-value" name="creak" required></td>
                <td><input v-model="test.inr" class="form-control lab-value" name="inr" required></td>
              </tr>
              </tbody>
            </table>
          </div>

        </fieldset>

        <!-- Blood cultures -->
        <fieldset class="baseline-border m-2 p-2">
          <legend class="baseline-border text-muted">Bloodculture</legend>

          <div class="row form-check form-check-inline">
            <div class="col-12">
              <label for="bloodculture-exists" class="col-form-label text-muted m-1 p-1">Do you have any blood culture information on Patient?</label>
              <label class="radio-inline m-1 p-1">
                <input @click="showBloodCultures" v-model="hasBloodCulture" type="checkbox" id="bloodculture-exists">
              </label>
            </div>
          </div>

          <div v-show="hasBloodCulture" class="table-responsive">
            <table id="bloodculture-table" class="table">
              <thead>
              <tr>
                <th class="text-nowrap text-primary" scope="row">
                  <FontAwesomeIcon @click="addBloodCultureTest" :icon="faDroplet"></FontAwesomeIcon>
                </th>
                <th class="text-nowrap text-primary" scope="row">
                  Date of Infection
                  <FontAwesomeIcon :icon="faCircleInfo" data-toggle="tooltip" data-placement="top" title="Please list any blood cultures previously drawn. This includes also blood cultures with a negative finding. CLL-TIM is trained to use drawing of a blood culture as proxy for severe infection, irrespective of the result."></FontAwesomeIcon>
                </th>
                <th class="text-nowrap text-primary" scope="row">
                  Infection Information
                  <FontAwesomeIcon :icon="faCircleInfo" data-toggle="tooltip" data-placement="top" title="Please indicate a negative blood culture result as ‘negative’"></FontAwesomeIcon>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr :key="index" v-for="(test, index) in bloodCultureTests">
                <td>
                  <FontAwesomeIcon @click="removeBloodCulture(index)" :icon="faRemove"></FontAwesomeIcon>
                </td>
                <td>
                  <input v-model="test.infecDate" class="form-control lab-date" name="infecDate" placeholder="Date" required>
                </td>
                <td>
                  <input v-model="test.infec" class="form-control lab-value" name="infec" required>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </fieldset>

        <!-- Pathology -->
        <fieldset class="baseline-border m-2 p-2">
          <legend class="baseline-border text-muted">Pathology</legend>

          <div class="row form-check form-check-inline">
            <div class="col-12">
              <label for="pathology-exists" class="col-form-label text-muted m-1 p-1">Do you have any pathology information on Patient?</label>
              <label class="radio-inline m-1 p-1">
                <input @click="showPathologies" v-model="hasPathology" type="checkbox" id="pathology-exists" >
              </label>
            </div>
          </div>

          <div v-show="hasPathology" class="table-responsive">
            <table id="pathology-table" class="table">
              <thead>
              <tr>
                <th class="text-nowrap text-primary" scope="row">
                  <FontAwesomeIcon @click="addPathology" :icon="faMicroscope"></FontAwesomeIcon>
                </th>
                <th class="text-nowrap text-primary" scope="row">Date of Pathology</th>
                <th class="text-nowrap text-primary" scope="row">
                  Pathology Information
                  <FontAwesomeIcon :icon="faCircleInfo" data-toggle="tooltip" data-placement="top" title="CLL-TIM uses information on previous pathologies – please enter any available pathology data as SNOMED codes from http://www.patobank.dk."></FontAwesomeIcon>
                </th>
                <th class="text-nowrap text-primary" scope="row">
                  Date of Inflammation
                  <FontAwesomeIcon :icon="faCircleInfo" data-toggle="tooltip" data-placement="top" title="Inflammation from pathology report"></FontAwesomeIcon>
                </th>
                <th class="text-nowrap text-primary" scope="row">Inflammation Information</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(pathology, index) in pathologies" :key="index">
                <td>
                  <FontAwesomeIcon @click="removePathology(index)" :icon="faRemove"></FontAwesomeIcon>
                </td>
                <td><input v-model="pathology.inflamDate" class="form-control lab-date" id="inflam-date" name="inflamDate" placeholder="Date" required></td>
                <td><input v-model="pathology.inflam" class="form-control lab-value" id="inflam-value" name="inflam" required></td>
                <td><input v-model="pathology.rarePathDate" class="form-control lab-date" id="rare-path-date" name="rarePathDate" placeholder="Date" required></td>
                <td><input v-model="pathology.rarePath" class="form-control lab-value" id="rare-path-value" name="rarePath" required></td>
              </tr>
              </tbody>
            </table>
          </div>
        </fieldset>

        <div class="form-group form-row m-2 p-2">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">Generate Prediction</button>
          </div>
        </div>

      </form>

      <Teleport to="body">
        <CLLTIMModal :show="showModal" @close="showModal = false">
          <template #header>
            <h3>CLL-TIM Prediction</h3>
          </template>
        </CLLTIMModal>
      </Teleport>

    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCircleInfo,
  faDroplet,
  faMicroscope,
  faRemove,
  faVial
} from '@fortawesome/free-solid-svg-icons'
import CLLTIMModal from '@/components/CLLTIMModal.vue'

const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return dd + '-' + mm + '-' + yyyy
}

const NA = "NA"
const defaultAge = 65
const defaultGender = "Male"

const diagnosisDate = ref(getCurrentDate())
const predictionDate = ref(getCurrentDate())
const patientId = ref('')
const gender = ref(defaultGender)
const age = ref(defaultAge)


// BaseLine
const binetStage = ref(NA)
const ighv_unmut = ref(NA)
const ecog = ref(NA)
const FamCLL = ref(NA)
const beta2m = ref(NA)
const cd38 = ref(NA)
const zap70 = ref(NA)
const del13 = ref(NA)
const tri12 = ref(NA)
const del11 = ref(NA)
const del17 = ref(NA)

// Tests
const hasLabTests = ref(false)
const hasBloodCulture = ref(false)
const hasPathology = ref(false)

const labTests = ref([])
const bloodCultureTests = ref([])
const pathologies = ref([])

// Modal
const showModal = ref(false)

// Function for new tests
const newLabTest = () => {
  return {
    "labDate": getCurrentDate(),
    "beta2m": NA,
    "haem": NA,
    "aec": NA,
    "mch": NA,
    "mcv": NA,
    "mchc": NA,
    "hema": NA,
    "leuk": NA,
    "neu": NA,
    "eos": NA,
    "baso": NA,
    "alc": NA,
    "mic": NA,
    "myel": NA,
    "metamyel": NA,
    "prom": NA,
    "blast": NA,
    "smudge": NA,
    "thr": NA,
    "amy": NA,
    "alp": NA,
    "crea": NA,
    "egfr": NA,
    "alb": NA,
    "naPlus": NA,
    "trans": NA,
    "ldh": NA,
    "crp": NA,
    "urat": NA,
    "psa": NA,
    "gluc": NA,
    "creak": NA,
    "inr": NA
  }
}

const newBloodCulture = () => {
  return {
    "infecDate": getCurrentDate(),
    "infec": NA,
  }
}

const newPathology = () => {
  return {
    "inflamDate": getCurrentDate(),
    "inflam": NA,
    "rarePathDate": getCurrentDate(),
    "rarePath": NA,
  }
}

function showTests() {
  if (labTests.value.length === 0) {
    labTests.value.push(newLabTest())
  }
}

function showBloodCultures() {
  if (bloodCultureTests.value.length === 0) {
    bloodCultureTests.value.push(newBloodCulture())
  }
}

function showPathologies() {
  if (pathologies.value.length === 0) {
    pathologies.value.push(newPathology())
  }
}

function addLabTest() {
  labTests.value.push(newLabTest())
}

function addBloodCultureTest() {
  bloodCultureTests.value.push(newBloodCulture())
}

function addPathology() {
  pathologies.value.push(newPathology())
}

function removeLabTests(index) {
  removeItemByIndex(labTests.value, index)
}

function removeBloodCulture(index) {
  removeItemByIndex(bloodCultureTests.value, index)
}

function removePathology(index) {
  removeItemByIndex(pathologies.value, index)
}

function removeItemByIndex(array, index) {
  if (index >= 0 && index < array.length) {
    array.splice(index, 1);
  }
}

function generatePrediction() {
  const diagnosisData = {
    "baseline": {
      "patient_id": patientId.value,
      "diag_date": diagnosisDate.value,
      "prediction_point": predictionDate.value,
      "age": age.value,
      "binet_stage": binetStage.value,
      "ighv_unmut": ighv_unmut.value,
      "ecog": ecog.value,
      "FamCLL": FamCLL.value,
      "beta2m": beta2m.value,
      "cd38": cd38.value,
      "zap70": zap70.value,
      "gender": gender.value,
      "del13": del13.value,
      "tri12": tri12.value,
      "del11": del11.value,
      "del17": del17.value,
    },
    "routine_tests": labTests.value,
    "bloodculture": bloodCultureTests.value,
    "pathology": pathologies.value
  }
  console.dir(diagnosisData)
  showModal.value = true
}

</script>

<style>

legend {
  float: unset;
}

fieldset.baseline-border {
  border: 1px groove #ddd !important;
  padding: 0 1.4em 1.4em 1.4em !important;
  margin: 0 0 1.5em 0 !important;
  -webkit-box-shadow:  0 0 0 0 #000;
  box-shadow:  0 0 0 0 #000;
}

legend.baseline-border {
  font-size: 1.2em !important;
  font-weight: bold !important;
  text-align: left !important;
  width:inherit; /* Or auto */
  padding:0 10px; /* To give a bit of padding on the left and right */
  border-bottom:none;
}

.diagnosis-form-label {
  font-size: 12px !important;
  text-align: center !important;
}

.diagnosis-form-header {
  font-size: 12px !important;
  text-align: center !important;
}

#lab-table > thead > tr > th {
  font-size: 12px !important;
  text-align: left !important;
  color: rgb(244, 175, 137) !important;
}

#bloodculture-table > thead > tr > th {
  font-size: 12px !important;
  text-align: left !important;
  color: rgb(255, 191, 66) !important;
}

#pathology-table > thead > tr > th {
  font-size: 12px !important;
  text-align: left !important;
  color: rgb(156, 194, 226) !important;
}

.lab-date {
  font-size: 12px !important;
}

.lab-value {
  font-size: 12px !important;
}

</style>