# Exhaustive Changelog File

### **<ins>v1.0.2 -> v1.0.3</ins>**
<sub> Added by [4verage](https://www.github.com/4verage/) on 11/26/2024 @ 9:42 AM </sub>

  + Created new functions to optimize code use.
    - *updateOutputDevices()* - Fills the Output dropdown list.
    - *updateInputDevices()* - Fills the Input dropdown list.
    - *RenderOptions()* - Creates the item list to fill dropdowns with.
    - *getAudioInputs()* - Relocated reused API call here.
    - *getAudioOutputs()* - Relocated reused API call here.
  + Created system to monitor for device changes and repopulate dropdowns accordingly.
    - Added timer *audioDeviceWatcher*
    - *ScanAudioDevices()* - Watches for changes in device number and repopulates the dropdowns.
  + Improved clean-up of lingering timers.

### **<ins>v1.0.1 -> v1.0.2</ins>**
<sub> Added by [4verage](https://www.github.com/4verage/) on 11/25/2024 @ 11:17 AM </sub>

  + Created new function *ScanChanges* that checks against Discord's selected audio devices. Changes plugin accordingly.
  + Created timer at 0.5 seconds to call new function *ScanChanges* - timer named *scanAudioChanges*.
  + Added instantiation of timer to clean-up calls.

### **<ins>v1.0.0 -> v1.0.1</ins>**
<sub> Added by [4verage](https://www.github.com/4verage/) on 11/25/2024 @ 3:25 AM </sub>

  + Created new function *CreateLabel* to generate labels and reduce code repetition.
  + Created new function *CreateSelect* to generate dropdowns and reduce code repetition.
