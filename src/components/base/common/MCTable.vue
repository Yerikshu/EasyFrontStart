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
    @cell-contextmenu="handleCellContextmenu"
    @row-click="handleRowClick"
    @row-contextmenu="handleRowContextmenu"
    @row-dblclick="handleRowDblclick"
    @header-click="handleClick"
    @header-contextmenu="handleContextmenu"
    @sort-change="handleSortChange"
    @filter-change="handleFilterChange"
    @current-change="handleCurrentChange"
    @header-dragend="handerDragend"
    @expand-change="handelExpandChange"
  >
    <el-table-column v-if="finalConfig.checkBox" type="selection" width="55" />
    <template v-for="(column, idx) in finalConfig.columns" :key="column.key">
      <el-table-column
        :type="column.type"
        :index="column.index"
        :label="column.label"
        :column-key="column.columnKey"
        :prop="column.prop"
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
  </el-table>
</template>
<script setup>
import { ref } from "vue";

const finalConfig = ref({
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
  appendSlot: false
});
</script>
