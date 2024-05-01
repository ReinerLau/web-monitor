import { Extension } from '@imrobot/monitor-helpers';
import { Plugin } from 'vue';
export { default as behavior } from '@imrobot/monitor-behavior';
export { playScreen, default as screen } from '@imrobot/monitor-screen';

type Use = <T extends Extension>(
  extension: T,
  options?: Parameters<T["install"]>[0]
) => void;

type Monitor = {
  use: Use;
} & Plugin;

declare const monitor: Monitor;

export { monitor as default };
