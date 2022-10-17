<template>
  <slot v-if="finalConfig.withHeaderSlot" name="headerSlot"></slot>
  <el-table
    ref="table"
    v-loading="loading"
    :height="finalConfig.height"
    :max-height="finalConfig.maxHeight"
    :stripe="finalConfig.stripe"
    :border="finalConfig.border"
    :size="finalConfig.size"
    :fit="finalConfig.fit"
    :show-header="finalConfig.showHeader"
    :highlight-current-row="finalConfig.highlightCurrentRow"
    :empty-text="finalConfig.emptyText"
    :default-expand-all="finalConfig.defaultExpandAll"
    :default-sort="finalConfig.defaultSort"
    :tooltip-effect="finalConfig.tooltipEffect"
    :show-summary="finalConfig.showSummary"
    :sum-text="finalConfig.sumText"
    :indent="finalConfig.indent"
    :lazy="finalConfig.lazy"
    :table-layout="finalConfig.tableLayout"
    :scrollbar-always-on="finalConfig.scrollbarAlwaysOn"
    :flexible="finalConfig.flexible"
    :element-loading-text="finalConfig.loadingText"
    :data="finalConfig.tableData"
    :row-class-name="finalConfig.rowClassName"
    :cell-class-name="finalConfig.cellClassName"
    :cell-style="finalConfig.cellStyle"
    :header-cell-class-name="finalConfig.headerCellClassName"
    :header-cell-style="finalConfig.headerCellStyle"
    :header-row-class-name="finalConfig.headerRowClassName"
    :header-row-style="finalConfig.headerRowStyle"
    :row-style="finalConfig.rowStyle"
    :summary-method="finalConfig.summaryMethod"
    :span-method="finalConfig.spanMethod"
    :select-on-indeterminate="finalConfig.selectOnIndeterminate"
    :load="finalConfig.load"
    @select="handleSelect"
    @select-all="handleSelectAll"
    @selection-change="handleSelectionChange"
    @cell-mouse-enter="handleCellMouseEnter"
    @cell-mouse-leave="handleCellMouseLeave"
    @cell-click="handleCellClick"
    @cell-dblclick="handleCellDblclick"
    @cell-contextmenu="handleCellContextmenu"
    @row-click="handleRowClick"
    @row-contextmenu="handleRowContextmenu"
    @row-dblclick="handleRowDblclick"
    @header-click="handleHeaderClick"
    @header-contextmenu="handleHeaderContextmenu"
    @sort-change="handleSortChange"
    @filter-change="handleFilterChange"
    @header-dragend="handleHeaderDragend"
    @expand-change="handleExpandChange"
    @current-change="handleCurrentChange"
  >
    <el-table-column v-if="finalConfig.checkBox" type="selection" width="55" />
    <template v-for="(column, idx) in finalConfig.columns" :key="column.key">
      <el-table-column
        :type="column.type"
        :index="column.index"
        :label="column.label"
        :column-key="column.columnKey"
        :prop="column.key"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :render-header="column.renderHeader"
        :sortable="column.sortable"
        :sort-method="column.sortMethod"
        :sort-by="column.sortBy"
        :sort-orders="column.sortOrders"
        :resizable="column.resizable"
        :formatter="column.formatter"
        :show-overflow-tooltip="column.showOverflowTooltip"
        :align="column.align"
        :header-align="column.headerAlign"
        :class-name="column.className"
        :label-class-name="column.labelClassName"
        :selectable="column.selectable"
        :reserve-selection="column.reserveSelection"
        :filters="column.filters"
        :filter-placement="column.filterPlacement"
        :filter-multiple="column.filterMultiple"
        :filter-method="column.filterMethod"
        :filtered-value="column.filteredValue"
      >
        <template #header v-if="column.headerSlot">
          <slot :header="'header' + idx" />
        </template>
        <template #default="{ row }" v-if="column.slot">
          <slot :name="'Column' + idx" :data="row" />
        </template>
      </el-table-column>
    </template>
    <el-table-column
      v-if="finalConfig.showOperateButton"
      fixed="right"
      label="操作"
      :width="finalConfig.operateButtonWidth"
    >
      <template #default="{ row }">
        <slot name="OperateButton" :data="row" />
      </template>
    </el-table-column>
    <template #append v-if="finalConfig.appendSlot">
      <slot name="append" />
    </template>
    <template #empty v-if="finalConfig.emptySlot">
      <slot name="empty" />
    </template>
  </el-table>
  <div
    style="margin-top: 20px; display: flex; flex-direction: row-reverse"
    v-if="finalConfig.withPagination"
  >
    <el-pagination
      v-model:currentPage="finalConfig.currentPage"
      v-model:page-size="finalConfig.pageSize"
      :page-sizes="[10, 20, 50, 200]"
      :total="finalConfig.pageTotal"
      @size-change="handleSizeChange"
      @current-change="handlePageCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>
