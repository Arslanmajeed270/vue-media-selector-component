<template>
    <!-- The Modal -->
  <div v-show="showModal" id="myModal" :style="[{
    'max-width': popUpMaxWidth??'100%',
    'max-height': popUpMaxHeight??'100%'
  }]"  class="modal">
    <!-- Modal content -->
    <div class="modal-content">

      <div class="gridScreenWrapper">
      <div class="gridScreenHeader">
        <div class="gsHeader">
          <p>{{popupTitle}}</p>
        </div>
        <div class="gsOrderInput">
          <div v-show="orderDirection"  class="selectWrapper">
            <select  class="selectBox" @change="onChangeHandler" name="orderDirectionValue"  v-model="orderDirectionValue" >
              <option value="Order descending">Order descending</option>
              <option value="Order Ascending">Order Ascending</option>
            </select>
          </div>
          <div v-show="orderField" class="selectWrapper">
            <select class="selectBox" name="orderFieldValue" @change="onChangeHandler"  v-model="orderFieldValue" >
              <option  
              v-for="order in filterObjects?.orders" 
              :key="order.key" 
              :value="order.key">{{order.value}}</option>
            </select>
          </div>
          <div  v-show="searchBox" class="selectWrapper">
            <input type="text" name="searchFieldValue" @keypress="onKeyup"  class="selectBox" />
            <img src="../assets/search-solid.svg" width="15" />
          </div>
        </div>
      </div>

          <!-- ******  Start body section ***** -->
          <template v-if="showModal && currentView === 'grid'">
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
            :loadData="loadData"
            :currentlySelectedCache="currentlySelectedCache"
            :currentlySelectedHandler="currentlySelectedHandler"
            :changeCurrentViewHandler="changeCurrentViewHandler"
            :loadMoreItems="loadMoreItems"
            />
      </template>
       <template v-if="showModal && currentView === 'list'">
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
        :loadData="loadData"
        :loadDataFilteredData="loadDataFilteredData"
        :currentlySelectedCache="currentlySelectedCache"
        :currentlySelectedHandler="currentlySelectedHandler"
        :changeCurrentViewHandler="changeCurrentViewHandler"
        :changeFilterHandler="changeFilterHandler"
        :loadMoreItems="loadMoreItems"
        />
      </template>
      <div class="gridScreenFooter">
        <button class="cancelButton" @click="closeModal">Cancel</button>
        <button class="saveButton" @click="onSaveHandler(currentlySelectedCache)">Use</button>
      </div>
    </div>

    </div>

  </div>
</template>

<script>
import GridScreen from './media_selector/GridScreen.vue';
import ListScreen from './media_selector/ListScreen.vue';
import { getFilterData, getItemData } from '../service';
import _ from 'lodash';


