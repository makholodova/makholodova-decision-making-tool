import HeaderView from './view/header/header-view';
import MainView from './view/main/main-view';
import type View from './view/view';
import { Pages } from './router/pages';
import Router from './router/router';
import type { Route } from './types/interfaces';
import { Sounds } from './components/sound';

export default class App {
  private headerView: HeaderView;
  private main: MainView;
  private router: Router;
  private sounds: Sounds;

  constructor() {
    const routes: Route[] = this.createRoutes();
    this.router = new Router(routes);
    this.sounds = new Sounds();
    this.headerView = new HeaderView();
    this.main = new MainView();

    this.router.setHashHandler();

    this.createView();
  }

  private createView(): void {
    document.body.append(
      this.headerView.getHtmlElement(),
      this.main.getHtmlElement()
    );
    //getOptionsData();
  }

  private createRoutes(): Route[] {
    return [
      {
        path: ``,
        callback: async (): Promise<void> => {
          const { default: IndexView } = await import(
            './view/main/index/index-view'
          );
          this.setContent(new IndexView(this.router, this.sounds));
        },
      },
      {
        path: `${Pages.INDEX}`,
        callback: async (): Promise<void> => {
          const { default: IndexView } = await import(
            './view/main/index/index-view'
          );
          this.setContent(new IndexView(this.router, this.sounds));
        },
      },
      {
        path: `${Pages.DECISION_PICKER}`,
        callback: async (): Promise<void> => {
          const { default: DecisionPickerView } = await import(
            './view/main/decision-picker/decision-picker-view'
          );

          this.setContent(new DecisionPickerView(this.router, this.sounds));
        },
      },

      {
        path: `${Pages.NOT_FOUND}`,
        callback: async (): Promise<void> => {
          const { default: NotFoundView } = await import(
            './view/main/not-found/not-found-view'
          );
          this.setContent(new NotFoundView(this.router));
        },
      },
    ];
  }

  private setContent(view: View): void {
    this.main.setContent(view);
  }
}
