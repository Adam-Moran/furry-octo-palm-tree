import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class DeviceDownloadComponent extends Component {
  columnHeaders = ['Name', 'Device', 'Path', 'Status'];
  @tracked devices = [];
  @tracked selectedDevicesCount = 0;
  @tracked isChecked = false;
  @tracked isIndeterminate = false;

  constructor() {
    super(...arguments);
    this.devices = this.args.devices.map((device) => ({
      ...device,
      selected: false,
      disabled: device.status != 'available',
    }));
  }

  get totalCountString() {
    let prefix = '';
    if (this.selectedDevicesCount == 0) {
      prefix = 'None';
    } else {
      prefix = this.selectedDevicesCount;
    }
    return prefix + ' Selected';
  }

  @action
  setChecked() {
    const checked = !this.isChecked;

    this.devices = this.devices.map((device) => {
      if (device.disabled) {
        return { ...device };
      }

      if (!device.selected && checked) {
        this.selectedDevicesCount++;
      }

      if (this.deviceSelected && !checked) {
        this.selectedDevicesCount--;
      }

      return {
        ...device,
        selected: checked,
      };
    });
  }

  @action
  deviceSelected(device) {
    if (!device.selected) {
      this.selectedDevicesCount++;
    } else {
      this.selectedDevicesCount--;
    }

    const maxCheckedDevices = this.devices.filter(
      (device) => !device.disabled
    ).length;

    if (this.selectedDevicesCount == maxCheckedDevices) {
      this.isChecked = true;
      this.isIndeterminate = false;

      return;
    }
    if (this.selectedDevicesCount == 0) {
      this.isChecked = false;
      this.isIndeterminate = false;

      return;
    }

    this.isIndeterminate = true;
  }
}
