<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
  <a @click="submit">Teste API</a>
</template>

<script setup>
import createUserUseCase from "../modules/users/use-cases/CreateUser";
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";

async function submit() {
  const input = {
    email: "lucas@email.com",
    type: "person",
    person: {
      name: "Lucas",
      cpf: "761.996.070-82",
      dateOfbirth: "25/02/1995",
      phone: "(61) 986245829",
    },
    company: {
      name: undefined,
      cnpj: undefined,
      openingDate: undefined,
      phone: undefined,
    },
    password: "mb@123",
  };

  const res = await createUserUseCase.execute(input);

  if (res.isLeft()) {
    res.value.errorValue().message;

    return;
  }

  const data = res.value.getValue();
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