export default {
  name: 'MediaSelectorPopUp',
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
     "currentSelectedHandler",
     "changeCurrentViewHandler",
     "onSaveHandler",
     "changeFilterHandler",

     "urls"
  ],
  data(){
    return {
      filterObjects: {},
      itemsObjects: {},
      orderDirectionValue: "Order descending",
      orderFieldValue: "",
      searchFieldValue:"",
      currentlySelectedCache: [],
      timeout: null,
      loading: false
    }
  },
  methods: {
    async loadData(){
      const filterResult = await getFilterData(this.urls.filterUrl+`?orderDirection=${this.orderDirectionValue}&orderField=${this.orderFieldValue}&searchBox=${this.searchFieldValue}`);
      if( filterResult !== "No result found!" ) this.filterObjects = filterResult
      const itemResult = await getItemData(this.urls.itemUrl+`?orderDirection=${this.orderDirectionValue}&orderField=${this.orderFieldValue}&searchBox=${this.searchFieldValue}`);
      if( itemResult !== "No result found!" ) this.itemsObjects = itemResult
      if( this.orderFieldValue === "" ) {
        filterResult.orders.map(order => {
          if( order.default ) this.orderFieldValue = order.key
          return order
        })
      }
    },
     async loadDataFilteredData(extension){
      const filterResult = await getFilterData(this.urls.filterUrl+extension);
      if( filterResult !== "No result found!" ) this.filterObjects = filterResult
      const itemResult = await getItemData(this.urls.itemUrl+extension);
      if( itemResult !== "No result found!" ) this.itemsObjects = itemResult
    },
    async onChangeHandler(e){
      const { name , value } = e.target;
      this[name] = value
      await this.loadData();
    },
    onKeyup(e){
       clearTimeout(this.timeout);
       this.timeout = setTimeout(() => {
         this.onChangeHandler(e)
      }, 200);
    },
    currentlySelectedHandler(updatedObject, isDefault){
      const clonedCurrentlySelected = _.cloneDeep(this.currentlySelected);
       if( isDefault && !this.allowMultiple ) {
        this.currentlySelectedCache.push(clonedCurrentlySelected[0])
      }else if(isDefault) this.currentlySelectedCache = clonedCurrentlySelected
      else this.currentlySelectedCache = updatedObject
    },
    loaded(){
      setTimeout(() => {
        this.loading = false
      }, 2000);
    },
   async loadMoreItems(){
    if( this.loading || !this.itemsObjects || !this.itemsObjects.next_page_url) return;
    this.loading = true
    const itemResult = await getItemData(this.itemsObjects?.next_page_url+`&orderDirection=${this.orderDirectionValue}&orderField=${this.orderFieldValue}&searchBox=${this.searchFieldValue}`);
    if( itemResult === "No result found!" )  return this.loaded()
    if( itemResult.data.length + this.itemsObjects.data.length > itemResult.per_page  ) {
      this.itemsObjects =  itemResult
      return this.loaded()
    }
    itemResult.data = [...itemResult.data, ...this.itemsObjects.data];
    this.itemsObjects =  itemResult
    this.loaded()
    },
  },
  components: {
    GridScreen,
    ListScreen
  },
  mounted(){
    if(this.currentlySelected?.length){
      const clonedCurrentlySelected = _.cloneDeep(this.currentlySelected);
      if( !this.allowMultiple ) {
        this.currentlySelectedCache.push(clonedCurrentlySelected[0])
      }else{
        this.currentlySelectedCache = _.cloneDeep(this.currentlySelected);
      }
    }
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

 .gridScreenWrapper {
  height: 100%;
  width: 100%;
}

.gridScreenHeader {
        height: 8%;
        background-color: #9d9d9c;
        width: 100%;
        display: flex;
        margin: auto;
      }

      .gsHeader {
        flex: 3;
        margin: auto;
        text-align: left;
      }
      .gsHeader > p {
        margin-left: 10%;
        font-size: 18px;
        color: white;
      }

      .gsOrderInput {
        flex: 4;
        margin: auto;
        display: flex;
        gap: 40px;
      }

       /* Select box css */
      .selectWrapper {
        border-radius: 36px;
        display: inline-block;
        overflow: hidden;
        background: transparent;
        border: 3px solid #e4a644;
        padding: 0px 5px;
        display: flex;
      }
      .selectBox {
        width: 200px;
        border: 0px;
        background: transparent;
        color: #fff;
        outline: #e4a644;
      }

      .selectBox > option {
        background: #9d9d9c;
      }

      .gridScreenFooter {
        height: 8%;
        border-top: 3px solid #7e7e7e;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3em;
      }
.cancelButton {
        background-color: transparent;
        border-radius: 5px;
        font-size: 17px;
        font-family: "Source Sans Pro", sans-serif;
        padding: 2px 18px;
        border: 2px solid #fff;
        color: #fff;
        width: 120px;
        cursor: pointer;
      }

       .saveButton {
        background-color: #fcb13b;
        border-radius: 5px;
        font-size: 17px;
        font-family: "Source Sans Pro", sans-serif;
        padding: 2px 18px;
        color: black;
        width: 120px;
        border: 0px;
        cursor: pointer;
      }
</style>
