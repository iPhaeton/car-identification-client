import {recognize} from "../utils/api";
import {fileToBase64} from "../utils/common";

const proto = {
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

export function recognizer(handlers) {
  const input = document.createElement("input");
  input.setAttribute('type', 'file');
  document.body.appendChild(input);

  const waitForInputChange = new Promise(resolve => input.onchange = (event) => resolve(event.target.files[0]));

  const recognizer = {
    input,
    requestRecognition() {
      this.recognize(handlers);
    },
    waitForInputChange,
  }

  Object.setPrototypeOf(recognizer, proto);

  return recognizer;
}
