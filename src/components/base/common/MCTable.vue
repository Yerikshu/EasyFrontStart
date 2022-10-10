<template>
  <div>
    <div
      v-if="searchable && searchPlace === 'top'"
      class="search-con search-con-top"
    >
      <Select v-model="searchKey" class="search-col">
        <Option
          v-for="item in columns"
          v-if="item.key !== 'handle'"
          :value="item.key"
          :key="`search-col-${item.key}`"
          >{{ item.title }}</Option
        >
      </Select>
      <Input
        @on-change="handleClear"
        clearable
        placeholder="输入关键字搜索"
        class="search-input"
        v-model="searchValue"
      />
      <Button @click="handleSearch" class="search-btn" type="primary"
        ><Icon type="search" />&nbsp;&nbsp;搜索</Button
      >
    </div>
    <Table
      ref="tablesMain"
      :data="insideTableData"
      :columns="insideColumns"
      :stripe="stripe"
      :border="border"
      :show-header="showHeader"
      :width="width"
      :height="height"
      :loading="loading"
      :disabled-hover="disabledHover"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :size="size"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-expand="onExpand"
    >
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
    </Table>
    <div
      v-if="searchable && searchPlace === 'bottom'"
      class="search-con search-con-top"
    >
      <Select v-model="searchKey" class="search-col">
        <Option
          v-for="item in columns"
          v-if="item.key !== 'handle'"
          :value="item.key"
          :key="`search-col-${item.key}`"
          >{{ item.title }}</Option
        >
      </Select>
      <Input
        placeholder="输入关键字搜索"
        class="search-input"
        v-model="searchValue"
      />
      <Button class="search-btn" type="primary"
        ><Icon type="search" />&nbsp;&nbsp;搜索</Button
      >
    </div>
    <a
      id="hrefToExportTable"
      style="display: none; width: 0px; height: 0px"
    ></a>
  </div>
</template>
