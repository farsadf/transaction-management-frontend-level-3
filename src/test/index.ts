import { createApp, h } from "vue";

interface MountResult<R> {
  result: R;
  unmount: () => void;
}

interface MountOptions {
  provider?: () => void;
}

function mount<R>(
  composable: () => R,
  options: MountOptions = { provider: undefined }
): MountResult<R> {
  const Child = {
    setup() {
      const result = composable();
      const wrapper = () => result;
      return { wrapper };
    },

    render() {},
  };

  const App = {
    setup() {
      options.provider?.();
    },

    render() {
      return h(Child, {
        ref: "child",
      });
    },
  };

  const root = document.createElement("div");
  const app = createApp(App);
  const vm = app.mount(root);

  return {
    result: (vm.$refs.child as { wrapper: () => R }).wrapper(),

    unmount: () => app.unmount(),
  };
}

export default mount;
