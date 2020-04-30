<template>
  <v-simple-table :fixed-header="!notFixed" :height="height">
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left" v-for="header in headers" :key="header">{{header}}</th>
      </tr>
      </thead>
      <tbody>
      <slot></slot>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    props: ['headers', 'notFixed', 'height']
  }
</script>