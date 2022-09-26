import { onUnmounted, reactive, computed } from "vue";

export default function useDeckTableResize(headers) {
  const state = reactive({
    isResizing: false,
    initX: 0,
    lastX: 0,
    ref: null,
    headers,
    tableRef: null,
    selectedCursor: "default",
  });
  const setTableForResize = (ref) => {
    state.tableRef = ref;
    state.tableRef.addEventListener("mousemove", resize);
    state.tableRef.addEventListener("mouseup", cancelResize);
  };
  const unmounted = () => {
    state.tableRef.removeEventListener("mousemove", resize);
    state.tableRef.removeEventListener("mouseup", cancelResize);
    state.tableRef = null;
  };
  onUnmounted(unmounted);

  const cancelResize = () => {
    state.isResizing = false;
    state.ref = null;
    state.initX = 0;
    state.selectedCursor = "default";
    state.headers.forEach((header) => {
      header.initWidth = header.width;
    });
  };
  const handleClick = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const ref = e.target;
    const borderSize = 2;
    const rect = ref.getBoundingClientRect();
    if (
      (x >= rect.x && x <= rect.x + borderSize) ||
      (y >= rect.y && y <= rect.y + borderSize)
    ) {
      state.isResizing = true;
      state.ref = e.target;
      state.selectedCursor = "ew-resize";
      state.initX = x;
    }
  };
  const resize = (e) => {
    console.log("hi");
    if (state.isResizing) {
      const x = e.clientX;
      const percentDiff = ((state.initX - x) / window.screen.width) * 100;
      const targetIndex = state.ref.cellIndex;
      const targetHeader = state.headers[targetIndex];
      const leftFromTargetHeader = state.headers[targetIndex - 1];

      if (x - state.lastX > 0 && targetHeader.width > 5) {
        targetHeader.width = targetHeader.initWidth + percentDiff;
        leftFromTargetHeader.width =
          leftFromTargetHeader.initWidth - percentDiff;
        state.lastX = x;
      }
      if (x - state.lastX < 0 && leftFromTargetHeader.width > 5) {
        targetHeader.width = targetHeader.initWidth + percentDiff;
        leftFromTargetHeader.width =
          leftFromTargetHeader.initWidth - percentDiff;
        state.lastX = x;
      }
    }
  };

  const updateHeaders = (value) => {
    state.headers = value;
  };

  const computedHeaders = computed(() => state.headers);
  const selectedCursor = computed(() => state.selectedCursor);

  return {
    computedHeaders,
    handleClick,
    headers: state.headers,
    selectedCursor,
    setTableForResize,
    updateHeaders,
  };
}
