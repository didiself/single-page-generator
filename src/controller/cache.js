export default class cache {
  constructor() {
    this.data = {};
  }

  getter() {
    return this.data;
  }

  setter(val) {
    this.data = val;
  }
}
