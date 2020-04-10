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

const St = imports.gi.St;
const Gio = imports.gi.Gio;
const Clutter = imports.gi.Clutter;
const GObject = imports.gi.GObject;
const PanelMenu = imports.ui.panelMenu;

const ExtensionUtils = imports.misc.extensionUtils;
const Extension = ExtensionUtils.getCurrentExtension();

var Indicator = GObject.registerClass({GTypeName: 'SimpleBreakTimerIndicator'},
class extends PanelMenu.Button {
    _init() {
        super._init(St.Side.TOP);

        this._icon = new St.Icon({
            gicon: Gio.icon_new_for_string(`${Extension.path}/icons/timer-symbolic.svg`),
            style_class: 'system-status-icon'
        });

        this._label = new St.Label({
            x_align: Clutter.ActorAlign.CENTER,
            y_align: Clutter.ActorAlign.CENTER
        });

        const layout = new St.BoxLayout();

        layout.add(this._icon);
        layout.add(this._label);

        this.add_child(layout);
    }

    displayTime(n) {
        const minutes = this._zeroPad(Math.floor(n / 60), 2);
        const seconds = this._zeroPad(n % 60, 2);

        this._label.text = `${minutes}:${seconds}`;
    }

    resetTime() {
        this.displayTime(0);
    }

    //TODO: More signaling options
    setHighlighted(active) {
        if(active) {
            this.add_style_class_name('sbt-indicator-highlighted');
        } else {
            this.remove_style_class_name('sbt-indicator-highlighted');
        }
    }

    _zeroPad(num, len) {
        const str = num.toString();
        return '0'.repeat(len - str.length) + str;
    }
});