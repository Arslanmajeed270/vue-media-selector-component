<template>
<!-- Trigger/Open The Modal -->
  <button id="myBtn" @click="toggleModal">Open Modal</button>
    <MediaSelectorPopUp 
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
    :currentSelectedHandler="currentSelectedHandler"
    :changeCurrentViewHandler="changeCurrentViewHandler"
    :onSaveHandler="onSaveHandler"

    :urls="urls"
    />
</template>

<script>
import MediaSelectorPopUp from './components/MediaSelectorPopUp.vue';
import selectedDummyData from './data/selected.json';

export default {
  name: 'App',
  components: {
    MediaSelectorPopUp
  },
  data(){
    return {
    showModal: false,
    currentView: 'list', // grid | list
    filtersVisible: true,
    allowMultiple: true,
    urls: {
      filterUrl: "http://localhost:8080/api/filter.json",
      itemUrl: "http://localhost:8080/api/item.json",
    },
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
    }
  },
  methods: {
    toggleModal(){
      this.showModal = !this.showModal
    },
    currentSelectedHandler(updatedObject){
      this.currentlySelected = updatedObject
    },
    changeCurrentViewHandler(viewProps){
      this.currentView = viewProps
    },
    onSaveHandler(selectedItemsProps){
      console.log("checking selectedItemsProps: ", selectedItemsProps);
      this.showModal = false
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
