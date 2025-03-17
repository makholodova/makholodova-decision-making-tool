import HashRouterHandler from './handler/hash/hash-router-handler';
import HistoryRouterHandler from './handler/history-router-handler';

import type { RequestParameters, Route } from '../types/interfaces';
import { Pages } from '../constants/constants';

export default class Router {
  private routes: Route[];
  private handler: HashRouterHandler;

  constructor(routes: Route[]) {
    this.routes = routes;

    this.handler = this.createHandler();

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
    const pathForFind: string = requestParameters.path.replace(/\/$/, '');

    const route: Route | undefined = this.routes.find(
      (item: Route): boolean => item.path === pathForFind
    );

    if (!route) {
      this.redirectToNotFoundPage();
      return;
    }

    route.callback();
  }
  private createHandler(): HashRouterHandler | HistoryRouterHandler {
    const isHashRouting =
      globalThis.location.pathname !== '/' && globalThis.location.hash;
    return isHashRouting
      ? new HashRouterHandler(this.urlChangedHandler.bind(this))
      : new HistoryRouterHandler(this.urlChangedHandler.bind(this));
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
