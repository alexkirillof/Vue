<template>
  <v-container>
    <h1 class="text-h5 text-sm-h4 mb-8">My personal payments</h1>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-dialog v-model="dialog" max-width="500" persistent>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mb-6"
              color="teal"
              dark
              v-on="on">
              Add new costs <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <add-payment-form @close="closeForm" />
        </v-dialog>
        <payments-list :items="currentPageData" />
      </v-col>
      <v-col
        class="d-none d-sm-flex justify-center"
        cols="12"
        sm="12"
        md="6"
      >
        <DoughnutChart
          v-if="showChart"
          :chartData="statData"
          :options="chartOptions"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} from 'vuex';
import { DoughnutChart } from 'vue-chart-3';
import { interpolateSpectral } from 'd3-scale-chromatic';
import PaymentsList from '../components/PaymentsList.vue';
import AddPaymentForm from '../components/AddPaymentForm.vue';
export default {
  name: 'App',
  components: {
    PaymentsList,
    AddPaymentForm,
    DoughnutChart,
  },
  data() {
    return {
      dialog: false,
      colorRangeOptions: {
        colorStart: 0.3,
        colorEnd: 1,
        useEndAsStart: true,
      },
      chartOptions: {
        responsive: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                size: 14,
              },
            },
          },
          title: {
            display: true,
            text: 'COSTS BY CATEGORIES',
            padding: {
              top: 12,
              bottom: 10,
            },
            font: {
              size: 16,
            },
          },
        },
      },
    };
  },
  computed: {
    ...mapState(['currentPageNumber', 'pageCount', 'statistics']),
    ...mapGetters(['currentPageData', 'isPageLoaded']),
    statData() {
      const {
        colorRangeOptions: { colorStart, colorEnd, useEndAsStart },
        statistics: { data, labels },
      } = this;
      const dataLength = data.length;
      const colorRange = colorEnd - colorStart;
      const intervalSize = colorRange / dataLength;
      const colorArray = data.map((el, index) => {
        let colorPoint = null;
        if (useEndAsStart) {
          colorPoint = colorEnd - (index * intervalSize);
        } else {
          colorPoint = colorStart + (index * intervalSize);
        }
        return interpolateSpectral(colorPoint);
      });
      return {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colorArray,
          },
        ],
      };
    },
    showChart() {
      return this.statistics?.data?.length > 0;
    },
  },
  methods: {
    ...mapMutations(['setCurrentPageNumber']),
    ...mapActions(['fetchPageCount', 'fetchPage', 'fetchCategory', 'fetchStatistics']),
    closeForm() {
      const page = Number(this.$route.params.page);
      this.dialog = false;
      this.$router.push({ name: 'dashboard', params: { page } })
        .catch(() => {});
    },
    openForm() {
      this.dialog = true;
    },
    getPage(number) {
      const {
        fetchPage,
        isPageLoaded,
        pageCount,
      } = this;
      if (number > 0 && number <= pageCount) {
        if (!isPageLoaded(number)) fetchPage(number);
      } else {
        this.$router.push({ name: 'dashboard', params: { page: 1 } });
      }
    },
  },
  created() {
    const { fetchCategory, fetchStatistics } = this;
    fetchCategory();
    fetchStatistics();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const {
        getPage,
        openForm,
        fetchPageCount,
        setCurrentPageNumber,
      } = vm;
      const page = Number(to.params.page);
      fetchPageCount()
        .then(() => {
          getPage(page);
          setCurrentPageNumber(page);
        });
      if (to.name === 'addPayment') {
        openForm();
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    const page = Number(to.params.page);
    if (to.name === 'dashboard') {
      this.getPage(page);
    }
    next();
  },
};
</script>