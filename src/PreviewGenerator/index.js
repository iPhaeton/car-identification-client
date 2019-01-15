import {getPreview} from "../utils/api";
import {delay} from "../utils/common";

export class PreviewGenerator {
  constructor(timeout, onGenerated) {
    this.timeout = timeout;
    this.isGenerating = false;
    this.onGenerated = onGenerated;
  }

  async generate() {
    while (this.isGenerating) {
      try {
        const preview = await getPreview();
        if (this.isGenerating) {
          this.onGenerated(preview);
        };
      } catch(err) {
        console.error(err);
      }
      await delay(this.timeout);
    }
  }

  start() {
    this.isGenerating = true;
    this.generate();
  }

  stop() {
    this.isGenerating = false;
  }
}
