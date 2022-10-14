<template>
  <slot v-if="finalConfig.withHeaderSlot" name="headerSlot" />
  <el-tree
    ref="tree"
    v-loading="loading"
    :data="finalConfig.data"
    :empty-text="finalConfig.emptyText"
    :node-key="finalConfig.nodeKey"
    :props="finalConfig.props"
    :render-after-expand="finalConfig.renderAfterExpand"
    :load="finalConfig.load"
    :render-content="finalConfig.renderContent"
    :highlight-current="finalConfig.highlightCurrent"
    :default-expand-all="finalConfig.defaultExpandAll"
    :expand-on-click-node="finalConfig.expandOnClickNode"
    :check-on-click-node="finalConfig.checkOnClickNode"
    :auto-expand-parent="finalConfig.autoExpandParent"
    :default-expanded-keys="finalConfig.defaultCheckedKeys"
    :show-checkbox="finalConfig.showCheckbox"
    :check-strictly="finalConfig.checkStrictly"
    :default-checked-keys="finalConfig.defaultCheckedKeys"
    :current-node-key="finalConfig.currentNodeKey"
    :filter-node-method="finalConfig.filterNodeMethod"
    :accordion="finalConfig.accordion"
    :indent="finalConfig.indent"
    :icon="finalConfig.icon"
    :lazy="finalConfig.lazy"
    :draggable="finalConfig.draggable"
    :allow-drag="finalConfig.allowDrag"
    :allow-drop="finalConfig.allowDrop"
    @node-click="handleNodeClick"
    @node-contextmenu="handleNodeContextmenu"
    @check-change="handleCheckChange"
    @check="handleCheck"
    @current-change="handleCurrentChange"
    @node-expand="handleNodeExpand"
    @node-collapse="handleNodeCollapse"
    @node-drag-start="handleNodeDragStart"
    @node-drag-enter="handleNodeDragEnter"
    @node-drag-leave="handleNodeDragLeave"
    @node-drag-over="handleNodeDragOver"
    @node-drag-end="handleNodeDragEnd"
    @node-drop="handleNodeDrop"
  >
  </el-tree>
</template>
<script setup>
import { ref, defineEmits, reactive, computed, handleError } from "vue";

let tree = ref();

let loading = reactive(false);
let initConfig = reactive({
    data:[],
    emptyText: "",
    nodeKey: "",
    props: Object,
    renderAfterExpand: true,
    load: "",
    renderContent: null,
    highlightCurrent: false,
    defaultExpandAll: false,
    expandOnClickNode: true,
    autoExpandParent: true,
    showCheckbox: false,
    checkStrictly: false,
    defaultCheckedKeys: [],
    currentNodeKey: null,
    filterNodeMethod: null,
    accordion: false,
    indent: 18,
    icon: null,
    lazy: false,
    draggable: false,
    allowDrag: null,
    allowDrop: null

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
      updateTree();
    }
    console.log(tmpConfig);
    return tmpConfig;
  },
  set(value) {
    emit("update:config", value);
  },
});

const handleNodeClick = (nodeObecjt, nodeProperty, treeNode, event)=>{
    emit("node-click", nodeObecjt, nodeProperty, treeNode, event)
}
const handleNodeContextmenu = (event, nodeObject, node, self)=>{
    emit("node-contextmenu", event, nodeObject, node, self)
}
const handleCheckChange = (data, selected, selectedObject)=>{
    emit("check-change",data, selected, selectedObject)
}
const handleCheck = (dataObject, node)=>{
    emit("check", dataObject, node)
}
const handleCurrentChange = (data, node)=>{
    emit("current-change", data, node)
}
const handleNodeExpand = ()=>{}
const handleNodeCollapse = ()=>{}
const handleNodeDragStart = ()=>{}
const handleNodeDragEnter = ()=>{}
const handleNodeDragLeave = ()=>{}
const handleNodeDragOver = ()=>{}
const handleNodeDragEnd = ()=>{}
const handleNodeDrop = ()=>{}

function updateTree(){}

function

const emit = defineEmits(["update:config"]);
</script>
