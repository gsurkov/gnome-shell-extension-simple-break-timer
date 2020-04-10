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
const Gtk = imports.gi.Gtk;
const GObject = imports.gi.GObject;

const ExtensionUtils = imports.misc.extensionUtils;
const Extension = ExtensionUtils.getCurrentExtension();
const Settings = Extension.imports.settings;

/*
    TODO: 
    - Load from Glade file
    - More settings
    - Neater UI 
*/

const SettingsWidget = GObject.registerClass({GTypeName: 'SettingsWidget'},
class extends Gtk.Grid {
    _init() {
        super._init({
            margin: 20,
            row_spacing: 12,
            column_spacing: 12
        });

        const labelWork = new Gtk.Label({
            label: 'Work duration (minutes)',
            halign: Gtk.Align.START
        });
    
        const labelBreak = new Gtk.Label({
            label: 'Break duration (minutes)',
            halign: Gtk.Align.START
        });
    
        const labelAutoStart = new Gtk.Label({
            label: 'Start automatically',
            halign: Gtk.Align.START
        });
    
        const labelNotifications = new Gtk.Label({
            label: 'Enable notifications',
            halign: Gtk.Align.START
        });
    
        const spinWork = new Gtk.SpinButton({
            numeric: true,
            hexpand: true
        });
    
        const spinBreak = new Gtk.SpinButton({
            numeric: true,
            hexpand: true
        });
    
        const switchAutoStart = new Gtk.Switch({
            halign: Gtk.Align.END
        });
    
        const switchNotifications = new Gtk.Switch({
            halign: Gtk.Align.END
        });
    
        spinWork.set_range(1, 99);
        spinWork.set_increments(1, 5);
    
        spinBreak.set_range(1, 99);
        spinBreak.set_increments(1, 5);
    
        this.attach(labelWork, 0, 0, 1, 1);
        this.attach(spinWork, 1, 0, 1, 1);
        
        this.attach(labelBreak, 0, 1, 1, 1);
        this.attach(spinBreak, 1, 1, 1, 1);
    
        this.attach(labelAutoStart, 0, 2, 1, 1);
        this.attach(switchAutoStart, 1, 2, 1, 1);
    
        this.attach(labelNotifications, 0, 3, 1, 1);
        this.attach(switchNotifications, 1, 3, 1, 1);
    
        const settings = new Settings.Settings();
        settings.workDuration.bind(spinWork, 'value');
        settings.breakDuration.bind(spinBreak, 'value');
        settings.autostartEnabled.bind(switchAutoStart, 'active');
        settings.notificationsEnabled.bind(switchNotifications, 'active');

        this.show_all();
    }
});

function init() {}

function buildPrefsWidget() {
    return new SettingsWidget();
}