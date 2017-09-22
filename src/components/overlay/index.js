import Overlay from './overlay';
import OverlayManager from './OverlayManager';
import {Util} from '../../helper';

Overlay.manager = OverlayManager;

export default Util.register(Overlay);