import {recognize} from "../utils/api";
import {fileToBase64} from "../utils/common";

const proto = {
  async recognize(input) {
    input.click();
    this.waitForInputChange = new Promise(resolve => input.onchange = (event) => resolve(event.target.files[0]));
    const file = await this.waitForInputChange;

    if (file) {
      const [{probs, classes}, [image_base64]] = await Promise.all([
        recognize(file),
        fileToBase64(file),
      ]);

      return {image_base64, probs, classes};
    } else {
      return null;
    }
  },
}

export function recognizer() {
  const input = document.createElement("input");
  input.setAttribute('type', 'file');
  input.className = "FileInput";
  document.body.appendChild(input);

  const recognizer = {
    async requestRecognition() {
      return await this.recognize(input);
    },
  }

  Object.setPrototypeOf(recognizer, proto);

  return recognizer;
}
