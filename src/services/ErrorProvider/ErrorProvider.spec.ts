import { mount } from "@vue/test-utils";
import ErrorProvider from "./ErrorProvider.vue";
import ErrorPage from "./ErrorPage.vue";
import ErrorComponent from "./ErrorComponent.vue";
import TheWelcome from "@/components/TheWelcome.vue";

describe("ErrorProvider", () => {
  describe("should render", () => {
    it("the welcome component in slot", () => {
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

    const testCases = [
      {
        layout: "ERROR_PAGE",
        slot: TheWelcome,
        expectedComponent: ErrorPage,
        expectedText: "Error page",
      },
      {
        layout: "ERROR_COMPONENT",
        slot: TheWelcome,
        expectedComponent: ErrorComponent,
        expectedText: "Error component",
      },
    ];

    for (const { layout, slot, expectedComponent, expectedText } of testCases) {
      it(`${layout} with text ${expectedText} when error was thrown`, async () => {
        const wrapper = mount(ErrorProvider, {
          props: { layout },
          slots: {
            default: [slot],
          },
          global: {
            config: {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              errorHandler(err) {
                //
              },
            },
          },
        });

        const button = wrapper.find("button");
        await button.trigger("click");

        const errorPage = wrapper.findComponent(expectedComponent);
        expect(errorPage.exists()).toBe(true);
        expect(errorPage.text()).toContain(expectedText);
      });
    }

    it.skip("error page when error was thrown", async () => {
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
