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

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const ExtensionUtils = imports.misc.extensionUtils;
const Extension = ExtensionUtils.getCurrentExtension();

var Setting = class {
    constructor(key, type, settings) {
        this._key = key;
        this._type = type;
        this._settings = settings;
    }

    bind(object, property, flags = Gio.SettingsBindFlags.DEFAULT) {
        this._settings.bind(this._key, object, property, flags);
    }

    get value() {
        if(this._type === 'u') {
            return this._settings.get_uint(this._key);
        } else if(this._type === 'b') {
            return this._settings.get_boolean(this._key);
        } else {
            return 0;
        }
    }
};

var Settings = class {
    constructor() {
        const gsettings = ExtensionUtils.getSettings('org.gnome.shell.extensions.simple-break-timer');

        this._workDuration = new Setting('work-duration', 'u', gsettings);
        this._breakDuration = new Setting('break-duration', 'u', gsettings);
        this._autostartEnabled = new Setting('enable-autostart', 'b', gsettings);
        this._notificationsEnabled = new Setting('enable-notifications', 'b', gsettings);
    }

    get workDuration() {
        return this._workDuration;
    }

    get breakDuration() {
        return this._breakDuration;
    }

    get autostartEnabled() {
        return this._autostartEnabled;
    }

    get notificationsEnabled() {
        return this._notificationsEnabled;
    }
};