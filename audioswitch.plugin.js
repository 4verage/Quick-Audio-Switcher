/**
 * @name Quick Audio Switcher
 * @author 4verage
 * @description Used to quickly switch between audio devices.
 * @version 1.0.0
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
        const outputAudioLabel = document.createElement("div");
        const inputAudioLabel = document.createElement("div");

        const outputList = document.createElement("select");
        outputList.id = "outputAudioDevices";
        outputList.style.width = "180px";
        outputList.style.webkitAppRegion = 'no-drag';
        Object.entries(AOD).forEach((item) => {
          let addOption = document.createElement("option");
          addOption.value = item[0];
          addOption.text = item[1];
          if (currSelectedOutput == item[0]) {
            addOption.selected = true;
          }
          outputList.add(addOption);
        });

        outputAudioLabel.innerHTML = "Output: ";
        outputAudioLabel.id = "outputAudioLabel";
        outputAudioLabel.style.color = "var(--interactive-normal)";
        outputAudioLabel.style.fontfamily = "Arial";
        outputAudioLabel.style.fontWeight = "bold";
        outputAudioLabel.style.paddingLeft = "8px";
        outputAudioLabel.style.paddingRight = "5px";
        outputAudioLabel.style.fontSize = "12px";
        outputAudioLabel.style.paddingTop = "3px";


        const inputList = document.createElement("select");
        inputList.id = "inputAudioDevices";
        inputList.style.width = "180px";
        inputList.style.webkitAppRegion = 'no-drag';
        Object.entries(AID).forEach((item) => {
          let addOption = document.createElement("option");
          addOption.value = item[0];
          addOption.text = item[1];
          if (currSelectedInput == item[0]) {
            addOption.selected = true;
          }
          inputList.add(addOption);
        });

        inputAudioLabel.innerHTML = "Input: ";
        inputAudioLabel.id = "inputAudioLabel";
        inputAudioLabel.style.color = "var(--interactive-normal)";
        inputAudioLabel.style.fontfamily = "Arial";
        inputAudioLabel.style.fontWeight = "bold";
        inputAudioLabel.style.paddingLeft = "8px";
        inputAudioLabel.style.paddingRight= "5px";
        inputAudioLabel.style.fontSize = "12px";
        inputAudioLabel.style.paddingTop = "3px";

        windowBar.appendChild(outputList);
        windowBar.appendChild(outputAudioLabel);
        windowBar.appendChild(inputList);
        windowBar.appendChild(inputAudioLabel);

        // Create change listeners.
        outputList.addEventListener('change', (event) => {
          let changeTo = event.target.value;

          if (changeTo !== currSelectedOutput) {
            BdApi.Webpack.getModule(v=>v.setOutputDevice).setOutputDevice(changeTo);
            currSelectedOutput = changeTo;
          }
        });

        inputList.addEventListener('change', (event) => {
          let changeTo = event.target.value;

          if (changeTo !== currSelectedInput) {
            BdApi.Webpack.getModule(v=>v.setInputDevice).setInputDevice(changeTo);
            currSelectedInput = changeTo;
          }
        });
        

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