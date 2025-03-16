import HashRouterHandler from './handler/hash/hash-router-handler';
import HistoryRouterHandler from './handler/history-router-handler';
import { Pages } from './pages';
import type { RequestParameters, Route } from '../types/interfaces';

export default class Router {
  private routes: Route[];
  private handler: HashRouterHandler;

  constructor(routes: Route[]) {
    this.routes = routes;
    // this.handler = new HistoryRouterHandler(this.urlChangedHandler.bind(this));

    this.handler =
      globalThis.location.pathname !== '/' && globalThis.location.hash
        ? new HashRouterHandler(this.urlChangedHandler.bind(this))
        : new HistoryRouterHandler(this.urlChangedHandler.bind(this));

    document.addEventListener('DOMContentLoaded', (): void => {
      this.handler.navigate();
    });
  }

  public setHashHandler(): void {
    this.handler.disable();
    this.handler = new HashRouterHandler(this.urlChangedHandler.bind(this));
  }

  public navigate(url: string): void {
    this.handler.navigate(url);
  }

  private urlChangedHandler(requestParameters: RequestParameters): void {
    console.log('requestParameters', requestParameters);
    const pathForFind: string =
      requestParameters.resource === ''
        ? requestParameters.path
        : `${requestParameters.path}`;
    console.log('pathForFind:', pathForFind);

    const route: Route | undefined = this.routes.find(
      (item: Route): boolean => item.path === pathForFind
    );

    if (!route) {
      this.redirectToNotFoundPage();
      return;
    }

    route.callback(requestParameters.resource);
  }

  private redirectToNotFoundPage(): void {
    const notFoundPage: Route | undefined = this.routes.find(
      (item: Route): boolean => item.path === Pages.NOT_FOUND
    );
    if (notFoundPage) {
      this.navigate(notFoundPage.path);
    }
  }
}
