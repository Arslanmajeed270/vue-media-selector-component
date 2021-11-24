<template>
      <div class="gridScreenBody">
    <div class="gridScreenBodyContainer">

    <div  class="gsfilterContainer">
      <div v-show="filtersVisible" class="gsContentContainer">
        <p class="gsTitle">Filter</p>
        <div class="gsfilterCategory">
          <p class="gsfilterTitle">Category</p>
          <p class="gsfilterClear" @click="clearData('categories')">Clear</p>
        </div>
        <div class="liFilterCategories"
         v-for="singleFilter in getCategoryFilterData()?.values"
        :key="singleFilter.key"
        >
          <label class="checkboxContainer">
            <input type="checkbox" :id="singleFilter.key" @change="onCategoryHandler(singleFilter)" :checked="isCatetgorySelected(singleFilter.key)" />
            <span class="checkmark"></span>
          </label>
          <p class="checkboxTitle" @click="onCategoryHandler(singleFilter)" >{{singleFilter.value}}</p>
        </div>        
  
        <br />
        <div class="Checkbox-showless">
          <p>Showless</p>
        </div>
        <div>
          <div class="gsfilterCategory">
            <p class="gsfilterTitle">Title</p>
            <p class="gsfilterClear" @click="clearData('title')">Clear</p>
          </div>
          <div class="alphabetsFilter" >
            <table>
            <tbody>
                <tr  
                 v-for="(abcArr, index) in AlphabtsArrayData"
                :key="index"
                >
                  <td
                    v-for="(abc, idx) in abcArr"
                    :key="idx"
                    :class="{
                      selectedAphabets: title.indexOf(abc) > -1
                    }"
                    @click="alphabetsChangeHanlder(abc)"
                  >
                  {{abc}}
                  </td>
                </tr>
            </tbody>
          </table>
          </div>
        </div>
        <div class="gsfilterCategory">
          <p class="gsfilterTitle">Last updated</p>
          <p class="gsfilterClear" @click="clearData('lastUpdated')">Clear</p>
        </div>
        <div class="Checkbox-showless">
        <form>
          <table cellspacing="10">
            <tr>
              <th><label for="fromInput">From</label></th>
              <td>
                <input type="text" @change="onKeyup" v-model="fromInput" name="fromInput" >
              </td>
            </tr>
            <tr>
              <th>
                <label for="toInput">To</label>
              </th>
              <td>
              <input type="text" @change="onKeyup" v-model="toInput" name="toInput">
              </td>
            </tr>
          </table>

          </form>
        </div>
      </div>
    </div>

    <div class="gsLibraryContainer"
    id="scrollComponent"
      @drop="onDropRemoveSelected($event)"
      @dragenter.prevent
      @dragover.prevent>
      <div class="gridScreenFilterSection">
        <p class="gsTitle">Library</p>
        <label v-if="selectAllCheckbox" class="checkboxContainer">
          <input type="checkbox" @change="selectAllHandler" v-model="selectAllFieldValue" />
          <span class="checkmark"></span>
        </label>
        <i v-if="filter" class="fas fa-filter" :class="{activeCurrentView: filtersVisible}" @click="changeFilterHandler"></i>
        <i v-if="thumbnailView" class="fas fa-th" @click="changeCurrentViewHandler('grid')"></i>
        <i v-if="listView" class="fas fa-list activeCurrentView"></i>
      </div>

      <template 
       v-if="itemsObjects?.data?.length"
      >
    <div
      v-for="item in getItems()"
      :key="item.id"
      class="liFilterCategories gs_lib"
      :class="{'dx-draggable-dragging': isDragStarted === item.id}"
      draggable="true"
      @dragstart="startDrag($event, item)"
      @dragleave="dragleave()"
      >
      <div>
         <label class="checkboxContainer">
          <input type="checkbox" @change="onItemChangeHandler(item)" :checked="isItemMarked(item.id)"/>
          <span class="checkmark"></span>
        </label>
        <p class="checkboxTitle" @click="onItemChangeHandler(item)">{{item.name}}</p>
      </div>
      </div>
      </template>
      <h2 v-else class="emptyData">No data found!</h2>
    </div>

      <div class="selectItemLineSection">
        <div class="selectedLine"></div>
        <i class="fas fa-caret-right assing_to_right" @click="selectItemHandler"></i>
        <div class="selectedLine"></div>
      </div>


      <div class="gsSelectedContainer"
       @drop="onDrop($event)"
        @dragenter.prevent
        @dragover.prevent
        >
      <p class="gsTitle">Selected</p>
    <template  
      v-for="(item, idx) in getCurrentSelected()"
      :key="item.id"
      @dragenter.prevent
      @dragover.prevent
      class="selectedZIndex"
      >
      <div 
      class="liFilterCategories gs_lib"
      :class="{'dx-draggable-dragging': isDragStarted === item.id, 'isDragOver': dragOverIndex === idx}"
      draggable="true"
      @dragstart="startDrag($event, item)"
      @dragleave="dragleave()"
      @dragover="ondragover($event, idx)"
      @dragenter.prevent
      @drop="onDrop($event, idx)"
      >
      <div>
        <p class="checkboxTitleSelcted"  @click="onItemChangeHandler(item)"> 
          {{idx+1}}
          {{item.name}}</p>
      </div>
      </div>
      </template>
          </div>


    </div>
      </div>

