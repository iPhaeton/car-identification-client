import {recognize} from "../utils/api";
import {fileToBase64} from "../utils/common";

const proto = {
  async chooseFile(input) {
    input.click();
    this.waitForInputChange = new Promise(resolve => input.onchange = (event) => resolve(event.target.files[0]));
    const file = await this.waitForInputChange;
    return file;
  },

  async recognize(file) {
    if (!file) return null;

    const [{probs, classes}, [image_base64]] = await Promise.all([
      recognize(file),
      fileToBase64(file),
    ]);

    return {image_base64, probs, classes};
  },
}

export function recognizer() {
  const input = document.createElement("input");
  input.setAttribute('type', 'file');
  input.className = "FileInput";
  document.body.appendChild(input);

  const recognizer = {
    async request() {
      return await await this.chooseFile(input);
    },

    async requestRecognition(file) {
      return await this.recognize(file);
    },
  }

  Object.setPrototypeOf(recognizer, proto);

  return recognizer;
}
