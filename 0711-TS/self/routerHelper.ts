import { Dictionary } from 'vue-router/types/router';
import Router, { RoutePath } from '../router';

export type BaseRouteType = Dictionary<string>;

export interface IndexParam extends BaseRouteType {
  name: string;
}

export interface AboutParam extends BaseRouteType {
  testName: string;
}

export interface UserParam extends BaseRouteType {
  userId: string;
}

export interface ParamMap {
  [RoutePath.Index]: IndexParam;
  [RoutePath.About]: AboutParam;
  [RoutePath.User]: UserParam;
}

export class RouterHelper {
  public static replace<T extends RoutePath>(RoutePath: T, params: ParamMap[T]) {
    Router.replace({
      path: routePath,
      query: params,
    })
  }

  public static push<T extends RoutePath>(RoutePath: T, params: ParamMap[T]) {
    Router.replace({
      path: routePath,
      query: params,
    })
  }
}