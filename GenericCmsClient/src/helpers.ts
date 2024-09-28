export async function streamToObject<T>(stream: ReadableStream<Uint8Array>) {
    const reader = stream.getReader();
    const textDecoder = new TextDecoder();
    let result = '';
  
    async function read() {
      const { done, value } = await reader.read();
  
      if (done) {
        return result;
      }
  
      result += textDecoder.decode(value, { stream: true });
      return read();
    }
  
    return JSON.parse(await read()) as T;
  }
