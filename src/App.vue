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
    :changeFilterHandler="changeFilterHandler"

    :urls="urls"
    />
</template>

<script>
import MediaSelectorPopUp from './components/MediaSelectorPopUp.vue';
import selectedDummyData from './data/selected.json';
import AudioIcon from './assets/icons/file-audio-regular.svg';
import ZipIcon from './assets/icons/file-archive-regular.svg';
import ExcelIcon from './assets/icons/file-excel-regular.svg';
import PdfIcon from './assets/icons/file-pdf-regular.svg';
import WordIcon from './assets/icons/file-word-regular.svg';
import VideoIcon from './assets/icons/video-solid.svg';
import ImageIcon from './assets/icons/image-solid.svg';

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
    iconMappings: [{
      type: "audio",
      icon: AudioIcon
    },
    {
      type: "zip",
      icon: ZipIcon
    }, {
      type: "excel",
      icon: ExcelIcon
    },
     {
      type: "pdf",
      icon: PdfIcon
    },
     {
      type: "word",
      icon: WordIcon
    },
     {
      type: "video",
      icon: VideoIcon
    },
     {
      type: "image",
      icon: ImageIcon
    }
    ],
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
      this.currentlySelected = selectedItemsProps
      this.showModal = false
    },
    changeFilterHandler(){
      this.filtersVisible = !this.filtersVisible
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
