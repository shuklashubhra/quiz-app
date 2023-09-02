import { Provider } from "react-redux";

import { wrapper } from "../store";
import { QuizContextProvider } from "../contexts";

import "/styles/globals.css";

export default function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <QuizContextProvider>
        <Component {...pageProps} />
      </QuizContextProvider >
    </Provider>
  );
}