</template>

<script>
import AlphabtsArray from '../../data/alphabets.json';
import {array_move} from '../../utils'
import _ from 'lodash';

export default {
    name: "ListView",
    props: [
      "closeModal",
      "currentView",
      "filtersVisible",
      "allowMultiple",
      "currentlySelected",
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
      "loadDataFilteredData",
      "itemsObjects",
      "currentlySelectedHandler",
      "currentlySelectedCache",
      "changeCurrentViewHandler",
      "changeFilterHandler",
      "loadMoreItems"
    ],
    data(){
      return {
        AlphabtsArrayData: [],
        fromInput: "",
        toInput: "",
        categories: [],
        title: "",
        timeout: null,
        markedItems: [],
        selectAllFieldValue: false,
        isDragStarted: "",
        dragOverIndex: ''
      }
    },
    methods: {
      getCategoryFilterData(){
        if( this.filterObjects?.filters ) {
          const category_filters = this.filterObjects?.filters.filter( item => item.key === "category" )
          return category_filters[0];
        }
        return []
      },
      isCatetgorySelected(id){
        const index = this.categories.findIndex(elem => elem.key === id)
        if(index > -1) return true
        else return false
      },
      getFilterExtension(){
        const categoriesString = this.categories.map(_category => _category.key);
        return `/?category=${categoriesString.toString()}&title=${this.title}&from=${this.fromInput}&to=${this.toInput}"`
      },
      onChangeHandler(e){
        const { name , value } = e.target;
        this[name] = value;
        const extension = this.getFilterExtension();
        this.loadDataFilteredData(extension);
      },
    async onCategoryHandler(_category){
         const index = this.categories.findIndex(elem => elem.key === _category.key)
        if(index > -1){
          this.categories.splice(index, 1)
        }else{
          this.categories.push({
            ..._category
          })
        }
        const extension = this.getFilterExtension();
        this.loadDataFilteredData(extension);
      },
      onKeyup(e){
       clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.onChangeHandler(e)
        }, 200);
      },
      alphabetsChangeHanlder(_alphabet){
        const index = this.title.indexOf(_alphabet)
        if(index < 0) {
          this.title += _alphabet
          const extension = this.getFilterExtension();
           this.loadDataFilteredData(extension);
          }     
      },
      clearData(fieldName){
        if(fieldName === "categories") this.categories = []
        if(fieldName === "title") this.title = ""
        if( fieldName ===  'lastUpdated'){ 
          this.fromInput = ''; 
          this.toInput = ''; 
        }
        const extension = this.getFilterExtension();
        this.loadDataFilteredData(extension);
      },
      isItemMarked(_id){
        const index = this.markedItems.findIndex(elem => elem.id === _id);
        if( index > -1 ) return true
        return false
      },
       getItems(){
        const result = [];
        this.itemsObjects?.data?.map(item => {
          const index = this.currentlySelectedCache?.findIndex(_item => _item.id === item.id)
          if( index === -1 ) result.push({...item})
          return item
        })
        return result
      },
      onItemChangeHandler(item){
        const index = this.markedItems.findIndex(elem => elem.id === item.id)
        if( index < 0 ) {
          this.markedItems.push({...item})
        }
        else
          this.markedItems.splice(index, 1)
      },
      selectAllHandler(){
        if(!this.selectAllFieldValue){
          this.markedItems = []
          }else{
            this.markedItems = this.getItems();
          }
      },
       selectItemHandler(){
         const clonedArray = _.cloneDeep(this.currentlySelectedCache);
         Array.prototype.push.apply(clonedArray, this.markedItems);
         this.currentlySelectedHandler(clonedArray)
         this.markedItems = []
      },
      getCurrentSelected(){
        return this.currentlySelectedCache
      },
      startDrag (evt, item) {
        this.isDragStarted = item.id
        evt.dataTransfer.dropEffect = 'move'
        evt.dataTransfer.effectAllowed = 'move'
        evt.dataTransfer.setData('itemID', item.id)
      },
      onDrop (evt, idx) {
        evt.stopPropagation();
        this.dragOverIndex = "";
        const itemID = evt.dataTransfer.getData('itemID');
        const clonedArray = _.cloneDeep(this.currentlySelectedCache);
        let item = this.getItems().find(item => item.id === Number(itemID))
        if(idx === undefined && !item ) return
        if(idx === undefined) {
          Array.prototype.push.apply(clonedArray, this.markedItems);
          clonedArray.push({...item})
          this.currentlySelectedHandler(clonedArray)
          return
        }
        const index = clonedArray.findIndex(item => item.id === Number(itemID));
        if(index === -1) {
          clonedArray.splice(idx, 0, item);
          this.currentlySelectedHandler(clonedArray);
          return
        }
        const updatedSelectedArray =  array_move(clonedArray, index, idx);
        this.currentlySelectedHandler(updatedSelectedArray)
      },
      onDropRemoveSelected (evt) {
        const itemID = evt.dataTransfer.getData('itemID')
        const clonedArray = _.cloneDeep(this.currentlySelectedCache);
        const updatedSelectedArray = clonedArray.filter(item => item.id !== Number(itemID))
         this.currentlySelectedHandler(updatedSelectedArray)
      },
      ondragover(evt, idx){
        evt.preventDefault();
        this.dragOverIndex = idx

      },
      dragleave(){
        this.isDragStarted = ""
        this.dragOverIndex = ""
      }
    },
    async mounted() {
      const scrollDiv = document.querySelector('#scrollComponent');
       // eslint-disable-next-line no-unused-vars
       scrollDiv.addEventListener('scroll', e => {
         const totalScroll = Math.round(scrollDiv.scrollTop + scrollDiv.clientHeight); 
      if( totalScroll >= scrollDiv.scrollHeight) {
        this.loadMoreItems();
      }
    });
      await this.loadData()
      this.AlphabtsArrayData = AlphabtsArray
       this.getCategoryFilterData()?.values.map(_category => {
        if(_category.selected){
          this.categories.push({
            ..._category
          })
        }
      } )
    },
    unmounted(){
      this.currentlySelectedHandler([], true);
    }
}
</script>


