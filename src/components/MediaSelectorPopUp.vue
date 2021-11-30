<template>
  <!-- The Modal -->
  <div
    v-show="showModal"
    id="myModal"
    :style="[
      {
        'max-width': popUpMaxWidth ?? '100%',
        'max-height': popUpMaxHeight ?? '100%',
      },
    ]"
    class="modal"
  >
    <!-- Modal content -->
    <div class="modal-content">
      <section>
        <div class="row">
          <div class="col-h">
            <div class="reference">
              <h1>{{ popupTitle }}</h1>
            </div>
          </div>
          <div class="col-h2">
            <div class="selectdiv" v-show="orderDirection">
              <select
                class="theme-construction"
                @change="onChangeHandler($event)"
                name="orderDirectionValue"
                v-model="orderDirectionValue"
              >
                <option value="Order descending">Order descending</option>
                <option value="Order Ascending">Order Ascending</option>
              </select>
            </div>
            <div class="selectdiv" v-show="orderField">
              <select
                class="theme-construction"
                name="orderFieldValue"
                @change="onChangeHandler($event)"
                v-model="orderFieldValue"
              >
                <option
                  v-for="order in filterObjects?.orders"
                  :key="order.key"
                  :value="order.key"
                >
                  {{ order.value }}
                </option>
              </select>
            </div>
            <div class="searchdiv" v-show="searchBox">
              <input
                class="search"
                type="search"
                name="searchFieldValue"
                @keypress="onKeyup"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="row2">
          <div v-if="filtersVisible" class="col-small">
            <div class="top-small">
              <p>Filter</p>
            </div>
            <div class="filter-container-wrapper">
              <div class="sec-checkbox">
                <div class="catagory">
                  <p class="catagoryp">Catgory</p>
                  <p class="clear" @click="clearData('categories')">Clear</p>
                </div>
                <form action="/action_page.php">
                  <ul>
                    <template
                      v-for="(singleFilter, index) in getCategoryFilterData()
                        ?.values"
                      :key="singleFilter.key"
                    >
                      <li
                        v-if="
                          (!categoryShowMore && index < 3) || categoryShowMore
                        "
                      >
                        <label class="checkboxContainer">
                          <input
                            type="checkbox"
                            :id="singleFilter.key"
                            @change="onCategoryHandler(singleFilter)"
                            :checked="isCatetgorySelected(singleFilter.key)"
                          />
                          <span class="checkmark"></span>
                          {{ singleFilter.value }}
                        </label>
                      </li>
                    </template>
                  </ul>
                  <div class="Checkbox-showless">
                    <p @click="categoryShowMore = !categoryShowMore">
                      {{ categoryShowMore ? "Show less" : "Show More" }}
                    </p>
                  </div>
                </form>
              </div>

              <div v-if="currentView === 'grid'" class="sec-checkbox">
                <div class="catagory">
                  <p class="catagoryp">File type</p>
                  <p class="clear" @click="clearData('fileTypes')">Clear</p>
                </div>
                <form action="/action_page.php">
                  <ul>
                    <template
                      v-for="(singleFilter, index) in getFileTypeFilterData()
                        ?.values"
                      :key="singleFilter.key"
                    >
                      <li
                        v-if="
                          (!filterTypesShowMore && index < 3) ||
                          filterTypesShowMore
                        "
                      >
                        <label class="checkboxContainer">
                          <input
                            type="checkbox"
                            :id="singleFilter.key"
                            @change="onFilterTypeHandler(singleFilter)"
                            :checked="isFileTypeSelected(singleFilter.key)"
                          />
                          <span class="checkmark"></span>
                          {{ singleFilter.value }}
                        </label>
                      </li>
                    </template>
                  </ul>
                  <div class="Checkbox-showless">
                    <p @click="filterTypesShowMore = !filterTypesShowMore">
                      {{ filterTypesShowMore ? "Show less" : "Show More" }}
                    </p>
                  </div>
                </form>
              </div>

              <!-- <div class="sec-checkbox">
       
          <div class="catagory">
              <p class="catagoryp">Catgory</p>
              <p class="clear">Clear</p>
          </div>
          <form action="/action_page.php">
              <ul>
                  <li>
                      <span class="fa fa-star "></span>
                    
                  </li>
                  <li>
                      <span class="fa fa-star "></span>
                      <span class="fa fa-star "></span>
                      <span class="fa fa fa-star-o"></span>
                      <span class="fa fa fa-star-o"></span>
                      <span class="fa fa fa-star-o"></span>
                  </li>
                  <li>
                      <span class="fa fa fa-star"></span>
                      <span class="fa fa fa-star"></span>
                      <span class="fa fa fa-star"></span>
                  </li>
                  <li>
                      <span class="fa fa fa-star"></span>
                      <span class="fa fa fa-star"></span>
                      <span class="fa fa fa-star"></span>
                      <span class="fa fa fa-star"></span>
                  </li>
                  <li>
                      <span class="fa fa fa-star"></span>
                      <span class="fa fa fa-star"></span>
                      <span class="fa fa fa-star"></span>
                      <span class="fa fa fa-star"></span>
                      <span class="fa fa fa-star"></span>
                  </li>
                
                
                  <li>
                      <span class="small">Show sll</span>
                  </li>
              </ul>
          </form>
      </div> -->

              <div v-if="currentView === 'list'" class="sec-checkbox">
                <div class="catagory">
                  <p class="catagoryp">Title</p>
                  <p class="clear" @click="clearData('title')">Clear</p>
                </div>
                <div class="alphabetsFilter">
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
                            selectedAphabets: title.indexOf(abc) > -1,
                          }"
                          @click="alphabetsChangeHanlder(abc)"
                        >
                          {{ abc }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="sec-checkbox">
                <div class="catagory">
                  <p class="catagoryp" style="text-align: left">Last Update</p>
                  <p
                    class="clear"
                    @click="clearData('lastUpdated')"
                    style="margin-left: 40px"
                  >
                    Clear
                  </p>
                </div>
                <form action="#">
                  <label class="form" for="fromInput">Form </label>
                  <input
                    class="inform"
                    type="text"
                    size="12"
                    @keypress="onKeyup($event, true)"
                    v-model="fromInput"
                    name="fromInput"
                  />
                  <br />
                  <label class="id" for="toInput">Id </label>
                  <input
                    class="inid"
                    type="text"
                    size="12"
                    @keypress="onKeyup($event, true)"
                    v-model="toInput"
                    name="toInput"
                  />
                </form>
              </div>
            </div>
          </div>

          <!-- ******  Start body section ***** -->
          <template v-if="showModal && currentView === 'grid'">
            <GridScreen
              :allowMultiple="allowMultiple"
              :iconMappings="iconMappings"
              :filtersVisible="filtersVisible"
              :selectAllCheckbox="selectAllCheckbox"
              :filter="filter"
              :listView="listView"
              :thumbnailView="thumbnailView"
              :itemsObjects="itemsObjects"
              :loadData="loadData"
              :currentlySelectedCache="currentlySelectedCache"
              :currentlySelectedHandler="currentlySelectedHandler"
              :changeCurrentViewHandler="changeCurrentViewHandler"
              :loadMoreItems="loadMoreItems"
              :changeFilterHandler="changeFilterHandler"
              :loadDefaultSelectedFilters="loadDefaultSelectedFilters"
            />
          </template>
          <template v-if="showModal && currentView === 'list'">
            <ListScreen
              :filtersVisible="filtersVisible"
              :allowMultiple="allowMultiple"
              :selectAllCheckbox="selectAllCheckbox"
              :filter="filter"
              :listView="listView"
              :thumbnailView="thumbnailView"
              :itemsObjects="itemsObjects"
              :loadData="loadData"
              :currentlySelectedCache="currentlySelectedCache"
              :currentlySelectedHandler="currentlySelectedHandler"
              :changeCurrentViewHandler="changeCurrentViewHandler"
              :changeFilterHandler="changeFilterHandler"
              :loadMoreItems="loadMoreItems"
              :loadDefaultSelectedFilters="loadDefaultSelectedFilters"
            />
          </template>
        </div>
      </section>
      <footer>
        <hr />
        <div class="closebtn">
          <button class="btn" @click="closeButtonHandler()">
            {{ cancelButtonText }}
          </button>
          <button class="btn" @click="onSaveHandler(currentlySelectedCache)">
            {{ okButtonText }}
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import GridScreen from "./media_selector/GridScreen.vue";
import ListScreen from "./media_selector/ListScreen.vue";
import { getFilterData, getItemData } from "../service";
import _ from "lodash";
import AlphabtsArray from "../data/alphabets.json";

export default {
  name: "MediaSelectorPopUp",
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

    "urls",
  ],
  data() {
    return {
      AlphabtsArrayData: [],
      filterObjects: {},
      itemsObjects: {},
      orderDirectionValue: "Order descending",
      orderFieldValue: "",
      searchFieldValue: "",
      currentlySelectedCache: [],
      timeout: null,
      loading: false,
      categories: [],
      fileTypes: [],
      title: "",
      fromInput: "",
      toInput: "",
      categoryShowMore: true,
      filterTypesShowMore: true,
    };
  },
  methods: {
    async loadData() {
      const filterResult = await getFilterData(
        this.urls.filterUrl +
          `?orderDirection=${this.orderDirectionValue}&orderField=${this.orderFieldValue}&searchBox=${this.searchFieldValue}`
      );
      if (filterResult !== "No result found!")
        this.filterObjects = filterResult;
      const itemResult = await getItemData(
        this.urls.itemUrl +
          `?orderDirection=${this.orderDirectionValue}&orderField=${this.orderFieldValue}&searchBox=${this.searchFieldValue}`
      );
      if (itemResult !== "No result found!") this.itemsObjects = itemResult;
      if (this.orderFieldValue === "") {
        filterResult.orders.map((order) => {
          if (order.default) this.orderFieldValue = order.key;
          return order;
        });
      }
    },
    async loadDataFilteredData(extension) {
      const filterResult = await getFilterData(this.urls.filterUrl + extension);
      if (filterResult !== "No result found!")
        this.filterObjects = filterResult;
      const itemResult = await getItemData(this.urls.itemUrl + extension);
      if (itemResult !== "No result found!") this.itemsObjects = itemResult;
    },
    async onChangeHandler(e, isFilter) {
      const { name, value } = e.target;
      this[name] = value;
      if (isFilter) {
        const extension = this.getFilterExtension();
        this.loadDataFilteredData(extension);
      } else {
        await this.loadData();
      }
    },
    onKeyup(e, isFilter) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.onChangeHandler(e, isFilter);
      }, 200);
    },
    currentlySelectedHandler(updatedObject, isDefault) {
      const clonedCurrentlySelected = _.cloneDeep(this.currentlySelected);
      if (isDefault && !this.allowMultiple) {
        this.currentlySelectedCache = [clonedCurrentlySelected[0]];
      } else if (isDefault)
        this.currentlySelectedCache = clonedCurrentlySelected;
      else this.currentlySelectedCache = updatedObject;
    },
    loaded() {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    async loadMoreItems() {
      if (
        this.loading ||
        !this.itemsObjects ||
        !this.itemsObjects.next_page_url
      )
        return;
      this.loading = true;
      const itemResult = await getItemData(
        this.itemsObjects?.next_page_url +
          `&orderDirection=${this.orderDirectionValue}&orderField=${this.orderFieldValue}&searchBox=${this.searchFieldValue}`
      );
      if (itemResult === "No result found!") return this.loaded();
      if (
        itemResult.data.length + this.itemsObjects.data.length >
        itemResult.per_page
      ) {
        this.itemsObjects = itemResult;
        return this.loaded();
      }
      itemResult.data = [...this.itemsObjects.data, ...itemResult.data];
      this.itemsObjects = itemResult;
      this.loaded();
    },
    clearData(fieldName) {
      if (fieldName === "categories") this.categories = [];
      if (fieldName === "fileTypes") this.fileTypes = [];
      if (fieldName === "title") this.title = "";
      if (fieldName === "lastUpdated") {
        this.fromInput = "";
        this.toInput = "";
      }
      const extension = this.getFilterExtension();
      this.loadDataFilteredData(extension);
    },
    getFilterExtension() {
      const categoriesString = this.categories.map(
        (_category) => _category.key
      );
      const fileTypesString = this.fileTypes.map((_fileType) => _fileType.key);
      return `/?category=${categoriesString.toString()}&title=${
        this.title
      }&from=${this.fromInput}&to=${
        this.toInput
      }&fileTypes=${fileTypesString}"`;
    },
    getCategoryFilterData() {
      if (this.filterObjects?.filters) {
        const category_filters = this.filterObjects?.filters.filter(
          (item) => item.key === "category"
        );
        return category_filters[0];
      }
      return [];
    },
    isCatetgorySelected(id) {
      const index = this.categories.findIndex((elem) => elem.key === id);
      if (index > -1) return true;
      else return false;
    },
    getFileTypeFilterData() {
      if (this.filterObjects?.filters) {
        const fileType_filters = this.filterObjects?.filters.filter(
          (item) => item.key === "fileTypes"
        );
        return fileType_filters[0];
      }
      return [];
    },
    isFileTypeSelected(id) {
      const index = this.fileTypes.findIndex((elem) => elem.key === id);
      if (index > -1) return true;
      else return false;
    },
    async onCategoryHandler(_category) {
      const index = this.categories.findIndex(
        (elem) => elem.key === _category.key
      );
      if (index > -1) {
        this.categories.splice(index, 1);
      } else {
        this.categories.push({
          ..._category,
        });
      }
      const extension = this.getFilterExtension();
      this.loadDataFilteredData(extension);
    },
    async onFilterTypeHandler(_filterType) {
      const index = this.fileTypes.findIndex(
        (elem) => elem.key === _filterType.key
      );
      if (index > -1) {
        this.fileTypes.splice(index, 1);
      } else {
        this.fileTypes.push({
          ..._filterType,
        });
      }
      const extension = this.getFilterExtension();
      this.loadDataFilteredData(extension);
    },

    alphabetsChangeHanlder(_alphabet) {
      const index = this.title.indexOf(_alphabet);
      if (index < 0) {
        this.title += _alphabet;
        const extension = this.getFilterExtension();
        this.loadDataFilteredData(extension);
      }
    },
    closeButtonHandler() {
      this.currentlySelectedHandler([], true);
      this.closeModal();
    },
    loadDefaultSelectedFilters() {
      this.getCategoryFilterData()?.values?.map((_category) => {
        if (_category.selected) {
          this.categories.push({
            ..._category,
          });
        }
      });
      this.getFileTypeFilterData()?.values.map((_filterType) => {
        if (_filterType.selected) {
          this.fileTypes.push({
            ..._filterType,
          });
        }
      });
    },
  },
  components: {
    GridScreen,
    ListScreen,
  },
  mounted() {
    if (this.currentlySelected?.length) {
      const clonedCurrentlySelected = _.cloneDeep(this.currentlySelected);
      if (!this.allowMultiple) {
        this.currentlySelectedCache = [clonedCurrentlySelected[0]];
      } else {
        this.currentlySelectedCache = _.cloneDeep(this.currentlySelected);
      }
    }
    this.AlphabtsArrayData = AlphabtsArray;
  },
};
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
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  color: #ffffff;
  /* background-color: #fefefe; */
  background-color: rgb(112 112 112);
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 95%;
  height: 95%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
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

.modal-body {
  padding: 2px 16px;
}

.modal-footer {
  padding: 2px 16px;
  color: white;
}

/* checkbox */
.checkboxContainer {
  display: block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  font-size: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

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
  height: 12px;
  width: 12px;
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
  left: 4px;
  top: 0px;
  width: 4px;
  height: 7px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

/* end checkbox */

.Checkbox-showless p {
  color: white;
  padding: 5px 0px 0px 0px;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
}
.alphabetsFilter table {
  color: #8d8d8c;
}

.alphabetsFilter table tbody tr {
  height: 30px;
}
.alphabetsFilter table tbody tr td {
  cursor: pointer;
}

.selectedAphabets {
  color: #fff;
}
</style>
