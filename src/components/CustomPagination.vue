<template>
  <nav :class="$style.pagination">
    <button :class="$style.button" @click="setPrevPage">
      <svg :class="$style.icon" viewBox="0 0 13 23" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.6998 3.7499L4.9498 11.4999L12.6998 19.2499L11.1498 22.3499L0.299805
          11.4999L11.1498 0.649902L12.6998 3.7499Z"
        />
      </svg>
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
      <svg :class="$style.icon" viewBox="0 0 13 23" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.6998 3.7499L4.9498 11.4999L12.6998 19.2499L11.1498 22.3499L0.299805
          11.4999L11.1498 0.649902L12.6998 3.7499Z"
          transform="rotate(180 6.5 11.5)"
        />
      </svg>
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
  font-size: 1.25rem;
  justify-content: center;
  border: 0.05em solid #c2c2c2;
}
.button {
  display: flex;
  align-items: center;
  padding: 0.5em 0.6em;
  font-size: 1.125rem;
  color: #2c3e50;
  border: none;
  background-color: #fff;
  transition: color 0.2s;
  &:hover {
    color: #2aa694;
    & .icon {
      fill: #2aa694;
    }
  }
}
.icon {
  width: 0.45em;
  fill: #2c3e50;
  transition: fill 0.2s;
}
.current {
  color: #2aa694;
}
</style>
