export const isKey = (key: string) => {
  if (key.length === 1) {
    const keyCode = key.charCodeAt(0);
    if (keyCode >= 33 && keyCode <= 125) {
      return true;
    }
  } else if (key.startsWith('F')) {
    const num = Number.parseInt(key.slice(1));
    if (num >= 1 && num <= 12) {
      return true;
    }
  } else if (key.startsWith('num')) {
    const num = Number.parseInt(key.slice(3));
    if (num >= 0 && num <= 9) {
      return true;
    }
  }
  const specialKeys = [
    'Plus',
    'Space',
    'Tab',
    'Capslock',
    'Numlock',
    'Scrolllock',
    'Backspace',
    'Delete',
    'Insert',
    'Return',
    'Enter',
    'Up',
    'Down',
    'Left',
    'Right',
    'Home',
    'End',
    'PageUp',
    'PageDown',
    'Escape',
    'VolumeUp',
    'VolumeDown',
    'VolumeMute',
    'MediaNextTrack',
    'MediaPreviousTrack',
    'MediaStop',
    'MediaPlayPause',
    'PrintScreen',
    'numdec',
    'numadd',
    'numsub',
    'nummult',
    'numdiv',
  ];
  return specialKeys.includes(key);
};

export const isModifier = (key: string) => {
  const modifiers = [
    'Command',
    'Cmd',
    'Control',
    'Ctrl',
    'CommandOrControl',
    'CmdOrCtrl',
    'Alt',
    'Option',
    'AltGr',
    'Shift',
    'Super',
    'Meta',
  ];
  return modifiers.includes(key);
};

export const isAccelerator = (accelerator: string) => {
  let keyFound = false;
  for (const key of accelerator.split('+')) {
    if (isKey(key)) {
      keyFound = true;
      continue;
    } else if (isModifier(key)) {
      continue;
    } else {
      return false;
    }
  }
  return keyFound;
};
