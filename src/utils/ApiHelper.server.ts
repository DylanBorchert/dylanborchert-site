export abstract class ApiHelper<T> {
  private cached: T | null = null;
  private cacheTimestamp = 0;
  private readonly cacheTTL: number | null;

  constructor(options?: { devTTL: number; prodTTL: number }) {
    this.cacheTTL = options
      ? process.env.NODE_ENV === "development"
        ? options.devTTL
        : options.prodTTL
      : null;
  }

  protected abstract fetch(): Promise<T>;

  async get(): Promise<T> {
    if (
      this.cacheTTL &&
      this.cached &&
      Date.now() - this.cacheTimestamp < this.cacheTTL
    ) {
      return this.cached;
    }
    this.cached = await this.fetch();
    this.cacheTimestamp = Date.now();
    return this.cached;
  }
}
