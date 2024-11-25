/**
 * @name Quick Audio Switcher
 * @author 4verage
 * @description Used to quickly switch between audio devices.
 * @version 1.0.1
 * @authorLink https://github.com/4verage
 * @donate https://ko-fi.com/4veragegamer
 * @patreon https://www.patreon.com/c/FirePigStudios
 * @website https://smials.weebly.com
 */

module.exports = meta => {

    return {
      start: () => {
        
        // Get Audio Data
        let AudioOutputDevices = BdApi.Webpack.getModule(x=>x.getOutputDevices).getOutputDevices();
        let AudioInputDevices = BdApi.Webpack.getModule(x=>x.getInputDevices).getInputDevices();

        // Create Selector Values
        var AOD = {};
        var AID = {};

        Object.entries(AudioOutputDevices).forEach(([key, value]) => {
          AOD[AudioOutputDevices[key].id] = AudioOutputDevices[key].name;
        });

        Object.entries(AudioInputDevices).forEach(([key, value]) => {
          AID[AudioInputDevices[key].id] = AudioInputDevices[key].name;
        });

        // Get currently selected IDs.
        const mediaEngine = BdApi.Webpack.getStore("MediaEngineStore");
        let currSelectedOutput = mediaEngine.getOutputDeviceId();
        let currSelectedInput = mediaEngine.getInputDeviceId();
        
        // Create audio selector dropdowns
        const windowBar = document.querySelector(".titleBar_a934d8");
        const outputAudioLabel = CreateLabel("Output: ", "outputAudioLabel");
        const inputAudioLabel = CreateLabel("Input: ", "inputAudioLabel");
        const outputList = CreateSelect("outputAudioDevices", AOD, currSelectedOutput);
        const inputList = CreateSelect("inputAudioDevices", AID, currSelectedInput);

        windowBar.appendChild(outputList);
        windowBar.appendChild(outputAudioLabel);
        windowBar.appendChild(inputList);
        windowBar.appendChild(inputAudioLabel);

        // Create change listeners.
        const changeOutput = (event) => {
          let changeTo = event.target.value;

          if (changeTo !== currSelectedOutput) {
            BdApi.Webpack.getModule(v=>v.setOutputDevice).setOutputDevice(changeTo);
            currSelectedOutput = changeTo;
          }
        }

        outputList.addEventListener('change', changeOutput);

        const changeInput = (event) => {
          let changeTo = event.target.value;

          if (changeTo !== currSelectedInput) {
            BdApi.Webpack.getModule(v=>v.setInputDevice).setInputDevice(changeTo);
            currSelectedInput = changeTo;
          }
        }

        inputList.addEventListener('change', changeInput);

        let scanAudioChanges = setInterval(ScanChanges, 500);
        
        function CreateLabel(txt, id) {
          let newLabel = document.createElement("div");
          newLabel.innerHTML = txt;
          newLabel.id = id;
          newLabel.style.font = "bold 12px Arial";
          newLabel.style.padding = "3px 5px 0px 8px";
          newLabel.style.color = "var(--interactive-normal)";
          return newLabel;
        }

        function CreateSelect(id, dat, current) {
          let newSelect = document.createElement("select");
          newSelect.id = id;
          newSelect.width = "180px";
          newSelect.style.webkitAppRegion = "no-drag";
          Object.entries(dat).forEach((item) => {
            let newOption = document.createElement("option");
            newOption.value = item[0];
            newOption.text = item[1];
            if (current == item[0]) {
              newOption.selected = true;
            }
            newSelect.add(newOption);
          });
          return newSelect;
        }

        function ScanChanges() {
          let outputScanCheck = mediaEngine.getOutputDeviceId();
          let inputScanCheck = mediaEngine.getInputDeviceId();
          if (outputScanCheck !== currSelectedOutput) {
            outputList.removeEventListener('change', changeOutput);
            outputList.value = outputScanCheck;
            currSelectedOutput = outputScanCheck;
            outputList.addEventListener('change', changeOutput);
          }
          if (inputScanCheck !== currSelectedInput) {
            inputList.removeEventListener('change', changeInput);
            inputList.value = inputScanCheck;
            currSelectedInput = inputScanCheck;
            inputList.addEventListener('change', changeInput);
          }
        }

      },
      stop: () => {

        // Remove our items.
        let removals001  = document.querySelectorAll("#outputAudioDevices");
        let removals002 = document.querySelectorAll("#inputAudioDevices");
        let removals003 = document.querySelectorAll("#inputAudioLabel");
        let removals004 = document.querySelectorAll("#outputAudioLabel");
        let removalList = [...removals001, ...removals002, ...removals003, ...removals004];

        for (let adrem = 0; adrem < removalList.length; adrem++) {
            removalList[adrem].remove();
        }

        // Clear variables
        delete AOD;
        delete AID;
        delete currSelectedOutput;
        delete currSelectedInput;
        delete AudioOutputDevices;
        delete AudioInputDevices;
        delete windowBar;

        // Clear Timers
        clearInterval(scanAudioChanges);
        
      },

      getSettingsPanel: () => {
          const mySettingsPanel = document.createElement("div");
          mySettingsPanel.id = "my-settings";
          mySettingsPanel.style.color = "var(--interactive-normal)";
  
  
          const buttonTextSetting = document.createElement("div");
          buttonTextSetting.classList.add("setting");
  
          const mainTextAnnouncement = document.createElement("div")
          mainTextAnnouncement.innerHTML = "No settings to change at this time!"
  
          buttonTextSetting.append(mainTextAnnouncement);  
  
          mySettingsPanel.append(buttonTextSetting);
  
          return mySettingsPanel;
      }
    }
  };