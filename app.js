/**
 * Dani Gatt - Electrical Drumkit and Javascript MIDI API Demo
 * Inspired on
 * JavaScript MIDI Synth Tutorial - Part 1 | Getting MIDI in the browser
 * https://www.youtube.com/watch?v=KRm_GICiPIQ
 */

if (navigator.requestMIDIAccess) {
  console.log("🎹 navigator.requestMIDIAccess available!!!");
  navigator.requestMIDIAccess().then(success, failure);
}

function success(midiAccess) {
  midiAccess.onstatechange = updateDevices;

  const inputs = midiAccess.inputs;
  inputs.forEach((inp) => {
    console.log("🥁 single input", inp);
    inp.onmidimessage = handleInput;
  });
}

function handleInput(input) {
  console.log("---- 🥁handleInput🥁 -----");
  document.body.style.background = "white";
  document.getElementById("drum_part").textContent = "";

  const note = input.data[1];
  const velocity = input.data[2];

  const colors = {
    magenta: {
      tone: "rgb(204, 0, 204)",
      alpha: "rgba(204, 0, 204, 0.5)",
    },
    cyan: {
      tone: "rgb(51, 204, 204)",
      alpha: "rgba(51, 204, 204, 0.5)",
    },
    yellow: {
      tone: "rgb(255, 255, 0)",
      alpha: "rgba(255, 255, 0, 0.2)",
    },
    black: {
      tone: "rgb(20, 20, 20)",
      alpha: "rgba(38, 38, 38, 0.5)",
    },
    green: {
      tone: "rgb(0, 204, 102)",
      alpha: "rgba(0, 204, 102, 0.5)",
    },
    blue: {
      tone: "rgb(51, 51, 153)",
      alpha: "rgba(51, 51, 153, 0.5)",
    },
    purple: {
      tone: "rgb(102, 0, 102)",
      alpha: "rgba(102, 0, 102, 0.5)",
    },
    red: {
      tone: "rgb(178, 34, 34)",
      alpha: "rgba(178, 34, 34, 0.5)",
    },
    brown: {
      tone: "rgb(139, 69, 19)",
      alpha: "rgba(139, 69, 19, 0.5)",
    },
    orange: {
      tone: "rgb(255, 153, 51)",
      alpha: "rgba(255, 153, 51, 0.5)",
    },
    lime: {
      tone: "rgb(204, 255, 51)",
      alpha: "rgba(204, 255, 51, 0.7)",
    },
  };

  const DRUMKIT = {
    SNARE: 38,
    HI_HAT: 46,
    TOM_1: 48,
    TOM_2: 45,
    TOM_3: 43,
    CRASH: 49,
    RIDE: 51,
    HI_HAT_PEDAL: 44,
    BASS_PEDAL: 36,
  };

  switch (note) {
    case DRUMKIT.SNARE:
      console.log("snare!", note);
      document.body.style.background = colors.magenta.tone;
      document.getElementById("drum_part").textContent = "snare";
      if (!velocity) {
        setTimeout(() => {
          document.body.style.background = colors.magenta.alpha;
          document.getElementById("drum_part").textContent = "snare";
        }, 600); // 1 Second =  1000 Millisecond
      } else {
        document.body.style.background = colors.magenta.alpha;
      }
      break;
    case DRUMKIT.HI_HAT:
      console.log("hi-hat!", note);
      document.body.style.background = colors.cyan.tone;
      document.getElementById("drum_part").textContent = "Hi-hat";

      if (!velocity) {
        setTimeout(() => {
          document.body.style.background = colors.cyan.tone;
          document.getElementById("drum_part").textContent = "Hi-hat";
        }, 600);
      } else {
        document.body.style.background = colors.cyan.alpha;
      }

      break;
    case DRUMKIT.TOM_1:
      console.log("tom 1!", note);
      document.body.style.background = colors.brown.tone;
      document.getElementById("drum_part").textContent = "Tom #1 on";

      break;
    case DRUMKIT.TOM_2:
      console.log("tom 2!", note);
      document.body.style.background = colors.lime.tone;
      document.getElementById("drum_part").textContent = "Tom #2 on";

      break;
    case DRUMKIT.TOM_3:
      console.log("tom 3!", note);
      document.body.style.background = colors.green.tone;
      document.getElementById("drum_part").textContent = "Tom #3 on";
      break;
    case DRUMKIT.CRASH:
      console.log("mono triangle crash!", note);
      document.body.style.background = colors.yellow.tone;
      document.getElementById("drum_part").textContent = "crash on";

      if (!velocity) {
        setTimeout(() => {
          document.body.style.background = colors.yellow.tone;
          document.getElementById("drum_part").textContent = "crash on";
        }, 600);
      } else {
        document.body.style.background = colors.yellow.alpha;
      }
      break;
    case DRUMKIT.RIDE:
      console.log("mono triangle ride!", note);
      document.body.style.background = colors.orange.tone;
      document.getElementById("drum_part").textContent = "ride on";
      break;
    case DRUMKIT.HI_HAT_PEDAL:
      console.log("hi-hat pedal!", note);
      document.body.style.background = colors.red.tone;
      document.getElementById("drum_part").textContent = "hi-hat pedal";
      break;
    case DRUMKIT.BASS_PEDAL:
      console.log("Bass pedal!", note);
      document.body.style.background = colors.black.tone;
      document.getElementById("drum_part").textContent = "Bass pedal";
      break;

    default:
      console.log("");
  }
}
function updateDevices(event) {
  console.log("ℹ️ Device port: ", event.port);
}

function failure() {
  console.log("something went wrong");
}
