import { renderElement, createElement } from "@t1d333/pickpinlib";
import { LoginScreen } from "./login";
import { MainScreen } from "./main"
import { SignupScreen } from "./signup";
import { Form } from "./form";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [_: string]: { [_: string]: string | number | boolean | Function } & {
        key?: string | number;
      };
    }
  }
}

const root = document.querySelector("#root");
const view = <MainScreen/>;

root?.appendChild(renderElement(view));
