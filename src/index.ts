import { initAsModule } from './MultibaseCore';
export { Multibase, track, identify, init } from "./MultibaseCore";
export { MultibaseProvider } from "./MultibaseProvider";
export const multibase = initAsModule();
export default multibase;