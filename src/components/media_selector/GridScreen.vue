<template>
  <div class="gridScreenBodyContainer">
    <div class="gridScreenFilterSection">
      <label v-if="selectAllCheckbox" class="checkboxContainer">
        <input type="checkbox"  @change="selectAllHandler" v-model="selectAllFieldValue"/>
        <span class="checkmark"></span>
      </label>
      <i v-if="filter" class="fas fa-filter" @click="changeCurrentViewHandler('list')"></i>
      <i v-if="thumbnailView" class="fas fa-th activeCurrentView"></i>
      <i v-if="listView" class="fas fa-list" @click="changeCurrentViewHandler('list')"></i>
    </div>
    <div  v-if="itemsObjects?.data?.length" class="gridScreenImageSection">
      <div
      v-for="item in itemsObjects?.data"
      :key="item.id"
        class="gridScreenImage"
      :class="{selectedItem: isItemSelected(item.id)}"
      :style="{ backgroundImage: 'url(' + item.public_url + ')' }"
      @click="selectItemHandler(item)"
      ></div>
    </div>
    <h2 v-else class="emptyData">No data found!</h2>
  </div>
</template>

<script>

import _ from 'lodash';

export default {
    name: "GridScreen",
    props: [
      "closeModal",
      "allowMultiple",
      "currentlySelected",
      "iconMappings",
      "popupTitle",
      "itemsPerPage",
      "startingPage",
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

      "loadData",
      "filterObjects",
      "itemsObjects",
      "currentlySelectedHandler",
      "currentlySelectedCache",
      "changeCurrentViewHandler"
    ],
    data(){
        return{
            selectAllFieldValue: false,
        }
    },
    methods: {
      selectAllHandler(){
        if(!this.selectAllFieldValue){
          this.currentlySelectedHandler([])
          }else{
            const clonedItemObject = _.cloneDeep(this.itemsObjects);
            this.currentlySelectedHandler(clonedItemObject?.data)
          }
      },
      isItemSelected(id){
        const index = this.currentlySelectedCache.findIndex(res => res.id === id)
        if(index > -1) return true
        return false
      },
      selectItemHandler(itemProps){
         let clonedArray = _.cloneDeep(this.currentlySelectedCache);
        const index = clonedArray.findIndex(item => item.id === itemProps.id)
        if(index > -1){
           clonedArray.splice(index, 1)
        }else{
          // eslint-disable-next-line vue/no-mutating-props
          clonedArray.push({
            ...itemProps
          })
        }
         this.currentlySelectedHandler(clonedArray)
      }
    },
   async mounted() {
     await this.loadData()
  },
  unmounted(){
    this.currentlySelectedHandler([], true)
  }
}
</script>

<style scoped>
  .emptyData {
    color: #fff;
  }
      .gridScreenBodyContainer {
        width: 85%;
        margin: auto;
        padding: 20px 0;
      }

      .gridScreenFilterSection {
        display: flex;
        gap: 20px;
      }

      .gridScreenFilterSection i {
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }

      .gridScreenImageSection {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        gap: 3.5em;
        padding: 3.5em 0;
      }
      .gridScreenImage {
        width: 160px;
        height: 100px;
        background-size: 150px 90px;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 5px;
        cursor: pointer;
      }

      .selectedItem {
        border: 2px solid #fff;
      }

      .activeCurrentView {
        color: #fcb13b !important;
      }
       /* checkbox */
      .checkboxContainer {
        display: block;
        position: relative;
        padding-left: 20px;
        cursor: pointer;
        font-size: 16px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      /* Hide the browser's default checkbox */
      .checkboxContainer input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      /* Create a custom checkbox */
      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 16px;
        width: 16px;
        background-color: #707070;
        border: 2px solid #fff;
        border-radius: 4px;
      }

      /* On mouse-over, add a grey background color */
      .checkboxContainer:hover input ~ .checkmark {
        background-color: #ccc;
      }

      /* When the checkbox is checked, add a blue background */
      .checkboxContainer input:checked ~ .checkmark {
        background-color: #707070;
      }

      /* Create the checkmark/indicator (hidden when not checked) */
      .checkmark:after {
        content: "";
        position: absolute;
        display: none;
      }

      /* Show the checkmark when checked */
      .checkboxContainer input:checked ~ .checkmark:after {
        display: block;
      }

      /* Style the checkmark/indicator */
      .checkboxContainer .checkmark:after {
        left: 5px;
        top: 1px;
        width: 3px;
        height: 7px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }

      /* end checkbox */

</style>

