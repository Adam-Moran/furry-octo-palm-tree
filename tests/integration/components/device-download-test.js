import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | device-download', function (hooks) {
  setupRenderingTest(hooks);

  const mockDevices = [
    {
      name: 'smss.exe',
      device: 'Stark',
      path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
      status: 'scheduled',
    },

    {
      name: 'netsh.exe',
      device: 'Targaryen',
      path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
      status: 'available',
    },
  ];

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('devices', mockDevices);

    await render(hbs`<DeviceDownload @devices={{this.devices}}/>`);

    assert.dom('.table').exists();

    assert.dom('.download-button').exists();
    assert.dom('.download-button').hasText('Download Selected');
  });

  test('checking the toggle all checkbox should update the selected count', async function (assert) {
    this.set('devices', mockDevices);

    await render(hbs`<DeviceDownload @devices={{this.devices}}/>`);

    this.element.querySelector('Input').click();

    await settled();

    const count = this.element.querySelector('span');
    assert.dom(count).hasText('1 Selected');
  });

  test('unchecking the toggle all checkbox should update the selected count', async function (assert) {
    this.set('devices', mockDevices);

    await render(hbs`<DeviceDownload @devices={{this.devices}}/>`);

    this.element.querySelector('Input').click();
    await settled();

    this.element.querySelector('Input').click();
    await settled();

    const count = this.element.querySelector('span');
    assert.dom(count).hasText('None Selected');
  });
});
