# eui-esp32-adc
Simple demonstration of sampling ADC channels and GPIO state. There are only minor changes to the [Arduino hardware quickstart guide](https://electricui.com/docs/hardware/arduino) and [user-interface quickstart guide](https://electricui.com/docs/interface/quickstart):

- Added an [additional analog signal](https://electricui.com/docs/components/LineChart#plotting-multiple-lines) to the main chart,
- Used a [Switch](https://electricui.com/docs/components/Switch) component to control the output IO
- Added a [PolledCSVLogger](https://electricui.com/docs/components/PolledCSVLogger) component for a quick logging demo.

![ui_screenshot](docs/ui_screenshot.png)

The log format's it generates are CSV formatted with headers like so:

```
timestamp,analogA,analogB,digitalA,digitalB,output
01:32:26.299,101,319,0,1,1
01:32:26.320,119,311,0,1,1
01:32:26.339,120,309,0,1,0
01:32:26.359,121,305,1,1,0
```

## Hardware Setup

This assumes an ESP32 board being used with the Arduino framework. For ESP-IDF setup notes, follow the [IDF quickstart guide](https://electricui.com/docs/hardware/esp32).

I used an [Adafruit ESP32 Feather](https://www.adafruit.com/product/3405) board for this example, flashed with the sketch `arduino-adc-example`.

## Interface

1. The interface in this reposiory assumes you have `arc` [installed](https://electricui.com/install) first.
2. Navigate to the `/interface` folder with the command-line and run `arc install` to ensure your system has the necessary dependencies ready,
2. Run the development sandbox with `arc start`.
3. Edit the template with your IDE (we recommend VSCode) and changes will update the sandbox immediately.
   - `/interface/src/application/pages/DevicePages/OverviewPage.tsx` is responsible for the default UI layout
