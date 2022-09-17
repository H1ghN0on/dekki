<template>
  <table :style="{ cursor: selectedCursor }" class="table">
    <tr class="table-header">
      <th
        :style="{ width: item.width + '%' }"
        v-for="item in headers"
        :key="item.id"
      >
        {{ item.name }}
      </th>
      <th class="settings"></th>
    </tr>
    <tr class="table-row" v-for="item in data" :key="item.id">
      <td
        @mousedown="handleClick"
        :style="{
          width: header.width + '%',
          whiteSpace: header.width > 20 ? 'normal' : 'nowrap',
        }"
        v-for="header in headers"
        :key="header.id"
      >
        {{ item[header.accessor] }}
      </td>
      <td class="settings">
        <b-icon-x />
      </td>
    </tr>
  </table>
</template>

<script>
import { BIconX } from "bootstrap-icons-vue";
export default {
  name: "DeckSettingsTable",
  components: { BIconX },
  mounted() {
    document.addEventListener("mousemove", this.resize);
    document.addEventListener("mouseup", this.cancelResize);
  },
  unmounted() {
    document.removeEventListener("mousemove", this.resize);
    document.removeEventListener("mouseup", this.cancelResize);
  },
  methods: {
    cancelResize() {
      this.isResizing = false;
      this.ref = null;
      this.selectedCursor = "default";
      this.initX = 0;
    },
    handleClick(e) {
      const x = e.clientX;
      const y = e.clientY;
      const ref = e.target;
      const borderSize = 2;
      const rect = ref.getBoundingClientRect();
      if (
        (x >= rect.x && x <= rect.x + borderSize) ||
        (x >= rect.x + rect.width - borderSize && x <= rect.x + rect.width) ||
        (y >= rect.y && y <= rect.y + borderSize) ||
        (y >= rect.y + rect.height - borderSize && y <= rect.y + rect.height)
      ) {
        this.isResizing = true;
        this.ref = e.target;
        this.selectedCursor = "ew-resize";
        this.initX = x;
      }
    },
    resize(e) {
      if (this.isResizing) {
        let targetIndex = 0;
        const x = e.clientX;
        const percentDiff = ((this.initX - x) / window.screen.width) * 100;
        console.log(percentDiff);
        if (e.target.cellIndex < this.ref.cellIndex) {
          targetIndex = this.ref.cellIndex - 1;
        } else if (e.target.cellIndex > this.ref.cellIndex) {
          targetIndex = this.ref.cellIndex + 1;
        } else {
          targetIndex = this.ref.cellIndex;
        }
        if (targetIndex === this.ref.cellIndex) {
          this.headers[targetIndex].width -= percentDiff;
          this.headers[this.ref.cellIndex - 1].width += percentDiff;
        } else {
          this.headers[targetIndex].width -= percentDiff;
          this.headers[this.ref.cellIndex].width += percentDiff;
        }

        console.log(targetIndex);
        console.log(this.ref.cellIndex);
        // this.headers[e.target.cellIndex].width += percentDiff;
      }
    },
  },

  data() {
    return {
      selectedCursor: "default",
      ref: null,
      isResizing: false,
      initX: 0,

      headers: [
        {
          name: "Attr1",
          accessor: "attr1",
          width: 8,
        },
        {
          name: "Attr2",
          accessor: "attr2",
          width: 8,
        },
        {
          name: "Attr3",
          accessor: "attr3",
          width: 8,
        },
        {
          name: "Attr4",
          accessor: "attr4",
          width: 8,
        },
        {
          name: "Attr5",
          accessor: "attr5",
          width: 12,
        },
        {
          name: "Attr6",
          accessor: "attr6",
          width: 12,
        },
        {
          name: "Attr7",
          accessor: "attr7",
          width: 12,
        },

        {
          name: "Attr8",
          accessor: "attr8",
          width: 22,
        },
      ],
      data: [
        {
          attr1: "Кто",
          attr2: "Куда",
          attr3: "А я по",
          attr4: "Тапочкам",
          attr5: "Тапочкам",
          attr6: "ТапочкаТапочкамТапочкамТапочкамТапочкамТапочкамм",
          attr7: "Тапочкам",
          attr8: "ТапочкаТапочкамТапочкамТапочкамТапочкамТапочкамм",
        },
        {
          attr1: "Кто",
          attr2: "Куда",
          attr3: "А я по",
          attr4: "Тапочкам",
          attr5: "Тапочкам",
          attr6: "Тапочкам",
          attr7: "Тапочкам",
          attr8:
            "ТапочкТапочкакамамаа мТапочкамам ТапочкТапочкамочкамТапочкамТапоч камТапочкамТапочкамТапочкамам",
        },
        {
          attr1: "Кто",
          attr2: "Куда",
          attr3: "А я по",
          attr4: "Тапочкам",
          attr5: "Тапочкам",
          attr6: "Тапочкам",
          attr7: "Тапочкам",
          attr8: "ТапочТапочкамТапочкамкам",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  table-layout: fixed;
  text-align: center;
  border-collapse: collapse;
  -webkit-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);

  .table-header {
    margin: 0;
    background: #f0f0f0;
    th {
      padding: 10px;
    }
    .settings {
      width: 5%;
    }
  }

  .table-row {
    background: white;
    td {
      border: 2px solid #e4e4e4;
      padding: 10px;
      word-break: normal;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .settings {
      color: red;
      font-size: 1.5em;
      padding: 0;
      width: 5%;
    }
  }
}
</style>