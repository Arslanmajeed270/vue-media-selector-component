<template>
  <div class="main-content">
    <div class="checkbox-list">
      <div class="top-left">
        <ul>
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
              ><i class="fa fa-th activeCurrentView" aria-hidden="true"></i
            ></a>
          </li>
          <li v-if="listView">
            <a class="btn"
              ><i
                @click="changeCurrentViewHandler('list')"
                class="fa fa-bars"
                aria-hidden="true"
              ></i
            ></a>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="img-div"
      v-show="itemsObjects?.data?.length"
      id="scrollComponent"
    >
      <div
        class="pic-div"
        v-for="item in itemsObjects?.data"
        :key="item.id"
        @click="selectItemHandler(item)"
      >
        <img
          :class="{ selectedItem: isItemSelected(item.id) }"
          :src="item.public_url ?? getIcon(item)"
          :alt="item.name"
        />
        <span class="img-text">{{ item.name }}</span>
      </div>
    </div>
    <h2 v-show="!itemsObjects.data?.length" class="emptyData">
      No data found!
    </h2>
  </div>
</template>

<script>
import _ from "lodash";
import NoImageIcon from "../../assets/icons/no-image-6663.svg";

export default {
  name: "GridScreen",
  props: [
    "allowMultiple",
    "iconMappings",
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
    "loadMoreItems",
    "changeFilterHandler",
    "filtersVisible",
    "loadDefaultSelectedFilters",
  ],
  data() {
    return {
      selectAllFieldValue: false,
    };
  },
  methods: {
    selectAllHandler() {
      if (!this.allowMultiple) return;
      if (!this.selectAllFieldValue) {
        this.currentlySelectedHandler([]);
      } else {
        const clonedItemObject = _.cloneDeep(this.itemsObjects);
        this.currentlySelectedHandler(clonedItemObject?.data);
      }
    },
    isItemSelected(id) {
      const index = this.currentlySelectedCache.findIndex(
        (res) => res.id === id
      );
      if (index > -1) return true;
      return false;
    },
    selectItemHandler(itemProps) {
      let clonedArray = _.cloneDeep(this.currentlySelectedCache);
      if (!this.allowMultiple) {
        this.currentlySelectedHandler([itemProps]);
        return;
      }
      const index = clonedArray.findIndex((item) => item.id === itemProps.id);
      if (index > -1) {
        clonedArray.splice(index, 1);
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        clonedArray.push({
          ...itemProps,
        });
      }
      this.currentlySelectedHandler(clonedArray);
    },
    getIcon(item) {
      const index = this.iconMappings.findIndex(
        (iconObject) => item.mime_type.indexOf(iconObject.type) > -1
      );
      if (index > -1) return this.iconMappings[index].icon;
      return NoImageIcon;
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
.top-left ul li i {
  cursor: pointer;
}
.emptyData {
  color: #fff;
}

.selectedItem {
  border: 4px solid #fcb13b;
}

.activeCurrentView {
  color: #fcb13b !important;
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
  left: 3px;
  top: 0px;
  width: 5px;
  height: 7px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

/* end checkbox */

/* width */
::-webkit-scrollbar {
  width: 8px;
  border-radius: 25px !important;
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
  background: #555;
}
</style>
