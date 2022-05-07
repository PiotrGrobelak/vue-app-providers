import { mount } from "@vue/test-utils";
import ErrorProvider from "./ErrorProvider.vue";
import TheWelcome from "../../components/TheWelcome.vue";

describe("HelloWorld", () => {
  it("should display header text", () => {
    console.log("__RUNNED__");

    const layout = "ERROR_PAGE";

    const wrapper = mount(ErrorProvider, {
      props: { layout },
      slots: {
        default: [TheWelcome],
      },
    });
  });
});
