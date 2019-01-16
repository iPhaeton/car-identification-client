import {recognize} from "../utils/api";
import {fileToBase64} from "../utils/common";

const proto = {
  onInputChange: () => {},

  async recognize(handlers) {
    const {onRecognitionComplete, onRecognitionCancel} = handlers;

    this.input.click();
    const file = await this.waitForInputChange;

    if (file) {
      const [{probs, classes}, [image_base64]] = await Promise.all([
        recognize(file),
        fileToBase64(file),
      ]);

      onRecognitionComplete({image_base64, probs, classes})
    } else {
      onRecognitionCancel();
    }
  },
}

export function recognizer(input, handlers) {
  let onInputChange = null;
  const waitForInputChange = new Promise(resolve => onInputChange = (event) => resolve(event.target.files[0]))

  const recognizer = {
    input,
    requestRecognition() {
      this.recognize(handlers);
    },
    waitForInputChange,
    onInputChange,
  }

  Object.setPrototypeOf(recognizer, proto);

  return recognizer;
}
