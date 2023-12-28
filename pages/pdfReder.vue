<template>
    <div>
       <div>
        <h1>pdf viewer</h1>
       </div> 
       <div class="pdf">
        <pdfViewer class="pdfContainer" />
       </div>
    </div>
</template>
<script>
import pdfViewer from '../components/pdfViewer.vue';
export default {
components:{
    pdfViewer
}


}


</script>
<style>
.pdfContainer{
    margin: 40px;
    justify-content: center;
    height: 80vh;

  }



</style>