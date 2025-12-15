import Reactotron, {
  networking,
  openInEditor,
  trackGlobalErrors,
} from 'reactotron-react-native';

const reactotron = Reactotron.configure({ host: '192.168.1.4' })
  .useReactNative()
  .use(trackGlobalErrors())
  .use(networking())
  .use(openInEditor())
  .connect();

export default reactotron;

console.log = (...values) => Reactotron.log(...values);
console.warn = (...values) => Reactotron.warn(...values);
console.error = (...values) => Reactotron.error(...values);