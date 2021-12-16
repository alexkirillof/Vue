<template>
  <nav :class="$style.pagination">
    <button :class="$style.button" @click="setPrevPage"> 
    </button>
    <button
      :class="{ [$style.current]: isCurrentPage(button), [$style.button]: true }"
      v-for="button in displayedButtons"
      :key="button"
      @click="setPage(button)"
    >
      {{ button }}
    </button>
    <button :class="$style.button" @click="setNextPage"> 
    </button>
  </nav>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} from 'vuex';
export default {
  name: 'CustomPagination',
  props: {
    buttonsDisplayedCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(['currentPageNumber']),
    ...mapGetters(['pageCount', 'isDataEmpty', 'isCurrentPage']),
    isScrolling() {
      const { buttonsDisplayedCount, pageCount } = this;
      return buttonsDisplayedCount < pageCount;
    },
    startScrolling() {
      const { isScrolling } = this;
      return isScrolling ? Math.round(this.buttonsDisplayedCount / 2) : 0;
    },
    endScrolling() {
      const { startScrolling, pageCount, isScrolling } = this;
      return isScrolling ? pageCount - startScrolling + 1 : 0;
    },
    isStart() {
      const { currentPageNumber, startScrolling } = this;
      return currentPageNumber <= startScrolling;
    },
    isEnd() {
      const { currentPageNumber, endScrolling } = this;
      return endScrolling > 0 && currentPageNumber >= endScrolling;
    },
    buttons() {
      const { pageCount } = this;
      return [...Array(pageCount).keys()].map((i) => i + 1);
    },
    displayedButtons() {
      const {
        isScrolling,
        isStart,
        isEnd,
        startScrolling,
        pageCount,
        buttons,
        buttonsDisplayedCount,
        currentPageNumber,
      } = this;
      const range = { start: 0, end: pageCount };
      if (isScrolling && isStart) {
        range.end = buttonsDisplayedCount;
      } else if (isScrolling && isEnd) {
        range.start = range.end - buttonsDisplayedCount;
      } else if (isScrolling) {
        range.start = currentPageNumber - startScrolling;
        range.end = range.start + buttonsDisplayedCount;
      }
      return buttons.slice(range.start, range.end);
    },
  },
  methods: {
    ...mapMutations(['setCurrentPageNumber']),
    ...mapActions(['fetchData']),
    setPage(number) {
      this.$router.push({ name: 'dashboardPage', params: { page: number } })
        .catch(() => {});
    },
    setNextPage() {
      const { currentPageNumber, pageCount, setPage } = this;
      const nextPage = currentPageNumber < pageCount ? currentPageNumber + 1 : pageCount;
      setPage(nextPage);
    },
    setPrevPage() {
      const { currentPageNumber, setPage } = this;
      const prevPage = currentPageNumber > 1 ? currentPageNumber - 1 : 1;
      setPage(prevPage);
    },
  },
};
</script>

<style module lang="scss">
.pagination {
  display: flex;
  font-size: 16px;
  justify-content: center;
}
.button{
  border:0;
  font-size: 24px;
  margin-top: 30px;
}
</style>