<script setup>
import { ref, defineEmits, reactive, computed } from "vue";
import { apiPost } from "@/utils/request";
import { ElMessage } from "element-plus";

let table = ref();

let loading = reactive(false);
let initConfig = reactive({
  withHeaderSlot: false,
  loadingText: "数据载入中",
  height: "480",
  maxHeight: "600",
  stripe: false,
  border: false,
  size: "default",
  fit: true,
  showHeader: true,
  highlightCurrentRow: false,
  emptyText: "暂无数据",
  defaultExpandAll: false,
  tooltipEffect: "dark",
  showSummary: false,
  sumText: "合计",
  indent: 16,
  lazy: false,
  tableLayout: "fixed",
  scrollbarAlwaysOn: false,
  flexible: false,
  tableData: [],
  columns: [],
  rowClassName: null,
  cellClassName: null,
  cellStyle: null,
  headerCellClassName: null,
  headerCellStyle: null,
  headerRowClassName: null,
  headerRowStyle: null,
  rowStyle: null,
  summaryMethod: null,
  spanMethod: null,
  selectOnIndeterminate: null,
  load: null,
  showOperateButton: true,
  operateButtonWidth: 200,
  appendSlot: false,
  emptySlot: false,
  currentPage: 1,
  pageSize: 10,
  pageTotal: 0,
  remote: false,
  queryForm: {},
  dataKey: "",
  tableDataUrl: "",
  pageTotalKey: "",
  pageSizeKey: "",
  currentPageKey: "",
  immediateRemote: false,
});

const props = defineProps({
  config: {
    type: Object,
    require: true,
  },
});

let finalConfig = computed({
  get() {
    let tmpConfig = Object.assign(initConfig, props.config);
    if (tmpConfig.immediateRemote) {
      updateTable();
    }
    console.log(tmpConfig);
    return tmpConfig;
  },
  set(value) {
    emit("update:config", value);
  },
});

const handleSelect = (selection, row) => {
  emit("handleSelect", selection, row);
};

const handleSelectAll = (selection) => {
  emit("handleSelectAll", selection);
};
const handleSelectionChange = (selection) => {
  emit("handleSelectionChange", selection);
};
const handleCellMouseEnter = (row, column, cell, event) => {
  emit("handleCellMouseEnter", row, column, cell, event);
};
const handleCellMouseLeave = (row, column, cell, event) => {
  emit("handleCellMouseLeave", row, column, cell, event);
};
const handleCellClick = (row, column, cell, event) => {
  emit("handleCellClick", row, column, cell, event);
};
const handleCellDblclick = (row, column, cell, event) => {
  emit("handleCellDblclick", row, column, cell, event);
};
const handleCellContextmenu = (row, column, cell, event) => {
  emit("handleCellContextmenu", row, column, cell, event);
};
const handleRowClick = (row, column, event) => {
  emit("handleRowClick", row, column, event);
};
const handleRowContextmenu = (row, column, event) => {
  emit("handleRowContextmenu", row, column, event);
};
const handleRowDblclick = (row, column, event) => {
  emit("handleRowDblclick", row, column, event);
};
const handleHeaderClick = (column, event) => {
  emit("handleHeaderClick", column, event);
};
const handleHeaderContextmenu = (column, event) => {
  emit("handleHeaderContextmenu", column, event);
};
const handleSortChange = ({ column, prop, order }) => {
  emit("handleSortChange", column, prop, order);
};
const handleFilterChange = (filters) => {
  emit("handleFilterChange", filters);
};
const handleCurrentChange = (currentRow, oldCurrentRow) => {
  emit("handleCurrentChange", currentRow, oldCurrentRow);
};
const handleHeaderDragend = (newWidth, oldWidth, column, event) => {
  emit("handleHeaderDragend", newWidth, oldWidth, column, event);
};
const handleExpandChange = (row, status) => {
  emit("handleExpandChange", row, status);
};
const handleSizeChange = (val) => {
  if (finalConfig.value.pageSizeKey) {
    finalConfig.value.queryForm[finalConfig.value.pageSizeKey] = val;
  }
  updateTable();
  emit("sizeChange", val);
};

