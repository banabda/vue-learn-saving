<template>
  <div id="app">
    <notifications position="top right" />
    <img src="./assets/logo.png" />
    <div>
      <h2 v-if="user">Halo {{ user }}</h2>
      <el-button @click="createEmployee('Bagas', new Date().toLocaleString())">
        Add
      </el-button>
      <ul v-for="(emp, index) in employeesData" :key="index">
        <li>
          <span style="margin-right: 50px">{{ emp.name }} {{ emp.date }}</span>
          <el-button
            style="margin-right: 50px"
            @click="
              updateEmployee(emp.id, 'Bagas Nabil', new Date().toLocaleString())
            "
          >
            Update
          </el-button>
          <el-button @click="deleteEmployee(emp.id)">Delete</el-button>
        </li>
      </ul>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
import DB from "./firebase/db";
import Auth from "./firebase/auth";

export default {
  name: "app",
  components: {},
  data() {
    return {
      employeesData: [],
      user: null,
    };
  },
  mounted() {
    this.readEmployees();
    Auth.onAuthStateChanged((e) => (this.user = e.email));
    // this.login();
    // DB.collection("employees")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.id);
    //     });
    //   });
  },
  methods: {
    compare(key, order = "asc") {
      return function innerSort(a, b) {
        if (
          !Object.prototype.hasOwnProperty.call(a, key) ||
          !Object.prototype.hasOwnProperty.call(b, key)
        ) {
          // property doesn't exist on either object
          return 0;
        }
        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      };
    },
    login() {
      Auth.signInWithEmailAndPassword("test@mail.com", "test123").then(
        (e) => (this.user = e.user.email)
      );
    },
    readEmployees() {
      var _employees = [];
      DB.collection("employees")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            _employees.push({
              id: doc.id,
              name: doc.data().name,
              date: doc.data().date,
            });
            // console.log(doc.id, " => ", doc.data());
          });
          _employees.sort(this.compare("date"));
          this.employeesData = _employees;
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    createEmployee(name, date) {
      DB.collection("employees")
        .add({ date: date, name: name })
        .then(() => {
          // console.log("Document successfully written!");
          this.$notify({
            title: `<p>Employees ${name} added</p>`,
            text: `<p>Hello ${name}!</p>`,
            type: "success",
          });
          this.readEmployees();
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
          this.$notify({
            title: `<p>Error adding an employees</p>`,
            text: `<p>error ${error}!</p>`,
            type: "success",
          });
        });
    },
    updateEmployee(id, name, date) {
      DB.collection("employees")
        .doc(id)
        .update({
          name: name,
          date: date,
        })
        .then(() => {
          // console.log("Document successfully updated!");
          this.readEmployees();
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    },
    deleteEmployee(id) {
      DB.collection("employees")
        .doc(id)
        .delete()
        .then(() => {
          // console.log("Document successfully deleted!");
          this.readEmployees();
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
};
</script>

<style>
</style>
