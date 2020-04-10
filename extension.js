/* 
 * This file is part of Simple Break Timer Gnome-Shell extension.
 * Copyright (c) 2020 Georgii Surkov.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const Main = imports.ui.main; 
const ExtensionUtils = imports.misc.extensionUtils;
const Extension = ExtensionUtils.getCurrentExtension();

const Menu = Extension.imports.menu;
const Timer = Extension.imports.timer;
const Indicator = Extension.imports.indicator;
const Settings = Extension.imports.settings;

const Mode = {
    WORK: 0,
    BREAK: 1,
    STOP: 2
};

/* 
    TODO:
    - Localisation,
    - Launch preferences from menu
*/
class SimpleBreakTimer {
    enable() {
        this._timer = new Timer.Timer();
        this._indicator = new Indicator.Indicator();
        this._menu = new Menu.Menu(this._indicator);
        this._settings = new Settings.Settings();

        this._menu.on('work', () => this._beginWork());
        this._menu.on('break', () => this._beginBreak());
        this._menu.on('stop', () => this._stop());
        
        this._indicator.setMenu(this._menu);
        this._indicator.resetTime();
        
        this._timer.on('update', (time) => this._indicator.displayTime(time));
        this._timer.on('timeout', () => this._timeout());

        //TODO: Settings for position
        //NOTE: It doesn't work like this because other extensions may load after this one
        const pos = Main.panel._centerBox.get_n_children();
        Main.panel.addToStatusArea('Simple Break Timer', this._indicator, pos, 'center');

        if(this._settings.autostartEnabled.value) {
            this._beginWork();
        }
    }

    disable() {
        this._timer.stop();
        this._indicator.destroy();
    }

    _displayNotification(title, message) {
        if(this._settings.notificationsEnabled.value) {
            Main.notify(title, message);
        }
    }

    _beginWork() {
        this._setMode(Mode.WORK);
        this._menu.setCurrent('work');
        this._indicator.setHighlighted(false);

        this._displayNotification('Begin working', `${this._settings.workDuration.value} minutes remaining`);
    }

    _beginBreak() {
        this._setMode(Mode.BREAK);
        this._menu.setCurrent('break');
        this._indicator.setHighlighted(true);

        this._displayNotification('Begin break', `${this._settings.breakDuration.value} minutes remaining`);
    }

    _stop() {
        this._setMode(Mode.STOP);
        this._menu.setCurrent('stop');
        this._indicator.resetTime();
        this._indicator.setHighlighted(false);
    }

    _timeout() {
        if(this._mode == Mode.WORK) {
            this._beginBreak();
        } else if(this._mode == Mode.BREAK) {
            this._beginWork();
        } else {}
    }

    _setMode(mode) {
        this._mode = mode;

        if(mode == Mode.WORK) {
            this._timer.start(this._settings.workDuration.value * 60);
        } else if(mode == Mode.BREAK) {
            this._timer.start(this._settings.breakDuration.value * 60);
        } else {
            this._timer.stop();
        }
    }
};

function init() {
    return new SimpleBreakTimer();
}