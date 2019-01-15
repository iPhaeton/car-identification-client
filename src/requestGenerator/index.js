import {delay} from "../utils/common";

const proto = {
  async generate(state, {request, timeout = 5000, onResponse = () => {}}) {
    if (!request) {
      throw new Error('[requestGenerator] Request function is required.')
    }

    while (state.isGenerating) {
      try {
        const response = await request();
        if (state.isGenerating) {
          onResponse(response);
        }
      } catch(err) {
        console.error(err);
      }
      await delay(timeout);
    }
  }
};

export function requestGenerator(options) {
  const state = {isGenerating: false};

  const generator = {
    start() {
      state.isGenerating = true;
      this.generate(state, options);
    },

    stop() {
      state.isGenerating = false;
    }
  };

  Object.setPrototypeOf(generator, proto);

  return generator;
}
