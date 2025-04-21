import { setup } from '@storybook/vue3';

// Remove MyPlugin e MyComponent se não estiverem definidos/importados
setup((app) => {
  // app.use(MyPlugin); ← Removido
  // app.component('my-component', MyComponent); ← Removido
  app.mixin({
    // Pode deixar isso se for usar, senão pode remover também
  });
});
