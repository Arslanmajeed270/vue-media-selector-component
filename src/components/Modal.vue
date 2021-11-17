<template>
    <!-- The Modal -->
  <div v-show="showModal" id="myModal" :style="[{
    'max-width': popUpMaxWidth??'100%',
    'max-height': popUpMaxHeight??'100%'
  }]"  class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <my-component v-show="currentView === 'grid'">
        <GridScreen 
        :closeModal="closeModal" 
        :allowMultiple="allowMultiple"
        :currentlySelected="currentlySelected"
        :iconMappings="iconMappings"
        :popupTitle="popupTitle"
        :itemsPerPage="itemsPerPage"
        :startingPage="startingPage"
        :okButtonText="okButtonText"
        :cancelButtonText="cancelButtonText"

        :orderDirection="orderDirection"
        :orderField="orderField"
        :searchBox="searchBox"
        :selectAllCheckbox="selectAllCheckbox"
        :filter="filter"
        :listView="listView"
        :thumbnailView="thumbnailView"

        :filterObjects="filterObjects"
        :itemsObjects="itemsObjects"
        />
      </my-component>
       <my-component v-show="currentView === 'list'">
        <ListScreen 
        :closeModal="closeModal" 
        :filtersVisible="filtersVisible" 
        :allowMultiple="allowMultiple"
        :currentlySelected="currentlySelected"
        :popupTitle="popupTitle"
        :itemsPerPage="itemsPerPage"
        :startingPage="startingPage"
        :okButtonText="okButtonText"
        :cancelButtonText="cancelButtonText"

        :orderDirection="orderDirection"
        :orderField="orderField"
        :searchBox="searchBox"
        :selectAllCheckbox="selectAllCheckbox"
        :filter="filter"
        :listView="listView"
        :thumbnailView="thumbnailView"

        :filterObjects="filterObjects"
        :itemsObjects="itemsObjects"
        />
      </my-component>
    </div>

  </div>
</template>

<script>
import GridScreen from './media_selector/GridScreen.vue';
import ListScreen from './media_selector/ListScreen.vue';

export default {
  name: 'Modal',
  props: [
    "showModal",
    "closeModal",
    "currentView",
    "filtersVisible",
    "allowMultiple",
    "currentlySelected",
    "iconMappings",
    "popupTitle",
    "itemsPerPage",
    "startingPage",
    "popUpMaxWidth",
    "popUpMaxHeight",
    "okButtonText",
    "cancelButtonText",

    // Items Hidden
     "orderDirection",
     "orderField",
     "searchBox",
     "selectAllCheckbox",
     "filter",
     "listView",
     "thumbnailView",

     'filterObjects',
     'itemsObjects'
  ],
  components: {
    GridScreen,
    ListScreen
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 10px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  /* background-color: #fefefe; */
  background-color: #707070;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 95%;
  height: 95%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

/* The Close Button */
.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  color: white;
}

.modal-body {padding: 2px 16px;}

.modal-footer {
  padding: 2px 16px;
  color: white;
}

</style>
