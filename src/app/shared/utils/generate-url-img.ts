export const generateUrl = (file: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (ev) => {
      const url = ev.target?.result?.toString();
      url ? resolve(url) : reject(url);
    };
    reader.onerror = (ev) => {
      if (ev.target?.error) {
        reject(null);
      }
    };
  });

export class Reader {
  static generateUrl(file: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (ev) => {
        const url = ev.target?.result?.toString();
        url ? resolve(url) : reject(url);
      };
      reader.onerror = (ev) => {
        if (ev.target?.error) {
          reject(null);
        }
      };
    });
  }
}