<style scoped>
.gridScreenBody {
  height: auto;
  max-height: 78%;
  min-height: 78%;
    }
.emptyData {
    color: #fff;
  }
.isDragOver {
  background-color: lightblue;
}

.selectedZIndex {
  z-index: 1;
}

.gridScreenBodyContainer {
        width: 92%;
        margin: auto;
        padding: 20px 0;
        display: grid;
        grid-template-areas: "filter filter library library library divider selected selected selected";
        grid-gap: 2em;
        grid-template-rows: 510px 100%;
      }

  .selectedLine {
    width: 3px;
    background-color: #FCB13B;
    height: 43%;
    margin: auto;
  }
  .assing_to_right {
    color: #FCB13B;
    margin: 10px auto;
    font-size: 50px;
    cursor: pointer;
  }

      .gridScreenFilterSection {
        display: flex;
        gap: 20px;
      }

      .gsfilterContainer {
        grid-area: filter;
        max-height: 100%;
        overflow: auto;
      }
      .gsTitle {
        margin: 0px;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        text-align: left;
      }
      .gsLibraryContainer {
        grid-area: library;
        max-height: 100%;
        overflow: auto;
      }

      .gsSelectedContainer {
        grid-area: selected;
        max-height: 100%;
        overflow: auto;
      }

      .gsContentContainer {
        width: 100%;
        max-width: 280px;
      }

      .gsfilterTitle {
        float: left;
        color: #8d8d8c;
        font-size: 18px;
        font-weight: 900;
        flex: 2;
        text-align: left;
      }
      .gsfilterClear {
        float: right;
        color: #fff;
        cursor: pointer;
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

      .gsfilterCategory {
        display: flex;
      }

      .liFilterCategories {
        display: flex;
        color: white;
        font-size: 16px;
        font-weight: 600;
        gap: 1em;
        margin-bottom: 10px;
      }

      .checkboxTitle {
        margin: 0px;
        cursor: pointer;
      }

      .checkboxTitleSelcted {
        margin: 0px;
        cursor: pointer;
        margin-left: 0% !important;
      }

      /* ################## */
      .Checkbox-showless p {
        color: white;
        padding: 17px 0px 0px 0px;
        font-weight: bold;
        text-align: left;
      }
      .gs_lib {
        margin-top: 17px;
        width: 100%;
        height: 40px;
        border-bottom: 2px solid #9d9d9c;
        cursor: grab;
      }
      .gs_lib > div {
        height: 100%;
        width: 100%;
      }
      .gs_lib > div > label > span {
        left: 10px;
        top: 10px;
      }
       .gs_lib p {
         margin-top: 2%;
        text-align: left;
        margin-left: 10%;
      }
      .dx-draggable-dragging > div{
          background-color: black !important;
          border: 2px solid black !important;
      }
      .liBorder {
        border-bottom: 1px solid grey;
      }
            
      .gs_para {
        color: white;
        margin-left: 10px;
        text-align: left;
      }
      li.gs_litext {
        color: white;
        list-style: auto;
        margin-left: -24px;
      }
      ul.gs_ulmenu {
        margin-top: -5px;
      }

  table {
    color: #fff;
    margin: 0px;
    width: 100%;
  }
  th {
    text-align: left;
  }

  .alphabetsFilter table {
    color: #8d8d8c;
  }
  
  .alphabetsFilter table tbody tr{
   height: 30px;
  }
   .alphabetsFilter table tbody tr td{
     cursor: pointer;
  }

  .selectedAphabets {
    color: #fff;
  }

  .gridScreenFilterSection i {
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
      .activeCurrentView {
        color: #fcb13b !important;
      }
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #575757; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
}
</style>