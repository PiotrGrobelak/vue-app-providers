import { flushPromises, mount } from "@vue/test-utils";
import { h } from "vue";
import type { ComponentPublicInstance } from "vue";
import ErrorProvider from "./ErrorProvider.vue";
import ErrorPage from "./ErrorPage.vue";
import ErrorComponent from "./ErrorComponent.vue";
import TestComponent from "@/components/TestComponent.vue";

const routerPushMock = jest.fn();

jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

describe("ErrorProvider", () => {
  describe("should render", () => {
    it("TestComponent in slot if all logic is OK", () => {
      const layout = "ERROR_PAGE";

      const testComponentWithProps = {
        render() {
          return h(TestComponent, {
            shouldManualFail: false,
            data: [
              {
                id: 432,
                description: "Some awesome description",
              },
            ],
          });
        },
      };

      const wrapper = mount(ErrorProvider, {
        props: { layout },
        slots: {
          default: [testComponentWithProps],
        },
      });

      const testComponent = wrapper.findComponent(TestComponent);
      expect(testComponent.find("li").text()).toBe(
        "432SOME AWESOME DESCRIPTION"
      );
    });

    it("error page when error was thrown", async () => {
      const layout = "ERROR_PAGE";

      const mockedData = [
        {
          someString: "some string",
          someId: 432,
        },
      ];

      const testComponentWithProps = {
        render() {
          return h(TestComponent, {
            shouldManualFail: false,
            data: mockedData,
          });
        },
      };

      const wrapper = mount(ErrorProvider, {
        props: { layout },
        slots: {
          default: testComponentWithProps,
        },
      });

      await flushPromises();

      const errorPage = await wrapper.findComponent(ErrorPage);
      expect(errorPage.exists()).toBe(true);
      expect(errorPage.text()).toContain("Error page");
    });
  });

  describe("should render message", () => {
    const testCases = [
      {
        layout: "ERROR_PAGE",
        slot: TestComponent,
        expectedErrorComponent: ErrorPage,
        expectedErrorText: "Error page",
        shouldManualFail: false,
        data: [
          {
            id: 432,
            description: "Some awesome description",
          },
        ],
      },
      {
        layout: "ERROR_COMPONENT",
        slot: TestComponent,
        expectedErrorComponent: ErrorComponent,
        expectedErrorText: "Error component",
        shouldManualFail: true,
        data: [
          {
            id: 432,
            description: "Some another awesome description",
          },
        ],
      },
    ];

    for (const {
      layout,
      slot,
      expectedErrorComponent,
      expectedErrorText,
      shouldManualFail,
      data,
    } of testCases) {
      it(`'${expectedErrorText}' with layout ${layout} when error was thrown if shouldManualFail is ${shouldManualFail}`, async () => {
        const testComponentWithProps = {
          render() {
            return h(slot, {
              shouldManualFail,
              data,
            });
          },
        };

        const wrapper = mount(ErrorProvider, {
          props: { layout },
          slots: {
            default: testComponentWithProps,
          },
          // global: {
          //   config: {
          //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
          //     errorHandler(err) {
          //       //
          //     },
          //   },
          // },
        });

        if (!shouldManualFail) {
          await flushPromises();
          const errorPage = wrapper.findComponent(expectedErrorComponent);
          expect(errorPage.exists()).toBe(true);
          expect(errorPage.text()).toContain(expectedErrorText);
          return;
        }

        const button = wrapper.find("button");
        await button.trigger("click");

        const errorPage = wrapper.findComponent(expectedErrorComponent);
        expect(errorPage.exists()).toBe(true);
        expect(errorPage.text()).toContain(expectedErrorText);
      });
    }

    const testCases2 = [
      {
        layout: "ERROR_PAGE",
        slot: TestComponent,
        expectedErrorComponent: ErrorPage,
        expectedErrorText: "Error page",
        shouldManualFail: true,
        data: [
          {
            id: undefined,
            description: "Some awesome description",
          },
        ],
      },
      {
        layout: "ERROR_COMPONENT",
        slot: TestComponent,
        expectedErrorComponent: ErrorComponent,
        expectedErrorText: "Error component",
        shouldManualFail: true,
        data: [
          {
            id: 432,
            description: null,
          },
        ],
      },
    ];

    for (const {
      layout,
      slot,
      expectedErrorComponent,
      expectedErrorText,
      shouldManualFail,
      data,
    } of testCases2) {
      it(`'${expectedErrorText}' with layout ${layout} when error was thrown if data have undefined or null filed`, async () => {
        const testComponentWithProps = {
          render() {
            return h(slot, {
              shouldManualFail,
              data,
            });
          },
        };

        const wrapper = mount(ErrorProvider, {
          props: { layout },
          slots: {
            default: testComponentWithProps,
          },
        });

        await flushPromises();

        const errorPage = wrapper.findComponent(expectedErrorComponent);
        expect(errorPage.exists()).toBe(true);
        expect(errorPage.text()).toContain(expectedErrorText);
      });
    }
  });
});
