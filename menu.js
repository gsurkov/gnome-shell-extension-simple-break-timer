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
const PopupMenu = imports.ui.popupMenu;

var Menu = class extends PopupMenu.PopupMenu {
    constructor(sourceActor) {
        super(sourceActor, 0.0, St.Side.TOP);

        this._items = {
            'work' : new PopupMenu.PopupMenuItem('Work'),
            'break': new PopupMenu.PopupMenuItem('Break'),
            'stop' : new PopupMenu.PopupMenuItem('Stop')
        };

        this.addMenuItem(this.item('work'));
        this.addMenuItem(this.item('break'));
        this.addMenuItem(this.item('stop'));
    }

    item(itemName) {
        //TODO: Check whether the item is actually there
        return this._items[itemName];
    }

    on(itemName, callback) {
        this.item(itemName).connect('activate', callback);
    }

    setCurrent(itemName) {
        this._clearOrnaments();
        this.item(itemName).setOrnament(PopupMenu.Ornament.DOT);
    }

    _clearOrnaments() {
        for(const key in this._items) {
            this._items[key].setOrnament(PopupMenu.Ornament.NONE);
        }
    }
};