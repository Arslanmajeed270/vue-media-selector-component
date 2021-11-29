<template>
  <div class="col-left">
    <div class="checkbox-list">
      <div class="top-left">
        <ul>
          <li class="library">Library</li>
          <li v-if="selectAllCheckbox">
            <a class="btn btn-transparent">
              <label v-if="selectAllCheckbox" class="checkboxContainer">
                <input
                  type="checkbox"
                  @change="selectAllHandler"
                  v-model="selectAllFieldValue"
                />
                <span class="checkmark"></span>
              </label>
            </a>
          </li>
          <li v-if="filter">
            <a class="btn"
              ><i
                :class="{ activeCurrentView: filtersVisible }"
                @click="changeFilterHandler()"
                class="fa fa-filter"
                aria-hidden="true"
              ></i
            ></a>
          </li>
          <li v-if="thumbnailView">
            <a class="btn"
              ><i
                class="fa fa-th"
                aria-hidden="true"
                @click="changeCurrentViewHandler('grid')"
              ></i
            ></a>
          </li>
          <li v-if="listView">
            <a class="btn"
              ><i
                @click="changeCurrentViewHandler('list')"
                class="fa fa-bars activeCurrentView"
                aria-hidden="true"
              ></i
            ></a>
          </li>
        </ul>
      </div>
      <form class="check-form" action="/action_page.php">
        <div
          class="left-check"
          id="scrollComponent"
          @drop="onDropRemoveSelected($event)"
          @dragenter.prevent
          @dragover.prevent
        >
          <ul v-if="itemsObjects?.data?.length">
            <li
              v-for="item in getItems()"
              :key="item.id"
              :class="{ 'dx-draggable-dragging': isDragStarted === item.id }"
              draggable="true"
              @dragstart="startDrag($event, item)"
              @dragleave="dragleave()"
            >
              <label class="checkboxContainer" style="padding-left: 30px">
                <input
                  type="checkbox"
                  @change="onItemChangeHandler(item)"
                  :checked="isItemMarked(item.id)"
                />
                <span class="checkmark"></span>
                {{ item.name }}
              </label>
            </li>
          </ul>
          <h2 v-else class="emptyData">No data found!</h2>
        </div>
      </form>
    </div>
  </div>
  <div class="middle-line">
    <div class="line"></div>
    <div class="wordwrapper">
      <i
        class="fa fa-2x fa-play"
        @click="selectItemHandler"
        style="cursor: pointer"
        aria-hidden="true"
      ></i>
    </div>
  </div>
  <div
    class="col-right"
    @drop="onDrop($event)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div>
      <div class="top-right">
        <p>Selected</p>
      </div>
      <ol>
        <li
          v-for="(item, idx) in getCurrentSelected()"
          :key="item.id"
          class="selectedZIndex"
          :class="{
            'dx-draggable-dragging': isDragStarted === item.id,
            isDragOver: dragOverIndex === idx,
          }"
          draggable="true"
          @dragstart="startDrag($event, item)"
          @dragleave="dragleave()"
          @dragover="ondragover($event, idx)"
          @dragenter.prevent
          @drop="onDrop($event, idx)"
        >
          {{ item.name }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { array_move } from "../../utils";
import _ from "lodash";

export default {
  name: "ListView",
  props: [
    "filtersVisible",
    "allowMultiple",
    // Items Hidden
    "selectAllCheckbox",
    "filter",
    "listView",
    "thumbnailView",

    "loadData",
    "itemsObjects",
    "currentlySelectedHandler",
    "currentlySelectedCache",
    "changeCurrentViewHandler",
    "changeFilterHandler",
    "loadMoreItems",
    "loadDefaultSelectedFilters",
  ],
  data() {
    return {
      markedItems: [],
      selectAllFieldValue: false,
      isDragStarted: "",
      dragOverIndex: "",
    };
  },
  methods: {
    isItemMarked(_id) {
      const index = this.markedItems.findIndex((elem) => elem.id === _id);
      if (index > -1) return true;
      return false;
    },
    getItems() {
      const result = [];
      this.itemsObjects?.data?.map((item) => {
        const index = this.currentlySelectedCache?.findIndex(
          (_item) => _item.id === item.id
        );
        if (index === -1) result.push({ ...item });
        return item;
      });
      return result;
    },
    onItemChangeHandler(item) {
      const index = this.markedItems.findIndex((elem) => elem.id === item.id);
      if (index < 0) {
        this.markedItems.push({ ...item });
      } else this.markedItems.splice(index, 1);
    },
    selectAllHandler() {
      if (!this.allowMultiple) return;
      if (!this.selectAllFieldValue) {
        this.markedItems = [];
      } else {
        this.markedItems = this.getItems();
      }
    },
    selectItemHandler() {
      const clonedArray = _.cloneDeep(this.currentlySelectedCache);
      Array.prototype.push.apply(clonedArray, this.markedItems);
      this.currentlySelectedHandler(clonedArray);
      this.markedItems = [];
    },
    getCurrentSelected() {
      return this.currentlySelectedCache;
    },
    startDrag(evt, item) {
      this.isDragStarted = item.id;
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
    onDrop(evt, idx) {
      evt.stopPropagation();
      this.dragOverIndex = "";
      const itemID = evt.dataTransfer.getData("itemID");
      const clonedArray = _.cloneDeep(this.currentlySelectedCache);
      let item = this.getItems().find((item) => item.id === Number(itemID));
      if (idx === undefined && !item) return;
      if (idx === undefined) {
        Array.prototype.push.apply(clonedArray, this.markedItems);
        clonedArray.push({ ...item });
        this.currentlySelectedHandler(clonedArray);
        return;
      }
      const index = clonedArray.findIndex((item) => item.id === Number(itemID));
      if (index === -1) {
        clonedArray.splice(idx, 0, item);
        this.currentlySelectedHandler(clonedArray);
        return;
      }
      const updatedSelectedArray = array_move(clonedArray, index, idx);
      this.currentlySelectedHandler(updatedSelectedArray);
    },
    onDropRemoveSelected(evt) {
      const itemID = evt.dataTransfer.getData("itemID");
      const clonedArray = _.cloneDeep(this.currentlySelectedCache);
      const updatedSelectedArray = clonedArray.filter(
        (item) => item.id !== Number(itemID)
      );
      this.currentlySelectedHandler(updatedSelectedArray);
    },
    ondragover(evt, idx) {
      evt.preventDefault();
      this.dragOverIndex = idx;
    },
    dragleave() {
      this.isDragStarted = "";
      this.dragOverIndex = "";
    },
  },
  async mounted() {
    const scrollDiv = document.querySelector("#scrollComponent");
    // eslint-disable-next-line no-unused-vars
    scrollDiv.addEventListener("scroll", (e) => {
      const totalScroll = Math.round(
        scrollDiv.scrollTop + scrollDiv.clientHeight
      );
      if (totalScroll >= scrollDiv.scrollHeight) {
        this.loadMoreItems();
      }
    });
    await this.loadData();
    this.loadDefaultSelectedFilters();
  },
};
</script>

<style scoped>
.emptyData {
  color: #fff;
}
.isDragOver {
  background-color: lightblue;
}

.selectedZIndex {
  z-index: 1;
}

.selectedLine {
  width: 3px;
  background-color: #fcb13b;
  height: 43%;
  margin: auto;
}

/* checkbox */
.checkboxContainer {
  display: block;
  position: relative;
  padding-left: 15px;
  cursor: pointer;
  font-size: 14px;
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
  height: 13px;
  width: 13px;
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
  top: 1px;
  width: 3px;
  height: 7px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

/* end checkbox */

.dx-draggable-dragging {
  background-color: black !important;
  border: 2px solid black !important;
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
