<template>
  <table ref="tableRef" :style="{ cursor: selectedCursor }" class="table">
    <tr class="table-header">
      <th :style="{ width: item.width + '%' }" v-for="item in computedHeaders" :key="item.id">
        {{ item.name ? item.name : "Пусто" }}
      </th>
      <th class="settings"></th>
    </tr>
    <tr class="table-row" v-for="(item, index) in data" :key="item.id">
      <td @mousedown="handleClick" :style="{
        width: header.width + '%',
        whiteSpace: header.width > 20 ? 'normal' : 'nowrap',
      }" v-for="header in computedHeaders" :key="header.id">
        <base-switchable-input v-model="item[header.accessor]" :placeholder="'Пусто'" />
      </td>
      <td class="settings">
        <div class="setting">
          <b-icon-x class="pointer icon" @click="handleDeleteRow(index)" />
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import { BIconX } from "bootstrap-icons-vue";
import { useDeckTableResize } from "@/hooks"
import BaseSwitchableInput from "@/components/BaseSwitchableInput";
import { ref, onMounted } from 'vue';
export default {
  name: "DeckSettingsTable",
  components: { BIconX, BaseSwitchableInput },
  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    handleDeleteRow: {
      type: Function,
      required: true,
    }
  },
  setup(props) {
    const tableRef = ref(null);
    const { handleClick, computedHeaders, selectedCursor, setTableForResize, updateHeaders } = useDeckTableResize(props.headers);
    onMounted(() => {
      setTableForResize(tableRef.value)
    })
    return { handleClick, computedHeaders, selectedCursor, tableRef, setTableForResize, updateHeaders }

  },

  watch: {
    headers(newValue) {
      this.updateHeaders(newValue);
    }
  }

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
      word-break: normal;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .settings {
      width: 5%;
    }
  }

  .table-row {
    background: white;

    td {
      max-width: 50px;
      border: 2px solid #e4e4e4;
      padding: 10px;
      word-break: normal;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .settings {
      .setting {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      color: red;
      font-size: 2em;
      padding: 0;
      margin: 0;
    }
  }
}
</style>