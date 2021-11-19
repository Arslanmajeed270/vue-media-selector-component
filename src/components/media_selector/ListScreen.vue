<template>
 <div class="gridScreenBodyContainer">

    <div  class="gsfilterContainer">
      <div v-show="filtersVisible" class="gsContentContainer">
        <p class="gsTitle">Filter</p>
        <div class="gsfilterCategory">
          <p class="gsfilterTitle">Category</p>
          <p class="gsfilterClear">Clear</p>
        </div>
        <div class="liFilterCategories"
         v-for="singleFilter in getCategoryFilterData()?.values"
        :key="singleFilter.key"
        >
          <label class="checkboxContainer">
            <input type="checkbox" :id="singleFilter.key" :checked="singleFilter.selected" />
            <span class="checkmark"></span>
          </label>
          <p class="checkboxTitle">{{singleFilter.value}}</p>
        </div>        
  
        <br />
        <div class="Checkbox-showless">
          <p>Showless</p>
        </div>
        <div>
          <div class="gsfilterCategory">
            <p class="gsfilterTitle">Title</p>
            <p class="gsfilterClear">Clear</p>
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
          <p class="gsfilterClear">Clear</p>
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
                <label for="sname">To</label>
              </th>
              <td>
              <input type="text" @change="onKeyup" v-model="toInput" name="sname">
              </td>
            </tr>
          </table>

          </form>
        </div>
      </div>
    </div>

    <div class="gsLibraryContainer">
      <div class="gridScreenFilterSection">
        <p class="gsTitle">Library</p>
        <label v-if="selectAllCheckbox" class="checkboxContainer">
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <img v-if="filter" src="../../assets/filter-solid.svg" width="15" alt="checkbox" />
        <img v-if="thumbnailView" src="../../assets/th-solid.svg" width="15" alt="checkbox" />
        <img v-if="listView" src="../../assets/list-solid.svg" width="15" alt="checkbox" />
      </div>
      <my-component  
      v-for="item in itemsObjects?.data"
      :key="item.id">
        <div class="liFilterCategories gs_lib"
      >
        <label class="checkboxContainer">
          <input type="checkbox"/>
          <span class="checkmark"></span>
        </label>
        <p class="checkboxTitle">{{item.name}}</p>
      </div>
      <div class="liBorder"></div>
      </my-component>
    </div>

    <div class="selectItemLineSection">
      <div class="selectedLine"></div>
      <i class="fas fa-caret-right assing_to_right"></i>
      <div class="selectedLine"></div>
    </div>
    </div>
</template>

<script>
import AlphabtsArray from '../../data/alphabets.json';

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
      "changeCurrentViewHandler"
    ],
    data(){
      return {
        AlphabtsArrayData: [],
        fromInput: "",
        toInput: "",
        timeout: null
      }
    },
    methods: {
      getCategoryFilterData(){
        if( this.filterObjects?.filters ) {
          const category_filters = this.filterObjects?.filters.filter( item => item.key === "category" )
          console.log('checking category_filters: ', category_filters)
          return category_filters[0];
        }
        return []
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
    },
      async mounted() {
     await this.loadData()
     console.log('checking AlphabtsArray: ', AlphabtsArray);
     this.AlphabtsArrayData = AlphabtsArray
    },
    unmounted(){
      this.currentlySelectedHandler([], true)
    }
}
</script>


<style scoped>

.gridScreenBodyContainer {
        width: 92%;
        margin: auto;
        padding: 20px 0;
        display: grid;
        grid-template-areas: "filter filter library library library divider selected selected selected";
        grid-gap: 2em;
      }

  .selectedLine {
    width: 3px;
    background-color: #FCB13B;
    height: 45%;
    margin: auto;
  }
  .assing_to_right {
    color: #FCB13B;
    margin: 20px auto;
    font-size: 50px;
    cursor: pointer;
  }

      .gridScreenFilterSection {
        display: flex;
        gap: 20px;
      }

      .gsfilterContainer {
        grid-area: filter;
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
      }

      .gsSelectedContainer {
        grid-area: selected;
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

      /* ################## */
      .Checkbox-showless p {
        color: white;
        padding: 17px 0px 0px 0px;
        font-weight: bold;
        text-align: left;
      }
      .gs_lib {
        margin-top: 17px;
      }
      .liBorder {
        border-bottom: 1px solid grey;
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
</style>