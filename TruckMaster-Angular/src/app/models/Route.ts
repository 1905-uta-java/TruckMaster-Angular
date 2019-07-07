import { RouteNode } from './RouteNode';

export interface Route {
    id: number,
    description: string,
    idealStartTime: Date,
    nodes: RouteNode[]
}