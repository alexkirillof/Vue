<template>
<v-card class="text-center pa-6">
  <v-card-text class="text-subtitle-1 pa-4">
     Are you sure you want to delete this payment?
  </v-card-text>
  <v-card-actions>
    <v-btn color="teal" text @click="$emit('yes')">Yes</v-btn>
    <v-spacer />
    <v-btn color="teal" text @click="$emit('no')">No</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
export default {
  name: 'ConfirmationForm',
};
</script>