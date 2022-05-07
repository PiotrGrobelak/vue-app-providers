import { mount } from "@vue/test-utils";
import ErrorProvider from "./ErrorProvider.vue";
import ErrorPage from "./ErrorPage.vue";
import TheWelcome from "@/components/TheWelcome.vue";

describe("ErrorProvider", () => {
  describe("should render", () => {
    it("default component by slot", () => {
      const layout = "ERROR_PAGE";

      const wrapper = mount(ErrorProvider, {
        props: { layout },
        slots: {
          default: [TheWelcome],
        },
      });

      const TheWelcomeComponent = wrapper.findComponent(TheWelcome);
      expect(TheWelcomeComponent.exists()).toBe(true);
    });
    it("error page when error was thrown", async () => {
      const layout = "ERROR_PAGE";

      const wrapper = mount(ErrorProvider, {
        props: { layout },
        slots: {
          default: [TheWelcome],
        },
        global: {
          config: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            errorHandler(err) {
              /**
               * If we want catch error from component we have to call errorHandler to catch here and ignoring error in tests
               */
              // console.log("ignoring error:", _err);
            },
          },
        },
      });

      /**
       * spyOn should work, but function is undefined :/
       */
      // const theWelcome = shallowMount(TheWelcome);
      // const handleSetError = jest.spyOn(theWelcome.vm, "handleSetError");

      const button = wrapper.find("button");
      await button.trigger("click");

      const errorPage = wrapper.findComponent(ErrorPage);
      expect(errorPage.exists()).toBe(true);
      expect(errorPage.text()).toContain("Error page");

      // expect(handleSetError).toHaveBeenCalled();
    });
  });
});
