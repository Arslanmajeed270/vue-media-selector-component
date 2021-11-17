<template>
     <div class="gridScreenWrapper">
      <div class="gridScreenHeader">
        <div class="gsHeader">
          <p>{{popupTitle}}</p>
        </div>
        <div class="gsOrderInput">
          <div v-show="orderDirection" class="selectWrapper">
            <select class="selectBox">
              <option>Order dummy content</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
            </select>
          </div>
          <div v-show="orderField" class="selectWrapper">
            <select class="selectBox">
              <option>Order by Wane</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
            </select>
          </div>
          <div v-show="searchBox" class="selectWrapper">
            <input type="text" class="selectBox" />
            <img src="../../assets/search-solid.svg" width="15" />
          </div>
        </div>
      </div>
      <div class="gridScreenBody">
        <div class="gridScreenBodyContainer">
          <div class="gridScreenFilterSection">
            <img v-if="selectAllCheckbox" src="../../assets/square-regular.svg" width="15" alt="checkbox" />
            <img v-if="filter" src="../../assets/filter-solid.svg" width="15" alt="checkbox" />
            <img v-if="thumbnailView" src="../../assets/th-solid.svg" width="15" alt="checkbox" />
            <img v-if="listView" src="../../assets/list-solid.svg" width="15" alt="checkbox" />
          </div>
          <div  class="gridScreenImageSection">
            <div
            v-for="item in itemsObjects?.data"
            :key="item.id"
            class="gridScreenImage"
            :style="{ backgroundImage: 'url(' + item.public_url + ')' }"
            ></div>
          </div>
        </div>
      </div>
      
      <div class="gridScreenFooter">
        <button class="cancelButton" @click="closeModal">{{cancelButtonText}}</button>
        <button class="saveButton">{{okButtonText}}</button>
      </div>
    </div>
</template>

<script>

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

      'filterObjects',
      'itemsObjects'
    ],
    data(){
        return{
            imageUrl: '/assets/dummy/apple.png'
        }
    }

}
</script>

<style scoped>
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
      .gridScreenBody {
        height: auto;
        max-height: 78%;
        min-height: 78%;
        overflow-y: auto;
      }
      .gridScreenBodyContainer {
        width: 85%;
        margin: auto;
        padding: 20px 0;
      }
      .gridScreenFooter {
        height: 8%;
        border-top: 3px solid #7e7e7e;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3em;
      }

      .gridScreenFilterSection {
        display: flex;
        gap: 20px;
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
        background-size: 160px 100px;
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
</style>

