import { AppElectronStore } from '../../renderer/store/types';
import { Bounds } from './bounds';

export const CORE_WINDOW_BOUNDS = 'coreWindowBounds';

export interface CoreElectronStore extends AppElectronStore {
  [CORE_WINDOW_BOUNDS]: Bounds;
}
