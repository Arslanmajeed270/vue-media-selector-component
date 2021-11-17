<template>
<!-- Trigger/Open The Modal -->
  <button id="myBtn" @click="toggleModal">Open Modal</button>
    <Modal 
    :showModal="showModal" 
    :closeModal="toggleModal" 
    :currentView="currentView"
    :filtersVisible="filtersVisible" 
    :allowMultiple="allowMultiple"
    :currentlySelected="currentlySelected"
    :iconMappings="iconMappings"
    :popupTitle="popupTitle"
    :itemsPerPage="itemsPerPage"
    :startingPage="startingPage"
    :popUpMaxWidth="popUpMaxWidth"
    :popUpMaxHeight="popUpMaxHeight"
    :okButtonText="okButtonText"
    :cancelButtonText="cancelButtonText"

    :orderDirection="orderDirection"
    :orderField="orderField"
    :searchBox="searchBox"
    :selectAllCheckbox="selectAllCheckbox"
    :filter="filter"
    :listView="listView"
    :thumbnailView="thumbnailView"

    :filterObjects={filterObjects}
    :itemsObjects="itemsObjects"
    />
</template>

<script>
import Modal from './components/Modal.vue';
import itemDummyData from './data/item.json';
import filtersDummyData from './data/filter.json';
import selectedDummyData from './data/selected.json';

export default {
  name: 'App',
  components: {
    Modal
  },
  data(){
    return {
    showModal: false,
    currentView: 'grid',
    filtersVisible: true,
    allowMultiple: true,
    currentlySelected: selectedDummyData,
    iconMappings: [],
    popupTitle: "Visuals",
    itemsPerPage: 18,
    startingPage: 1,
    popUpMaxWidth: '100%',
    popUpMaxHeight: '100%',
    okButtonText: "Use",
    cancelButtonText: "Cancel",

    // Items Hidden
     orderDirection: true,
     orderField: true,
     searchBox: true,
     selectAllCheckbox: true,
     filter: true,
     listView: true,
     thumbnailView: true,

     filterObjects: filtersDummyData,
     itemsObjects: itemDummyData
    }
  },
  methods: {
    toggleModal(){
      this.showModal = !this.showModal
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
