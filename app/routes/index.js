import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    const response = await fetch('/api/devices.json');
    const devices = await response.json();

    return devices;
  }
}
