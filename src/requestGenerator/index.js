import {delay} from "../utils/common";

export function requestGenerator({request, timeout = 5000, onResponse = () => {}}) {
  if (!request) {
    throw new Error('[requestGenerator] Request function is required.')
  }

  let isGenerating = false;

  async function generate() {
    while (isGenerating) {
      try {
        const response = await request();
        if (isGenerating) {
          onResponse(response);
        }
      } catch(err) {
        console.error(err);
      }
      await delay(timeout);
    }
  }

  return {
    start() {
      isGenerating = true;
      generate();
    },

    stop() {
      isGenerating = false;
    }
  }
}
