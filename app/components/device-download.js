import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class DeviceDownloadComponent extends Component {
  #maxCheckedDevicesAvailable = 0;

  columnHeaders = ['Name', 'Device', 'Path', 'Status'];

  @tracked devices;
  @tracked selectedDevicesCount = 0;
  @tracked isChecked;
  @tracked isIndeterminate;

  constructor() {
    super(...arguments);
    this.devices = this.args.devices.map((device) => {
      const disabledForDownload = device.status != 'available';
      if (!disabledForDownload) {
        this.#maxCheckedDevicesAvailable++;
      }

      return {
        ...device,
        selected: false,
        disabled: disabledForDownload,
      };
    });

    this.isChecked = false;
    this.isIndeterminate = false;
  }

  get totalSelectionCount() {
    let prefix = '';
    if (this.selectedDevicesCount == 0) {
      prefix = 'None';
    } else {
      prefix = this.selectedDevicesCount;
    }
    return prefix + ' Selected';
  }

  @action
  toggleAll() {
    let checked = !this.isChecked;
    if (this.isIndeterminate) {
      this.isIndeterminate = false;
      checked = true;
    }

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

    if (this.selectedDevicesCount == this.#maxCheckedDevicesAvailable) {
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
    this.isChecked = false;
  }

  @action
  downloadDevices() {
    const selectedDevices = this.devices.filter((device) => device.selected);

    let alertContent = '';
    selectedDevices.forEach((device) => {
      alertContent += `Device: ${device.name}, Path: ${device.path}` + '\n';
    });
    alert(alertContent);
  }
}