const handlePageCurrentChange = (val) => {
  if (finalConfig.value.currentPageKey) {
    finalConfig.value.queryForm[finalConfig.value.currentPageKey] = val;
  }
  updateTable();
  emit("handlePageCurrentChange", val);
};

const emit = defineEmits([
  "update:config",
  "handleSelect",
  "handleSelectAll",
  "handleSelectionChange",
  "handleCellMouseEnter",
  "handleCellMouseLeave",
  "handleCellClick",
  "handleCellDblclick",
  "handleCellContextmenu",
  "handleRowClick",
  "handleRowContextmenu",
  "handleRowDblclick",
  "handleHeaderClick",
  "handleHeaderContextmenu",
  "handleSortChange",
  "handleFilterChange",
  "handleCurrentChange",
  "handleHeaderDragend",
  "handleExpandChange",
  "sizeChange",
]);

function clearSelection() {
  table.value.clearSelection();
}

function getSelectionRows() {
  table.value.getSelectionRows();
}

function toggleRowSelection(row, selected) {
  table.value.toggleRowSelection(row, selected);
}

function toggleAllSelection() {
  table.value.toggleAllSelection();
}

function toggleRowExpansion(row, expanded) {
  table.value.toggleRowExpansion(row, expanded);
}

function setCurrentRow(row) {
  table.value.setCurrentRow(row);
}

function clearSort() {
  table.value.clearSort();
}

function clearFilter(columnKeys) {
  table.value.clearSelection(columnKeys);
}

function doLayout() {
  table.value.doLayout();
}

function sort(prop, order) {
  table.value.sort(prop, order);
}

function scrollTo(options, yCoord) {
  table.value.scrollTo(options, yCoord);
}

function setScrollTop(top) {
  table.value.setScrollTop(top);
}

function setScrollLeft(left) {
  table.value.setScrollLeft(left);
}

function updateTable() {
  if (finalConfig.value.tableDataUrl && finalConfig.value.remote) {
    loading = true;
    apiPost(finalConfig.value.tableDataUrl, finalConfig.value.queryForm)
      .then((res) => {
        loading = false;
        if (res.status === 200) {
          if (finalConfig.value.dataKey) {
            finalConfig.value.tableData =
              res.data.data[finalConfig.value.dataKey];
          } else {
            finalConfig.value.tableData = res.data.data;
          }
          if (finalConfig.value.pageTotalKey) {
            finalConfig.value.pageTotal =
              res.data.data[finalConfig.value.pageTotalKey];
          } else {
            finalConfig.value.pageTotal = res.data.data.total;
          }
          if (finalConfig.value.pageSizeKey) {
            finalConfig.value.pageSize =
              res.data.data[finalConfig.value.pageSizeKey];
          } else {
            finalConfig.value.pageSize = res.data.data.pageSize;
          }
          if (finalConfig.value.currentPageKey) {
            finalConfig.value.currentPage =
              res.data.data[finalConfig.value.currentPageKey];
          } else {
            finalConfig.value.currentPage = res.data.data.currentPage;
          }
        } else {
          if (res.data.data) {
            finalConfig.value.emptyText = res.data.data;
          }
        }
      })
      .catch(() => {
        loading = false;
        ElMessage.warning("获取数据异常");
      });
  }
}

defineExpose({
  clearSelection,
  getSelectionRows,
  toggleRowSelection,
  toggleAllSelection,
  toggleRowExpansion,
  setCurrentRow,
  clearSort,
  clearFilter,
  doLayout,
  sort,
  scrollTo,
  setScrollTop,
  setScrollLeft,
  updateTable,
});
</script>
