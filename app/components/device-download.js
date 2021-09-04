import Component from '@glimmer/component';

export default class DeviceDownloadComponent extends Component {
  columnHeaders = ['Name', 'Device', 'Path', 'Status'];
  devices = [];

  constructor() {
    super(...arguments);
    this.devices = this.args.devices.map((device) => ({
      ...device,
      selected: false,
      disabled: device.status != 'available',
    }));
  }
}
