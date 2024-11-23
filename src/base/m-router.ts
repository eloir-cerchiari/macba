import { MAppendableInterface } from "./m-appendable-interface";
import { MDiv } from "./m-div";

export type MRouteProps = {
  path: string;
  component: () => MAppendableInterface;
  name?: string;
  childRoutes?: MRouteProps[];
};
export class MRoute {
  private props!: {
    path: string;
    name: string;
    component: () => MAppendableInterface;
    childRoutes: MRoute[];
    parts?: string[];
    params: Map<string, string>;
  };

  constructor({ path, component, childRoutes, name }: MRouteProps) {
    this.props = {
      path: path,
      component: component,
      name: name || "",
      childRoutes: [],
      parts: path.replace(/^\/|\/$/g, "").split("/"),
      params: new Map<string, string>(),
    };

    this.createChildRoutes(childRoutes);
    this.orderChildRoutes();
  }

  private createChildRoutes(childRoutes?: MRouteProps[]): void {
    const increasePath = ""; //his.props.path.endsWith("/") ? "" : "/";
    this.props.childRoutes = [];

    childRoutes?.forEach((route) => {
      this.props.childRoutes!.push(
        new MRoute({
          path: increasePath + route.path,
          component: route.component,
          childRoutes: route.childRoutes,
          name: route.name,
        })
      );
    });
  }

  public get path(): string {
    return this.props.path;
  }

  public get component(): MAppendableInterface {
    return this.props.component();
  }

  public get childRoutes(): MRoute[] {
    return this.props.childRoutes;
  }
  public get name(): string {
    return this.props.name;
  }

  public get params(): Map<string, string> {
    return this.props.params;
  }

  public find(path: string): MRoute | undefined {
    const fullChild = this.props.childRoutes.find(
      (route) => route.path === path
    );
    if (fullChild) {
      return fullChild;
    }
    for (const route of this.props.childRoutes) {
      const { result, params } = matcher(route.path, path);
      if (result) {
        route.props.params = params;
        return route;
      }
    }
  }

  public addChild(route: MRouteProps): MRoute {
    const newRoute = new MRoute({
      path: route.path,
      component: route.component,
      childRoutes: route.childRoutes,
      name: route.name,
    });
    this.props.childRoutes.push(newRoute);
    this.orderChildRoutes();
    return this;
  }
  private orderChildRoutes(): MRoute[] {
    return this.props.childRoutes.sort((a, b) => {
      if (a.path.includes("{") && !b.path.includes("{")) {
        return 1;
      }
      if (!a.path.includes("{") && b.path.includes("{")) {
        return -1;
      }
      return a.path < b.path ? 1 : -1;
    });
  }
}

export class MRouter {
  private mRoute!: MRoute;
  private currentRoute!: MRoute;

  private readonly INITIAL_PATH = "...";

  private browserRoute = "";
  private readonly baseElement!: HTMLElement;

  params: Map<string, string> = new Map<string, string>();
  queryParams: Map<string, string> = new Map<string, string>();

  constructor(app: HTMLElement, routes: MRouteProps[]) {
    window.addEventListener("popstate", () => this.route());

    this.baseElement = app;
    this.mRoute = new MRoute({
      path: this.INITIAL_PATH,
      component: () => new MDiv(),
      childRoutes: routes,
    });
    this.currentRoute = this.mRoute;
  }
  addRoute(route: MRouteProps): MRouter {
    this.mRoute.addChild(route);
    return this;
  }

  public next(path: string): MRoute | null {
    if (path === this.currentRoute.path) {
      return this.currentRoute;
    }

    if (this.currentRoute.path !== this.INITIAL_PATH) {
      path = path.replace(this.currentRoute.path, "");
    }

    const nextRoute = this.currentRoute.find(path);
    if (!nextRoute && this.currentRoute.path === this.INITIAL_PATH) {
      return null;
    }

    if (nextRoute) {
      this.currentRoute = nextRoute;
    }

    if (!nextRoute) {
      const fromBegin = this.mRoute.find(path);
      if (!fromBegin) {
        return null;
      }
      this.currentRoute = fromBegin;
    }

    this.params = new Map<string, string>([
      ...this.params,
      ...this.currentRoute.params,
    ]);

    return this.currentRoute;
  }

  private processQueryParams() {
    if (!window.location.search || window.location.search === "") {
      return;
    }
    const queryParams = window.location.search.replace("?", "").split("&");
    queryParams.forEach((query) => {
      const [key, value] = query.split("=");
      this.queryParams.set(key, value);
    });
  }

  private mount() {
    this.baseElement.appendChild(this.currentRoute.component.getElement());
  }

  route() {
    this.browserRoute = window.location.pathname;
    console.log("BrowserRoute", this.browserRoute);
    this.processQueryParams();
    this.next(this.browserRoute);
    console.log("CurrentRoute", this.currentRoute);
    console.log("Params", this.params);
    console.log("QParams", this.queryParams);
    this.mount();
  }
}

function matcher(
  routerPath: string,
  browserPath: string
): { result: boolean; params: Map<string, string> } {
  const routerParts = routerPath.replace(/^\/|\/$/g, "").split("/");
  const browserParts = browserPath.replace(/^\/|\/$/g, "").split("/");
  const params = new Map<string, string>();

  for (let i = 0; i < routerParts.length; i++) {
    if (routerParts[i] === browserParts[i]) {
      continue;
    }

    if (routerParts[i].startsWith("{")) {
      const paramName = routerParts[i].replace(/^{|}$/g, "");
      const paramValue = browserParts[i];
      if (paramValue !== undefined) {
        params.set(paramName, paramValue);
        continue;
      }
    }

    return { result: false, params: new Map<string, string>() };
    break;
  }

  return { result: true, params: params };
}
